// Rendert de echte site en legt alle weergaven + interactieve toestanden vast als HTML.
const { chromium } = require('playwright');
const fs = require('fs');
const BASE = 'http://localhost:4321';
const OUT = process.argv[2];
const EXP = JSON.parse(process.argv[3]); // [{id, track}]

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
  const data = { views: {}, states: {}, panels: {} };

  // ---------- Home ----------
  await p.goto(BASE + '/', { waitUntil: 'networkidle' });
  await settle(p);
  await p.evaluate(() => {
    // markeer componenten voor de vanilla-runtime
    document.querySelectorAll('p').forEach((el) => {
      if (el.querySelector(':scope > span[aria-hidden] > span.inline-block')) el.setAttribute('data-scrolltext', '');
    });
    const vb = [...document.querySelectorAll('div[aria-hidden]')].find((d) => d.className.includes('overflow-hidden border-y') && d.querySelector('.font-display.flex.w-max'));
    if (vb) vb.setAttribute('data-velocity', '');
  });
  // toestanden: vaardigheden-tabs, groei-toggle, projectfilter
  const grab = (sel) => p.evaluate((sel) => document.querySelector(sel).innerHTML, sel);
  const cleanNow = () => p.evaluate(CLEAN);
  for (const [key, wrap, btnSel] of [
    ['skills', '#vaardigheden .container-x', '#vaardigheden [role=tab]'],
    ['growth', '#ambitie .container-x', '#ambitie [role=group] button'],
    ['projects', '#werk .container-x', '#werk [role=group] button'],
  ]) {
    const n = await p.locator(btnSel).count();
    data.states[key] = [];
    for (let i = 0; i < n; i++) {
      await p.locator(btnSel).nth(i).click();
      await p.waitForTimeout(1300);
      await cleanNow();
      data.states[key].push(await grab(wrap));
    }
    await p.locator(btnSel).nth(0).click();
    await p.waitForTimeout(900);
  }
  await cleanNow();
  data.header = await p.evaluate(() => document.querySelector('header').outerHTML);
  data.footer = await p.evaluate(() => document.querySelector('footer').outerHTML);
  data.progress = await p.evaluate(() => {
    const el = [...document.querySelectorAll('div[aria-hidden]')].find((d) => d.className.includes('h-[2px]'));
    return el ? el.outerHTML : '';
  });
  data.views.home = await p.evaluate(() => document.querySelector('main').innerHTML);

  // ---------- Overzicht /ervaring/ ----------
  await p.goto(BASE + '/ervaring/', { waitUntil: 'networkidle' });
  await settle(p);
  for (const e of EXP) {
    const btn = p.locator(`button[aria-controls="exp-${e.id}"]`);
    if ((await btn.getAttribute('aria-expanded')) !== 'true') {
      await btn.click();
      await p.waitForTimeout(900);
    }
    await cleanNow();
    data.panels[e.id] = await p.evaluate((id) => document.getElementById('exp-' + id).outerHTML, e.id);
  }
  // terug naar: alles dicht
  await p.goto(BASE + '/ervaring/', { waitUntil: 'networkidle' });
  await settle(p);
  const first = p.locator(`button[aria-controls="exp-${EXP[0].id}"]`);
  await first.click();
  await p.waitForTimeout(900);
  await cleanNow();
  data.views['alle-ervaring'] = await p.evaluate(() => document.querySelector('main').innerHTML);

  // ---------- Detailpagina's ----------
  for (const e of EXP) {
    await p.goto(`${BASE}/ervaring/${e.id}/`, { waitUntil: 'networkidle' });
    await settle(p);
    await cleanNow();
    data.views['ervaring-' + e.id] = await p.evaluate(() => document.querySelector('main').innerHTML);
  }

  // ---------- Online cv ----------
  await p.goto(BASE + '/cv/', { waitUntil: 'networkidle' });
  await settle(p);
  await cleanNow();
  data.views['online-cv'] = await p.evaluate(() => document.querySelector('main').innerHTML);

  fs.writeFileSync(OUT, JSON.stringify(data));
  console.log('views', Object.keys(data.views).length, 'panels', Object.keys(data.panels).length,
    'states', Object.fromEntries(Object.entries(data.states).map(([k, v]) => [k, v.length])));
  await b.close();
})();
