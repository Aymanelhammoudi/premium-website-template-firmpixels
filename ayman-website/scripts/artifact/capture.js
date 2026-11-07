// Rendert de echte site (NL + EN) en legt alle weergaven en interactieve toestanden vast als HTML.
const { chromium } = require('playwright');
const fs = require('fs');
const BASE = 'http://localhost:4321';
const OUT = process.argv[2];
const EXP = JSON.parse(process.argv[3]); // [{id, track}]

const LANGS = {
  nl: { home: '/', overview: '/ervaring/', exp: (id) => `/ervaring/${id}/`, cv: '/cv/', prefix: '' },
  en: { home: '/en/', overview: '/en/experience/', exp: (id) => `/en/experience/${id}/`, cv: '/en/cv/', prefix: 'en-' },
};

// In de pagina: framer-motion inline stijlen opruimen en markeren wat later animeert.
const CLEAN = () => {
  document.querySelectorAll('[style]').forEach((el) => {
    const st = el.style;
    const hadMotion = st.opacity !== '' || st.transform !== '' || st.filter !== '';
    if (hadMotion && !el.closest('header') && !el.closest('[data-velocity]')) el.setAttribute('data-rv', '');
    ['opacity', 'transform', 'filter', 'will-change', 'translate', 'rotate', 'scale', 'clip-path', 'transform-style', 'transform-perspective'].forEach((p) => st.removeProperty(p));
    if (el.getAttribute('style') === '') el.removeAttribute('style');
  });
};
const MARK = () => {
  document.querySelectorAll('p').forEach((el) => {
    if (el.querySelector(':scope > span[aria-hidden] > span.inline-block')) el.setAttribute('data-scrolltext', '');
  });
  const vb = [...document.querySelectorAll('div[aria-hidden]')].find((d) => d.className.includes('overflow-hidden border-y') && d.querySelector('.font-display.flex.w-max'));
  if (vb) vb.setAttribute('data-velocity', '');
};

async function settle(p) {
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 500) {
    await p.evaluate((y) => window.scrollTo(0, y), y);
    await p.waitForTimeout(90);
  }
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.waitForTimeout(1600);
}

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' });
  const data = { views: {}, states: {}, panels: {}, chrome: {} };
  const grab = (sel) => p.evaluate((sel) => document.querySelector(sel).innerHTML, sel);
  const cleanNow = () => p.evaluate(CLEAN);

  for (const [lang, L] of Object.entries(LANGS)) {
    // ---------- Home ----------
    await p.goto(BASE + L.home, { waitUntil: 'networkidle' });
    await settle(p);
    await p.evaluate(MARK);
    data.states[lang] = {};
    for (const [key, wrap, btnSel] of [
      ['skills', '#vaardigheden .container-x', '#vaardigheden [role=tab]'],
      ['growth', '#ambitie .container-x', '#ambitie [role=group] button'],
      ['projects', '#werk .container-x', '#werk [role=group] button'],
    ]) {
      const n = await p.locator(btnSel).count();
      data.states[lang][key] = [];
      for (let i = 0; i < n; i++) {
        await p.locator(btnSel).nth(i).click();
        await p.waitForTimeout(1300);
        await cleanNow();
        data.states[lang][key].push(await grab(wrap));
      }
      await p.locator(btnSel).nth(0).click();
      await p.waitForTimeout(900);
    }
    await cleanNow();
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
    data.views[lang === 'nl' ? 'home' : 'en'] = await p.evaluate(() => document.querySelector('main').innerHTML);

    // ---------- Overzicht ----------
    await p.goto(BASE + L.overview, { waitUntil: 'networkidle' });
    await settle(p);
    data.panels[lang] = {};
    for (const e of EXP) {
      const btn = p.locator(`button[aria-controls="exp-${e.id}"]`);
      if ((await btn.getAttribute('aria-expanded')) !== 'true') {
        await btn.click();
        await p.waitForTimeout(900);
      }
      await cleanNow();
      data.panels[lang][e.id] = await p.evaluate((id) => document.getElementById('exp-' + id).outerHTML, e.id);
    }
    await p.goto(BASE + L.overview, { waitUntil: 'networkidle' });
    await settle(p);
    await p.locator(`button[aria-controls="exp-${EXP[0].id}"]`).click();
    await p.waitForTimeout(900);
    await cleanNow();
    data.views[L.prefix + 'alle-ervaring'] = await p.evaluate(() => document.querySelector('main').innerHTML);

    // ---------- Detailpagina's ----------
    for (const e of EXP) {
      await p.goto(BASE + L.exp(e.id), { waitUntil: 'networkidle' });
      await settle(p);
      await cleanNow();
      data.views[L.prefix + 'ervaring-' + e.id] = await p.evaluate(() => document.querySelector('main').innerHTML);
    }

    // ---------- Online cv ----------
    await p.goto(BASE + L.cv, { waitUntil: 'networkidle' });
    await settle(p);
    await cleanNow();
    data.views[L.prefix + 'online-cv'] = await p.evaluate(() => document.querySelector('main').innerHTML);
  }

  fs.writeFileSync(OUT, JSON.stringify(data));
  console.log('weergaven', Object.keys(data.views).length);
  await b.close();
})();
