(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const STATES = window.__STATES__;
  const PANELS = window.__PANELS__;
  const TRACKS = window.__TRACKS__;
  const ROLES = ["verkoopadviseur", "e-commerceondernemer"];

  /* ---------- Thema ---------- */
  const themeBtn = $('header button[aria-label^="Schakel naar"]');
  function syncTheme() {
    const light = root.dataset.theme === "light";
    if (!themeBtn) return;
    const [sun, moon] = $$("svg", themeBtn);
    if (sun && moon) {
      sun.style.opacity = light ? "1" : "0";
      sun.style.rotate = light ? "0deg" : "-90deg";
      moon.style.opacity = light ? "0" : "1";
      moon.style.rotate = light ? "90deg" : "0deg";
    }
    const label = light ? "Schakel naar donkere modus" : "Schakel naar lichte modus";
    themeBtn.setAttribute("aria-label", label);
    themeBtn.title = label;
  }
  if (!root.dataset.theme) {
    root.dataset.theme = matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }
  themeBtn?.addEventListener("click", (e) => {
    const next = root.dataset.theme === "light" ? "dark" : "light";
    const apply = () => {
      root.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch (_) {}
      syncTheme();
    };
    if (!document.startViewTransition || reduce) return apply();
    const r = e.currentTarget.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    root.style.setProperty("--vt-x", cx + "px");
    root.style.setProperty("--vt-y", cy + "px");
    root.style.setProperty("--vt-r", Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy)) + "px");
    document.startViewTransition(apply);
  });
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") root.dataset.theme = saved;
  } catch (_) {}
  syncTheme();

  /* ---------- Weergaven (hash-routing) ---------- */
  const views = $$("[data-view]");
  const home = $('[data-view="home"]');
  let current = "home";
  function show(name) {
    views.forEach((v) => (v.hidden = v.dataset.view !== name));
    const v = views.find((x) => x.dataset.view === name);
    if (v && name !== current) {
      v.classList.remove("page-enter");
      void v.offsetWidth;
      v.classList.add("page-enter");
    }
    current = name;
    bindView(v);
  }
  function route() {
    const h = decodeURIComponent(location.hash.slice(1));
    const view = views.find((x) => x.dataset.view === h && h !== "home");
    if (view) {
      show(h);
      scrollTo({ top: 0, behavior: "instant" });
    } else {
      const wasOther = current !== "home";
      show("home");
      const target = h ? document.getElementById(h) : null;
      if (target) requestAnimationFrame(() => target.scrollIntoView({ behavior: wasOther || reduce ? "instant" : "smooth" }));
      else if (wasOther) scrollTo({ top: 0, behavior: "instant" });
    }
    closeMenu();
    updateNav();
    const ring = document.querySelector(".cur-ring");
    if (ring) { ring.classList.remove("is-hover", "is-label"); ring.textContent = ""; }
  }
  addEventListener("hashchange", route);

  /* ---------- Header: verbergen, achtergrond, actieve link ---------- */
  const header = $("header");
  const headerInner = header?.firstElementChild;
  const navLinks = $$('nav[aria-label="Hoofdnavigatie"] a', header);
  let lastY = scrollY;
  function updateNav() {
    let active = "";
    if (current.startsWith("ervaring-") || current === "alle-ervaring") active = "ervaring";
    else if (current === "online-cv") active = "cv";
    else {
      const mid = innerHeight * 0.5;
      navLinks.forEach((a) => {
        const el = document.getElementById(a.getAttribute("href").slice(1));
        if (el) { const r = el.getBoundingClientRect(); if (r.top <= mid && r.bottom >= mid) active = el.id; }
      });
    }
    navLinks.forEach((a) => {
      const on = a.getAttribute("href") === "#" + active;
      a.classList.toggle("text-on-gold", on);
      a.classList.toggle("text-muted", !on);
      let pill = a.querySelector(".nav-pill");
      if (on && !pill) {
        pill = document.createElement("span");
        pill.className = "nav-pill absolute inset-0 -z-10 rounded-full bg-gold";
        a.prepend(pill);
      } else if (!on && pill) pill.remove();
      if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
    });
  }
  const progress = $("[data-progress]");
  function onScroll() {
    const y = scrollY;
    const scrolled = y > 24 || menuOpen;
    if (headerInner) {
      headerInner.classList.toggle("border-transparent", !scrolled);
      ["border-line", "bg-bg/75", "backdrop-blur-xl"].forEach((c) => headerInner.classList.toggle(c, scrolled));
    }
    if (header) header.style.transform = y > 400 && y > lastY && !menuOpen ? "translateY(-110%)" : "none";
    lastY = y;
    if (progress) {
      const max = document.documentElement.scrollHeight - innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    }
    updateNav();
    scrollTexts();
  }
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);

  /* ---------- Mobiel menu ---------- */
  let menuOpen = false;
  const menuBtn = $('header button[aria-controls="mobile-menu"]');
  let menuEl = null;
  function openMenu() {
    menuOpen = true;
    menuEl = document.createElement("div");
    menuEl.id = "mobile-menu";
    menuEl.setAttribute("role", "dialog");
    menuEl.setAttribute("aria-modal", "true");
    menuEl.setAttribute("aria-label", "Menu");
    menuEl.className = "menu-in fixed inset-0 z-40 flex flex-col bg-bg pt-24 lg:hidden";
    const items = navLinks
      .map((a, i) => `<li class="overflow-hidden border-b border-line"><a href="${a.getAttribute("href")}" class="menu-link flex items-baseline justify-between py-4 font-display text-[clamp(2.4rem,11vw,4rem)] leading-none" style="animation-delay:${0.12 + i * 0.06}s">${a.textContent}<span class="font-mono text-xs text-gold">0${i + 1}</span></a></li>`)
      .join("");
    menuEl.innerHTML = `<nav aria-label="Mobiele navigatie" class="container-x flex-1"><ul class="flex flex-col">${items}</ul></nav><div class="container-x flex flex-col gap-1 py-8 text-sm text-muted"><span class="text-ink">aymanae075@gmail.com</span><span>06 1906 7349</span><span>Noord-Holland</span></div>`;
    document.body.appendChild(menuEl);
    menuBtn.setAttribute("aria-expanded", "true");
    menuBtn.setAttribute("aria-label", "Menu sluiten");
    const [l1, l2] = $$("span", menuBtn);
    l1?.classList.replace("-translate-y-[4px]", "rotate-45");
    l2?.classList.replace("translate-y-[4px]", "-rotate-45");
    document.documentElement.style.overflow = "hidden";
    onScroll();
  }
  function closeMenu() {
    if (!menuOpen) return;
    menuOpen = false;
    menuEl?.remove();
    menuBtn?.setAttribute("aria-expanded", "false");
    menuBtn?.setAttribute("aria-label", "Menu openen");
    const [l1, l2] = $$("span", menuBtn);
    l1?.classList.replace("rotate-45", "-translate-y-[4px]");
    l2?.classList.replace("-rotate-45", "translate-y-[4px]");
    document.documentElement.style.overflow = "";
    onScroll();
  }
  menuBtn?.addEventListener("click", () => (menuOpen ? closeMenu() : openMenu()));
  addEventListener("keydown", (e) => e.key === "Escape" && closeMenu());
  document.addEventListener("click", (e) => {
    if (menuOpen && e.target.closest("#mobile-menu a")) closeMenu();
  });

  /* ---------- Wisselende functietitel in de hero ---------- */
  const roleEm = $('[data-view="home"] #hero-title')?.previousElementSibling?.querySelector("em.accent");
  if (roleEm && !reduce) {
    let i = 0;
    setInterval(() => {
      i = (i + 1) % ROLES.length;
      roleEm.classList.remove("role-in");
      void roleEm.offsetWidth;
      roleEm.textContent = ROLES[i];
      roleEm.classList.add("role-in");
    }, 2600);
  }

  /* ---------- Woorden die oplichten tijdens het scrollen ---------- */
  function scrollTexts() {
    if (reduce) return;
    $$("[data-scrolltext]").forEach((p) => {
      if (p.closest("[hidden]")) return;
      const r = p.getBoundingClientRect();
      const start = innerHeight * 0.85, end = innerHeight * 0.45;
      const prog = Math.min(1, Math.max(0, (start - r.top) / (start - end + r.height)));
      const words = $$(":scope > span[aria-hidden] > span", p);
      words.forEach((w, i) => {
        const a = i / words.length, b = a + 1 / words.length;
        const t = Math.min(1, Math.max(0, (prog - a) / (b - a)));
        const min = w.classList.contains("accent") ? 0.8 : 0.55;
        w.style.opacity = String(min + (1 - min) * t);
      });
    });
  }

  /* ---------- Verschijnen bij scrollen (vanuit zichtbare rusttoestand) ---------- */
  const io = "IntersectionObserver" in window && !reduce
    ? new IntersectionObserver((entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("rv-in"); io.unobserve(en.target); }
      }), { rootMargin: "0px 0px -8% 0px" })
    : null;
  function bindReveal(scope) {
    if (!io) return;
    $$("[data-rv]", scope).forEach((el) => {
      if (el.dataset.rvBound) return;
      el.dataset.rvBound = "1";
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) return; // al in beeld: niets verschuiven
      el.classList.add("rv");
      io.observe(el);
    });
  }

  /* ---------- Optellende cijfers ---------- */
  function bindCounters(scope) {
    if (reduce || !("IntersectionObserver" in window)) return;
    $$(".tabular-nums", scope).forEach((el) => {
      if (el.dataset.cntBound) return;
      el.dataset.cntBound = "1";
      const target = parseInt(el.textContent, 10);
      if (!isFinite(target)) return;
      const ob = new IntersectionObserver(([en]) => {
        if (!en.isIntersecting) return;
        ob.disconnect();
        const t0 = performance.now();
        const step = (t) => {
          const k = Math.min(1, (t - t0) / 1800);
          el.textContent = String(Math.round(target * (1 - Math.pow(1 - k, 4))));
          if (k < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }, { rootMargin: "0px 0px -15% 0px" });
      ob.observe(el);
    });
  }

  /* ---------- Lichtvlek, kantelende kaarten ---------- */
  document.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    const s = e.target.closest?.(".spotlight");
    if (s) {
      const r = s.getBoundingClientRect();
      s.style.setProperty("--mx", e.clientX - r.left + "px");
      s.style.setProperty("--my", e.clientY - r.top + "px");
    }
    const hero = e.target.closest?.("#top");
    if (hero) {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty("--hx", e.clientX - r.left + "px");
      hero.style.setProperty("--hy", e.clientY - r.top + "px");
    }
    if (reduce) return;
    const t = e.target.closest?.('[class*="group/tilt"]');
    $$('[class*="group/tilt"]').forEach((el) => { if (el !== t) el.style.transform = ""; });
    if (t) {
      const r = t.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      t.style.transform = `perspective(1200px) rotateX(${(0.5 - py) * 12}deg) rotateY(${(px - 0.5) * 12}deg)`;
      const g = t.querySelector(":scope > div.mix-blend-overlay");
      if (g) g.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgb(255 255 255 / .28), transparent 55%)`;
    }
  }, { passive: true });

  /* ---------- Toestanden wisselen (vaardigheden, ambitie, projecten) ---------- */
  const STATE_WRAPS = { skills: "#vaardigheden .container-x", growth: "#ambitie .container-x", projects: "#werk .container-x" };
  const STATE_BTNS = { skills: "[role=tab]", growth: "[role=group] button", projects: "[role=group] button" };
  Object.entries(STATE_WRAPS).forEach(([key, sel]) => {
    const wrap = $(sel);
    if (!wrap) return;
    wrap.addEventListener("click", (e) => {
      const btn = e.target.closest(STATE_BTNS[key]);
      if (!btn) return;
      const idx = $$(STATE_BTNS[key], wrap).indexOf(btn);
      if (idx < 0 || !STATES[key][idx]) return;
      wrap.innerHTML = STATES[key][idx];
      wrap.classList.remove("state-in"); void wrap.offsetWidth; wrap.classList.add("state-in");
      $$(STATE_BTNS[key], wrap)[idx]?.focus({ preventScroll: true });
      bindView(wrap);
    });
  });

  /* ---------- Tijdlijn: openklappen en filteren ---------- */
  const overview = $('[data-view="alle-ervaring"]');
  if (overview) {
    overview.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-exp]");
      if (btn) {
        const li = btn.closest("li");
        const open = btn.getAttribute("aria-expanded") === "true";
        $$("button[data-exp]", overview).forEach((b) => {
          const l = b.closest("li");
          b.setAttribute("aria-expanded", "false");
          l.querySelector('[role="region"]')?.remove();
          const card = l.querySelector(":scope > div");
          card.classList.remove("border-line-strong", "bg-surface/70");
          card.classList.add("border-transparent");
          const ic = b.querySelector("span[aria-hidden]:last-child");
          ic?.classList.remove("rotate-45", "bg-gold", "text-on-gold");
        });
        if (!open) {
          btn.setAttribute("aria-expanded", "true");
          const card = li.querySelector(":scope > div");
          card.classList.add("border-line-strong", "bg-surface/70");
          card.classList.remove("border-transparent");
          card.insertAdjacentHTML("beforeend", PANELS[btn.dataset.exp]);
          const reg = card.querySelector('[role="region"]');
          reg?.classList.add("panel-in");
          btn.querySelector("span[aria-hidden]:last-child")?.classList.add("rotate-45", "bg-gold", "text-on-gold");
        }
        return;
      }
      const f = e.target.closest('[role="group"][aria-label="Filter werkervaring"] button');
      if (f) {
        const which = f.dataset.filter;
        $$('[role="group"][aria-label="Filter werkervaring"] button', overview).forEach((b) => {
          const on = b === f;
          b.setAttribute("aria-pressed", String(on));
          b.classList.toggle("text-on-gold", on);
          b.classList.toggle("text-muted", !on);
          let pill = b.querySelector(".filter-pill");
          if (on && !pill) { pill = document.createElement("span"); pill.className = "filter-pill absolute inset-0 -z-10 rounded-full bg-gold"; b.prepend(pill); }
          else if (!on && pill) pill.remove();
        });
        let n = 0;
        $$("li[data-track]", overview).forEach((li) => {
          const show = which === "alles" || li.dataset.track === which;
          li.hidden = !show;
          if (show) n++;
        });
        const counter = $('p[aria-live="polite"]', overview);
        if (counter) counter.textContent = `${n} ${n === 1 ? "ervaring" : "ervaringen"}`;
      }
    });
  }

  /* ---------- Contact: onderwerp, kopiëren, formulier ---------- */
  document.addEventListener("change", (e) => {
    const r = e.target.closest?.('input[type=radio][name="topic"]');
    if (!r) return;
    $$('input[name="topic"]').forEach((x) => {
      const lab = x.closest("label");
      const on = x.checked;
      ["border-gold", "bg-gold", "text-on-gold"].forEach((c) => lab.classList.toggle(c, on));
      ["border-line-strong", "text-muted"].forEach((c) => lab.classList.toggle(c, !on));
    });
  });
  async function copy(text, onDone) {
    try { await navigator.clipboard.writeText(text); onDone(true); }
    catch (_) { onDone(false); }
  }
  document.addEventListener("click", (e) => {
    const c = e.target.closest?.('button[aria-label="Kopieer e-mailadres"]');
    if (c) {
      copy("aymanae075@gmail.com", (ok) => {
        c.lastChild.textContent = ok ? "Gekopieerd" : "Selecteer het adres";
        setTimeout(() => (c.lastChild.textContent = "Kopieer"), 2200);
      });
    }
    const s = e.target.closest?.("[data-share]");
    if (s) {
      copy(location.href.split("#")[0], (ok) => {
        const t = s.querySelector("span[aria-live]");
        if (t) { t.textContent = ok ? "Link gekopieerd" : "Kopieer de link uit de adresbalk"; setTimeout(() => (t.textContent = "Deel dit profiel met een collega"), 2400); }
      });
    }
  });
  const form = $("#contact form");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = new FormData(form);
    const name = String(d.get("name") || "").trim();
    const email = String(d.get("email") || "").trim();
    const msg = String(d.get("message") || "").trim();
    const topic = String(d.get("topic") || "");
    const errs = {};
    if (name.length < 2) errs.name = "Vul je naam in.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Vul een geldig e-mailadres in.";
    if (msg.length < 10) errs.message = "Schrijf een bericht van minimaal 10 tekens.";
    ["name", "email", "message"].forEach((k) => {
      const inp = form.querySelector(`[name="${k}"]`);
      let p = form.querySelector(`#e-${k}`);
      if (errs[k]) {
        inp.setAttribute("aria-invalid", "true");
        inp.setAttribute("aria-describedby", `e-${k}`);
        if (!p) { p = document.createElement("p"); p.id = `e-${k}`; p.className = "mt-2 text-sm text-red-400"; inp.parentElement.appendChild(p); }
        p.textContent = errs[k];
      } else {
        inp.removeAttribute("aria-invalid"); inp.removeAttribute("aria-describedby"); p?.remove();
      }
    });
    const first = Object.keys(errs)[0];
    if (first) { form.querySelector(`[name="${first}"]`).focus(); return; }
    let status = form.querySelector("[data-status]");
    if (!status) {
      status = document.createElement("p");
      status.setAttribute("role", "status");
      status.dataset.status = "";
      status.className = "mt-6 text-sm text-gold";
      form.appendChild(status);
    }
    const text = `Onderwerp: ${topic}\n\n${msg}\n\n${name}\n${email}`;
    copy(text, (ok) => {
      status.textContent = ok
        ? "Je bericht is gekopieerd. Plak het in een e-mail aan aymanae075@gmail.com, dan reageer ik zo snel mogelijk."
        : "Stuur je bericht naar aymanae075@gmail.com, dan reageer ik zo snel mogelijk.";
    });
  });

  /* ---------- Footer: lokale tijd, terug naar boven ---------- */
  const fmt = new Intl.DateTimeFormat("nl-NL", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Amsterdam" });
  const clock = $("[data-clock]");
  const tick = () => clock && (clock.textContent = fmt.format(new Date()));
  tick(); setInterval(tick, 15000);
  $$("footer button").forEach((b) => {
    if (/boven/i.test(b.textContent)) b.addEventListener("click", () => scrollTo({ top: 0, behavior: reduce ? "instant" : "smooth" }));
  });

  /* ---------- Gouden cursor (alleen muis) ---------- */
  if (matchMedia("(pointer: fine)").matches && !reduce) {
    const dot = document.createElement("div");
    const ring = document.createElement("div");
    dot.className = "cur-dot"; ring.className = "cur-ring";
    dot.setAttribute("aria-hidden", "true"); ring.setAttribute("aria-hidden", "true");
    document.body.append(dot, ring);
    let x = -100, y = -100, rx = -100, ry = -100;
    addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX; y = e.clientY;
      const t = e.target.closest?.("a, button, [data-cursor], label, input, textarea");
      const label = t?.dataset?.cursor && t.dataset.cursor !== "hover" ? t.dataset.cursor : "";
      ring.classList.toggle("is-hover", !!t);
      ring.classList.toggle("is-label", !!label);
      ring.textContent = label;
    }, { passive: true });
    const loop = () => {
      rx += (x - rx) * 0.22; ry += (y - ry) * 0.22;
      dot.style.transform = `translate(${x}px, ${y}px)`;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(loop);
    };
    loop();
  }

  /* ---------- Start ---------- */
  function bindView(scope) {
    if (!scope) return;
    bindReveal(scope);
    bindCounters(scope);
  }
  route();
  onScroll();
})();
