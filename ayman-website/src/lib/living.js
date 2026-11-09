/**
 * "Levende" interacties zonder framework, zodat de site én de Artifact dezelfde code gebruiken.
 * Alles werkt via data-attributen en respecteert "minder beweging".
 *
 *   [data-dotfield]  canvas met een puntenveld dat wegduwt van de cursor en zacht golft
 *   [data-depth]     laag die met de muis meebeweegt (diepte), binnen [data-depth-root]
 *   [data-magnetic]  knop die licht naar de cursor trekt
 *   [data-tilt]      kaart die in 3D meekantelt met de cursor
 *   [data-velocity]  element dat meeschuift met de scrollsnelheid (via --vel)
 *   [data-rail]      vastgezette sectie waarin [data-rail-track] horizontaal schuift tijdens het scrollen
 *
 * initLiving(root) geeft een opruimfunctie terug.
 */

const reduceMotion = () => typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = () => typeof matchMedia !== "undefined" && matchMedia("(pointer: fine)").matches;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

/* ---------- Puntenveld ---------- */
function dotField(canvas) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};
  const host = canvas.parentElement;
  const still = reduceMotion();
  let w = 0, h = 0, dpr = 1, dots = [], raf = 0, running = false, visible = true, t = 0;
  let mx = -1e4, my = -1e4, tx = -1e4, ty = -1e4;
  let ink = "#0b1b2e", gold = "#b8925a";

  const readColors = () => {
    const cs = getComputedStyle(canvas);
    ink = cs.getPropertyValue("--ink").trim() || ink;
    gold = cs.getPropertyValue("--gold").trim() || gold;
  };
  const build = () => {
    const r = canvas.getBoundingClientRect();
    w = r.width; h = r.height;
    dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const gap = w < 640 ? 30 : 26;
    dots = [];
    for (let y = gap / 2; y < h; y += gap)
      for (let x = gap / 2; x < w; x += gap) dots.push({ ox: x, oy: y, x, y, vx: 0, vy: 0 });
  };
  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    const R = 150;
    ctx.fillStyle = ink;
    ctx.globalAlpha = 0.16;
    const glowing = [];
    for (const d of dots) {
      if (!still) {
        const wave = Math.sin(t * 0.9 + d.ox * 0.012 + d.oy * 0.016) * 1.4;
        const dx = d.x - mx, dy = d.y - my;
        const dist = Math.hypot(dx, dy);
        let fx = 0, fy = 0;
        if (dist < R && dist > 0.01) {
          const f = Math.pow(1 - dist / R, 2) * 7;
          fx = (dx / dist) * f; fy = (dy / dist) * f;
        }
        d.vx = (d.vx + (d.ox - d.x) * 0.06 + fx) * 0.8;
        d.vy = (d.vy + (d.oy + wave - d.y) * 0.06 + fy) * 0.8;
        d.x += d.vx; d.y += d.vy;
        if (dist < R) { glowing.push([d, 1 - dist / R]); continue; }
      }
      ctx.fillRect(d.x - 0.75, d.y - 0.75, 1.5, 1.5);
    }
    ctx.fillStyle = gold;
    for (const [d, k] of glowing) {
      ctx.globalAlpha = 0.25 + k * 0.7;
      const s = 1.5 + k * 2.2;
      ctx.beginPath();
      ctx.arc(d.x, d.y, s / 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  };
  const loop = () => {
    t += 0.016;
    mx += (tx - mx) * 0.2; my += (ty - my) * 0.2;
    draw();
    raf = requestAnimationFrame(loop);
  };
  const start = () => { if (!running && !still && visible && !document.hidden) { running = true; raf = requestAnimationFrame(loop); } };
  const stop = () => { running = false; cancelAnimationFrame(raf); };

  const onMove = (e) => {
    const r = canvas.getBoundingClientRect();
    tx = e.clientX - r.left; ty = e.clientY - r.top;
    if (mx < -1e3) { mx = tx; my = ty; }
  };
  const onLeave = () => { tx = ty = -1e4; };
  const onVis = () => (document.hidden ? stop() : start());
  const io = new IntersectionObserver(([en]) => {
    visible = en.isIntersecting;
    if (visible) start();
    else stop();
  });
  const ro = new ResizeObserver(() => { build(); if (still) draw(); });
  const mo = new MutationObserver(() => { readColors(); if (still) draw(); });

  readColors();
  build();
  draw();
  canvas.classList.add("is-live");
  host.addEventListener("pointermove", onMove, { passive: true });
  host.addEventListener("pointerleave", onLeave);
  document.addEventListener("visibilitychange", onVis);
  io.observe(canvas);
  ro.observe(canvas);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  start();
  return () => {
    stop();
    host.removeEventListener("pointermove", onMove);
    host.removeEventListener("pointerleave", onLeave);
    document.removeEventListener("visibilitychange", onVis);
    io.disconnect(); ro.disconnect(); mo.disconnect();
  };
}

/* ---------- Diepte met de muis ---------- */
function depth(rootEl) {
  if (reduceMotion() || !finePointer()) return () => {};
  const layers = Array.from(rootEl.querySelectorAll("[data-depth]"));
  let px = 0, py = 0, cx = 0, cy = 0, raf = 0;
  const tick = () => {
    cx += (px - cx) * 0.08; cy += (py - cy) * 0.08;
    for (const l of layers) {
      const d = parseFloat(l.dataset.depth || "0.3");
      l.style.translate = `${(cx * d * 28).toFixed(2)}px ${(cy * d * 22).toFixed(2)}px`;
    }
    if (Math.abs(px - cx) > 0.001 || Math.abs(py - cy) > 0.001) raf = requestAnimationFrame(tick);
    else raf = 0;
  };
  const onMove = (e) => {
    const r = rootEl.getBoundingClientRect();
    px = ((e.clientX - r.left) / r.width - 0.5) * 2;
    py = ((e.clientY - r.top) / r.height - 0.5) * 2;
    if (!raf) raf = requestAnimationFrame(tick);
  };
  const onLeave = () => { px = py = 0; if (!raf) raf = requestAnimationFrame(tick); };
  rootEl.addEventListener("pointermove", onMove, { passive: true });
  rootEl.addEventListener("pointerleave", onLeave);
  return () => {
    cancelAnimationFrame(raf);
    rootEl.removeEventListener("pointermove", onMove);
    rootEl.removeEventListener("pointerleave", onLeave);
    layers.forEach((l) => (l.style.translate = ""));
  };
}

/* ---------- Magnetische knoppen ---------- */
function magnetic(scope) {
  if (reduceMotion() || !finePointer()) return () => {};
  let active = null;
  const reset = (el) => { el.style.translate = ""; el.classList.remove("is-magnet"); };
  const onMove = (e) => {
    const el = e.target.closest?.("[data-magnetic]");
    if (active && active !== el) { reset(active); active = null; }
    if (!el || !scope.contains(el)) return;
    active = el;
    const r = el.getBoundingClientRect();
    const dx = clamp((e.clientX - (r.left + r.width / 2)) * 0.25, -10, 10);
    const dy = clamp((e.clientY - (r.top + r.height / 2)) * 0.35, -8, 8);
    el.classList.add("is-magnet");
    el.style.translate = `${dx.toFixed(1)}px ${dy.toFixed(1)}px`;
  };
  document.addEventListener("pointermove", onMove, { passive: true });
  return () => { document.removeEventListener("pointermove", onMove); if (active) reset(active); };
}

/* ---------- 3D-kanteling van kaarten ---------- */
function tilt(scope) {
  if (reduceMotion() || !finePointer()) return () => {};
  let active = null;
  const reset = (el) => {
    el.classList.remove("is-tilting");
    el.style.removeProperty("--rx");
    el.style.removeProperty("--ry");
  };
  const onMove = (e) => {
    const el = e.target.closest?.("[data-tilt]");
    if (active && active !== el) { reset(active); active = null; }
    if (!el || !scope.contains(el)) return;
    active = el;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    el.classList.add("is-tilting");
    el.style.setProperty("--rx", `${((0.5 - py) * 7).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${((px - 0.5) * 9).toFixed(2)}deg`);
  };
  const onOut = (e) => { if (active && !active.contains(e.relatedTarget)) { reset(active); active = null; } };
  document.addEventListener("pointermove", onMove, { passive: true });
  document.addEventListener("pointerout", onOut, { passive: true });
  return () => {
    document.removeEventListener("pointermove", onMove);
    document.removeEventListener("pointerout", onOut);
    if (active) reset(active);
  };
}

/* ---------- Scrollsnelheid ---------- */
function velocity(scope) {
  const els = Array.from(scope.querySelectorAll("[data-velocity]"));
  if (!els.length || reduceMotion()) return () => {};
  let last = window.scrollY, lastT = performance.now(), v = 0, raf = 0;
  const tick = () => {
    v *= 0.9;
    els.forEach((el) => el.style.setProperty("--vel", v.toFixed(3)));
    raf = Math.abs(v) > 0.002 ? requestAnimationFrame(tick) : 0;
  };
  const onScroll = () => {
    const now = performance.now();
    const dv = (window.scrollY - last) / Math.max(16, now - lastT);
    last = window.scrollY; lastT = now;
    v = clamp(v * 0.6 + dv * 0.4, -3, 3) / 3 * 1;
    if (!raf) raf = requestAnimationFrame(tick);
  };
  addEventListener("scroll", onScroll, { passive: true });
  return () => { removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); els.forEach((el) => el.style.removeProperty("--vel")); };
}

/* ---------- Horizontale rail (scrollytelling) ---------- */
function rail(section) {
  const track = section.querySelector("[data-rail-track]");
  const bar = section.querySelector("[data-rail-progress]");
  const count = section.querySelector("[data-rail-count]");
  const cards = track ? Array.from(track.children) : [];
  if (!track) return () => {};
  let dist = 0, raf = 0;
  const enabled = () => !reduceMotion() && matchMedia("(min-width: 768px)").matches;
  const measure = () => {
    if (!enabled()) {
      section.removeAttribute("data-rail-on");
      section.style.height = "";
      track.style.transform = "";
      return;
    }
    section.setAttribute("data-rail-on", "");
    dist = Math.max(0, track.scrollWidth - track.parentElement.clientWidth);
    section.style.height = `${window.innerHeight + dist}px`;
    update();
  };
  const update = () => {
    raf = 0;
    if (!section.hasAttribute("data-rail-on")) return;
    const r = section.getBoundingClientRect();
    const total = section.offsetHeight - window.innerHeight;
    const p = total > 0 ? clamp(-r.top / total, 0, 1) : 0;
    track.style.transform = `translate3d(${(-p * dist).toFixed(1)}px,0,0)`;
    if (bar) bar.style.transform = `scaleX(${p.toFixed(4)})`;
    if (count && cards.length) count.textContent = String(Math.min(cards.length, Math.floor(p * (cards.length - 1) + 1.0001))).padStart(2, "0");
  };
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
  // Op mobiel (veegbare rij) volgt de teller de horizontale positie.
  const viewport = track.parentElement;
  const onSwipe = () => {
    if (section.hasAttribute("data-rail-on") || !cards.length) return;
    const max = viewport.scrollWidth - viewport.clientWidth;
    const p = max > 0 ? viewport.scrollLeft / max : 0;
    if (bar) bar.style.transform = `scaleX(${p.toFixed(4)})`;
    if (count) count.textContent = String(Math.round(p * (cards.length - 1)) + 1).padStart(2, "0");
  };
  viewport.addEventListener("scroll", onSwipe, { passive: true });
  const ro = new ResizeObserver(measure);
  ro.observe(track);
  addEventListener("resize", measure);
  addEventListener("scroll", onScroll, { passive: true });
  measure();
  return () => {
    ro.disconnect();
    viewport.removeEventListener("scroll", onSwipe);
    removeEventListener("resize", measure);
    removeEventListener("scroll", onScroll);
    cancelAnimationFrame(raf);
    section.removeAttribute("data-rail-on");
    section.style.height = "";
    track.style.transform = "";
  };
}

/** Start alle levende interacties binnen root (standaard: het hele document). */
export function initLiving(root = document) {
  const cleanups = [];
  const scope = root === document ? document.body : root;
  const visibleOnly = (el) => !el.closest("[hidden]");
  root.querySelectorAll("canvas[data-dotfield]").forEach((c) => visibleOnly(c) && cleanups.push(dotField(c)));
  root.querySelectorAll("[data-depth-root]").forEach((r) => visibleOnly(r) && cleanups.push(depth(r)));
  root.querySelectorAll("[data-rail]").forEach((s) => visibleOnly(s) && cleanups.push(rail(s)));
  cleanups.push(magnetic(scope));
  cleanups.push(tilt(scope));
  cleanups.push(velocity(scope));
  return () => cleanups.forEach((fn) => fn());
}
