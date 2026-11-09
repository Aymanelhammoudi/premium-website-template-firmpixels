// Rendert de echte multi-pagina site (NL + EN) en legt elke pagina en de interactieve toestanden vast als HTML.
const { chromium } = require('playwright');
const fs = require('fs');
const BASE = 'http://localhost:4321';
const OUT = process.argv[2];
const EXP = JSON.parse(process.argv[3]); // [{id, track}]

const PAGES = {
  home: { nl: '/', en: '/en/' },
  about: { nl: '/over-mij/', en: '/en/about/' },
  experience: { nl: '/ervaring/', en: '/en/experience/' },
  ventures: { nl: '/ondernemerschap/', en: '/en/entrepreneurship/' },
  skills: { nl: '/vaardigheden/', en: '/en/skills/' },
  ambition: { nl: '/ambitie/', en: '/en/ambition/' },
  websites: { nl: '/websites/', en: '/en/websites/' },
  cv: { nl: '/cv/', en: '/en/cv/' },
  contact: { nl: '/contact/', en: '/en/contact/' },
};
const detail = (l, id) => (l === 'en' ? `/en/experience/${id}/` : `/ervaring/${id}/`);
/** "/" → home, "/en/" → en, "/ervaring/bol/" → ervaring-bol, "/en/about/" → en-about */
const viewOf = (path) => path.replace(/^\/|\/$/g, '').replace(/\//g, '-') || 'home';

// In de pagina: framer-motion inline stijlen opruimen en markeren wat later in beeld schuift.
const CLEAN = () => {
  document.querySelectorAll('[style]').forEach((el) => {
    const st = el.style;
    const hadMotion = st.opacity !== '' || st.transform !== '' || st.filter !== '';
    if (hadMotion && !el.closest('header') && !el.closest('[role=tabpanel]')) el.setAttribute('data-rv', '');
    ['opacity', 'transform', 'filter', 'will-change', 'translate', 'rotate', 'scale', 'clip-path', 'transform-style', 'transform-perspective'].forEach((p) => st.removeProperty(p));
    if (el.getAttribute('style') === '') el.removeAttribute('style');
  });
};

async function settle(p) {
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 500) {
    await p.evaluate((y) => window.scrollTo(0, y), y);
    await p.waitForTimeout(70);
  }
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.waitForTimeout(1200);
}

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' });
  const data = { views: {}, pairs: {}, states: {}, panels: {}, chrome: {}, order: [] };
  const grab = (sel) => p.evaluate((sel) => document.querySelector(sel).innerHTML, sel);
  const main = () => p.evaluate(() => document.querySelector('main').innerHTML);
  const open = async (path) => {
    await p.goto(BASE + path, { waitUntil: 'networkidle' });
    await settle(p);
  };

  // Paren NL ↔ EN
  for (const k of Object.keys(PAGES)) {
    const [a, c] = [viewOf(PAGES[k].nl), viewOf(PAGES[k].en)];
    data.pairs[a] = c; data.pairs[c] = a;
  }
  for (const e of EXP) {
    const [a, c] = [viewOf(detail('nl', e.id)), viewOf(detail('en', e.id))];
    data.pairs[a] = c; data.pairs[c] = a;
  }

  for (const lang of ['nl', 'en']) {
    // ---------- Gewone pagina's ----------
    for (const [key, paths] of Object.entries(PAGES)) {
      const path = paths[lang];
      const view = viewOf(path);
      await open(path);

      if (key === 'home') {
        await p.evaluate(CLEAN);
        data.chrome[lang] = {
          header: await p.evaluate(() => document.querySelector('header').outerHTML),
          footer: await p.evaluate(() => document.querySelector('footer').outerHTML),
        };
        if (lang === 'nl') {
          data.progress = await p.evaluate(() => {
            const el = [...document.querySelectorAll('div[aria-hidden]')].find((d) => d.className.includes('h-[2px]'));
            return el ? el.outerHTML : '';
          });
        }
      }

      // Toestanden van tabs en schakelaars
      const STATE = { skills: ['#vaardigheden', '[role=tab]'], websites: ['#werk', '[role=group] button'] };
      if (STATE[key]) {
        const [id, btn] = STATE[key];
        const sel = `${id} ${btn}`;
        const n = await p.locator(sel).count();
        data.states[view] = { id: id.slice(1), btn, html: [] };
        for (let i = 0; i < n; i++) {
          await p.locator(sel).nth(i).click();
          await p.waitForTimeout(900);
          await p.evaluate(CLEAN);
          data.states[view].html.push(await grab(`${id} .container-x`));
        }
        await p.locator(sel).nth(0).click();
        await p.waitForTimeout(700);
      }

      // Panelen van de tijdlijn
      if (key === 'experience' || key === 'ventures') {
        data.panels[view] = {};
        for (const e of EXP.filter((x) => (key === 'experience' ? x.track === 'sales' : x.track === 'ondernemer'))) {
          const b2 = p.locator(`button[aria-controls="exp-${e.id}"]`);
          if ((await b2.getAttribute('aria-expanded')) !== 'true') {
            await b2.click();
            await p.waitForTimeout(700);
          }
          await p.evaluate(CLEAN);
          data.panels[view][e.id] = await p.evaluate((id) => document.getElementById('exp-' + id).outerHTML, e.id);
        }
        await open(path); // terug naar de begintoestand (eerste onderdeel open)
      }

      await p.evaluate(CLEAN);
      data.views[view] = { lang, html: await main() };
      data.order.push(view);
    }

    // ---------- Detailpagina's ----------
    for (const e of EXP) {
      const path = detail(lang, e.id);
      await open(path);
      await p.evaluate(CLEAN);
      data.views[viewOf(path)] = { lang, html: await main() };
      data.order.push(viewOf(path));
    }
  }

  fs.writeFileSync(OUT, JSON.stringify(data));
  console.log('weergaven', Object.keys(data.views).length);
  await b.close();
})();
