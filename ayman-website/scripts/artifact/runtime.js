(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const STATES = window.__STATES__;
  const PANELS = window.__PANELS__;
  const T = {
    nl: {
      roles: ["verkoopadviseur", "e-commerceondernemer"],
      toDark: "Schakel naar donkere modus", toLight: "Schakel naar lichte modus",
      menuOpen: "Menu openen", menuClose: "Menu sluiten", menu: "Menu",
      copy: "Kopieer", copied: "Gekopieerd", copyFail: "Selecteer het adres",
      share: "Deel dit profiel met een collega", shared: "Link gekopieerd", shareFail: "Kopieer de link uit de adresbalk",
      errName: "Vul je naam in.", errEmail: "Vul een geldig e-mailadres in.", errMessage: "Schrijf een bericht van minimaal 10 tekens.",
      ready: "Je bericht is gekopieerd. Plak het in een e-mail aan aymanae075@gmail.com, dan reageer ik zo snel mogelijk.",
      readyFail: "Stuur je bericht naar aymanae075@gmail.com, dan reageer ik zo snel mogelijk.",
      topic: "Onderwerp", one: "ervaring", many: "ervaringen", region: "Noord-Holland",
    },
    en: {
      roles: ["sales adviser", "e-commerce entrepreneur"],
      toDark: "Switch to dark mode", toLight: "Switch to light mode",
      menuOpen: "Open menu", menuClose: "Close menu", menu: "Menu",
      copy: "Copy", copied: "Copied", copyFail: "Select the address",
      share: "Share this profile with a colleague", shared: "Link copied", shareFail: "Copy the link from the address bar",
      errName: "Please enter your name.", errEmail: "Please enter a valid email address.", errMessage: "Please write a message of at least 10 characters.",
      ready: "Your message has been copied. Paste it into an email to aymanae075@gmail.com and I will reply as soon as possible.",
      readyFail: "Please send your message to aymanae075@gmail.com and I will reply as soon as possible.",
      topic: "Subject", one: "role", many: "roles", region: "North Holland",
    },
  };
  const langOf = (el) => el?.closest?.("[data-lang]")?.dataset.lang || "nl";

  /* ---------- Weergaven ---------- */
  const views = $$("[data-view]");
  const viewByName = (n) => views.find((v) => v.dataset.view === n);
  let current = "home";
  let lang = "nl";

  /** Dezelfde weergave in de andere taal. */
  function counterpart(name, to) {
    const isEn = name === "en" || name.startsWith("en-");
    const bare = name === "en" ? "home" : isEn ? name.slice(3) : name;
    if (to === "nl") return bare;
    return bare === "home" ? "en" : "en-" + bare;
  }

  /* ---------- Thema ---------- */
  function syncTheme() {
    const light = root.dataset.theme === "light";
    $$("[data-theme-toggle]").forEach((btn) => {
      const [sun, moon] = $$("svg", btn);
      if (sun && moon) {
        sun.style.opacity = light ? "1" : "0";
        sun.style.rotate = light ? "0deg" : "-90deg";
        moon.style.opacity = light ? "0" : "1";
        moon.style.rotate = light ? "90deg" : "0deg";
      }
      const t = T[langOf(btn)];
      const label = light ? t.toDark : t.toLight;
      btn.setAttribute("aria-label", label);
      btn.title = label;
    });
  }
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") root.dataset.theme = saved;
  } catch (_) {}
  if (!root.dataset.theme) root.dataset.theme = matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  document.addEventListener("click", (e) => {
    const btn = e.target.closest?.("[data-theme-toggle]");
    if (!btn) return;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    const apply = () => {
      root.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch (_) {}
      syncTheme();
    };
    if (!document.startViewTransition || reduce) return apply();
    const r = btn.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    root.style.setProperty("--vt-x", cx + "px");
    root.style.setProperty("--vt-y", cy + "px");
    root.style.setProperty("--vt-r", Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy)) + "px");
    root.classList.add("theme-vt");
    const vt = document.startViewTransition(apply);
    const done = () => root.classList.remove("theme-vt");
    vt && vt.finished ? vt.finished.then(done, done) : setTimeout(done, 900);
  });
  syncTheme();

  /* ---------- Routing ---------- */
  const header = () => $(`header[data-lang="${lang}"]`);
  function show(name) {
    views.forEach((v) => (v.hidden = v.dataset.view !== name));
    const v = viewByName(name);
    if (v && name !== current) {
      v.classList.remove("page-enter");
      void v.offsetWidth;
      v.classList.add("page-enter");
    }
    current = name;
    lang = v?.dataset.lang || "nl";
    root.lang = lang;
    $$("header[data-lang], footer[data-lang]").forEach((el) => (el.hidden = el.dataset.lang !== lang));
    // taalknoppen wijzen naar dezelfde weergave in de andere taal
    $$("[data-lang-switch] a").forEach((a) => {
      const to = (a.getAttribute("lang") || a.textContent.trim()).toLowerCase().startsWith("en") ? "en" : "nl";
      a.setAttribute("href", "#" + counterpart(current, to));
    });
    bindView(v);
  }
  function route() {
    const h = decodeURIComponent(location.hash.slice(1));
    const view = viewByName(h);
    if (view) {
      show(h);
      scrollTo({ top: 0, behavior: "instant" });
    } else {
      const target = h ? document.getElementById(h) : null;
      const owner = target?.closest("[data-view]");
      const wasOther = owner ? owner.dataset.view !== current : current !== "home";
      show(owner ? owner.dataset.view : lang === "en" ? "en" : "home");
      if (target) requestAnimationFrame(() => target.scrollIntoView({ behavior: wasOther || reduce ? "instant" : "smooth" }));
      else if (wasOther) scrollTo({ top: 0, behavior: "instant" });
    }
    closeMenu();
    updateNav();
    const ring = $(".cur-ring");
    if (ring) { ring.classList.remove("is-hover", "is-label"); ring.textContent = ""; }
  }
  addEventListener("hashchange", route);

  /* ---------- Header: actief menu, achtergrond, verbergen ---------- */
  let lastY = scrollY;
  function updateNav() {
    const h = header();
    if (!h) return;
    const links = $$('nav a[href^="#"]', h).filter((a) => !a.closest("#mobile-menu"));
    const bare = current === "en" ? "home" : current.replace(/^en-/, "");
    let active = "";
    if (bare.startsWith("ervaring-") || bare === "alle-ervaring") active = "ervaring";
    else if (bare === "online-cv") active = "cv";
    else {
      const mid = innerHeight * 0.5;
      links.forEach((a) => {
        const el = document.getElementById(a.getAttribute("href").slice(1));
        if (el) { const r = el.getBoundingClientRect(); if (r.top <= mid && r.bottom >= mid) active = a.getAttribute("href").slice(1).replace(/^en-/, ""); }
      });
    }
    links.forEach((a) => {
      const on = a.getAttribute("href").slice(1).replace(/^en-/, "") === active;
      a.classList.toggle("text-on-gold", on);
      a.classList.toggle("text-muted", !on);
      let pill = a.querySelector(".nav-pill");
      if (on && !pill) {
        pill = document.createElement("span");
        pill.className = "nav-pill absolute inset-0 -z-10 rounded-full bg-gold";
        a.prepend(pill);
      } else if (!on && pill) pill.remove();
      on ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current");
    });
  }
  const progress = $("[data-progress]");
  function onScroll() {
    const y = scrollY;
    const scrolled = y > 24 || menuOpen;
    $$("header[data-lang]").forEach((h) => {
      const inner = h.firstElementChild;
      if (inner) {
        inner.classList.toggle("border-transparent", !scrolled);
        ["border-line", "bg-bg/75", "backdrop-blur-xl"].forEach((c) => inner.classList.toggle(c, scrolled));
      }
      h.style.transform = y > 400 && y > lastY && !menuOpen ? "translateY(-110%)" : "none";
    });
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
  let menuEl = null;
  function setBars(btn, open) {
    const [l1, l2] = $$("span", btn);
    if (open) { l1?.classList.replace("-translate-y-[4px]", "rotate-45"); l2?.classList.replace("translate-y-[4px]", "-rotate-45"); }
    else { l1?.classList.replace("rotate-45", "-translate-y-[4px]"); l2?.classList.replace("-rotate-45", "translate-y-[4px]"); }
  }
  function openMenu(btn) {
    const t = T[lang];
    const links = $$("nav a[href^='#']", header()).filter((a) => !a.closest("#mobile-menu"));
    menuOpen = true;
    menuEl = document.createElement("div");
    menuEl.id = "mobile-menu";
    menuEl.setAttribute("role", "dialog");
    menuEl.setAttribute("aria-modal", "true");
    menuEl.setAttribute("aria-label", t.menu);
    menuEl.setAttribute("lang", lang);
    menuEl.className = "menu-in fixed inset-0 z-40 flex flex-col bg-bg pt-24 xl:hidden";
    const items = links
      .map((a, i) => `<li class="overflow-hidden border-b border-line"><a href="${a.getAttribute("href")}" class="menu-link flex items-baseline justify-between py-4 font-display text-[clamp(2.4rem,11vw,4rem)] leading-none" style="animation-delay:${0.12 + i * 0.06}s">${a.textContent}<span class="font-mono text-xs text-gold">0${i + 1}</span></a></li>`)
      .join("");
    const other = lang === "en" ? "nl" : "en";
    menuEl.innerHTML = `<nav class="container-x flex-1"><ul class="flex flex-col">${items}</ul></nav><div class="container-x flex flex-col gap-1 py-8 text-sm text-muted"><span class="text-ink">aymanae075@gmail.com</span><span>06 1906 7349</span><span>${t.region}</span><a href="#${counterpart(current, other)}" style="align-self:flex-start" class="mt-4 inline-grid h-11 place-items-center rounded-full border border-line-strong px-5 font-mono text-xs tracking-[0.14em] text-ink uppercase">${other === "en" ? "English" : "Nederlands"}</a></div>`;
    document.body.appendChild(menuEl);
    btn.setAttribute("aria-expanded", "true");
    btn.setAttribute("aria-label", t.menuClose);
    setBars(btn, true);
    root.style.overflow = "hidden";
    onScroll();
  }
  function closeMenu() {
    if (!menuOpen) return;
    menuOpen = false;
    menuEl?.remove();
    $$("[data-menu-btn]").forEach((btn) => {
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", T[langOf(btn)].menuOpen);
      setBars(btn, false);
    });
    root.style.overflow = "";
    onScroll();
  }
  document.addEventListener("click", (e) => {
    const btn = e.target.closest?.("[data-menu-btn]");
    if (btn) return menuOpen ? closeMenu() : openMenu(btn);
    if (menuOpen && e.target.closest("#mobile-menu a")) closeMenu();
  });
  addEventListener("keydown", (e) => e.key === "Escape" && closeMenu());

  /* ---------- Wisselende functietitel ---------- */
  if (!reduce) {
    $$("[data-view='home'] #hero-title, [data-view='en'] #en-hero-title").forEach((h1) => {
      const em = h1.previousElementSibling?.querySelector("em.accent:not(.invisible)");
      const roles = T[langOf(h1)].roles;
      if (!em) return;
      let i = Math.max(0, roles.indexOf(em.textContent.trim()));
      setInterval(() => {
        i = (i + 1) % roles.length;
        em.classList.remove("role-in");
        void em.offsetWidth;
        em.textContent = roles[i];
        em.classList.add("role-in");
      }, 2600);
    });
  }

  /* ---------- Woorden die oplichten bij scrollen ---------- */
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
      if (r.top < innerHeight && r.bottom > 0) return;
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
    const hero = e.target.closest?.("#top, #en-top");
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

  /* ---------- Toestanden (vaardigheden, ambitie, projecten) ---------- */
  const STATE = { skills: ["vaardigheden", "[role=tab]"], growth: ["ambitie", "[role=group] button"], projects: ["werk", "[role=group] button"] };
  ["nl", "en"].forEach((l) => {
    Object.entries(STATE).forEach(([key, [id, btnSel]]) => {
      const wrap = $(`#${l === "en" ? "en-" : ""}${id} .container-x`);
      if (!wrap || !STATES[l]?.[key]) return;
      wrap.addEventListener("click", (e) => {
        const btn = e.target.closest(btnSel);
        if (!btn) return;
        const idx = $$(btnSel, wrap).indexOf(btn);
        if (idx < 0 || !STATES[l][key][idx]) return;
        wrap.innerHTML = STATES[l][key][idx];
        wrap.classList.remove("state-in"); void wrap.offsetWidth; wrap.classList.add("state-in");
        $$(btnSel, wrap)[idx]?.focus({ preventScroll: true });
        bindView(wrap);
      });
    });
  });

  /* ---------- Tijdlijn: openklappen en filteren ---------- */
  ["alle-ervaring", "en-alle-ervaring"].forEach((name) => {
    const ov = viewByName(name);
    if (!ov) return;
    const l = ov.dataset.lang;
    ov.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-exp]");
      if (btn) {
        const li = btn.closest("li");
        const open = btn.getAttribute("aria-expanded") === "true";
        $$("button[data-exp]", ov).forEach((b) => {
          const l2 = b.closest("li");
          b.setAttribute("aria-expanded", "false");
          l2.querySelector('[role="region"]')?.remove();
          const card = l2.querySelector(":scope > div");
          card.classList.remove("border-line-strong", "bg-surface/70");
          card.classList.add("border-transparent");
          b.querySelector("span[aria-hidden]:last-child")?.classList.remove("rotate-45", "bg-gold", "text-on-gold");
        });
        if (!open) {
          btn.setAttribute("aria-expanded", "true");
          const card = li.querySelector(":scope > div");
          card.classList.add("border-line-strong", "bg-surface/70");
          card.classList.remove("border-transparent");
          card.insertAdjacentHTML("beforeend", PANELS[l][btn.dataset.exp]);
          card.querySelector('[role="region"]')?.classList.add("panel-in");
          btn.querySelector("span[aria-hidden]:last-child")?.classList.add("rotate-45", "bg-gold", "text-on-gold");
        }
        return;
      }
      const f = e.target.closest("button[data-filter]");
      if (f) {
        const which = f.dataset.filter;
        $$("button[data-filter]", ov).forEach((b) => {
          const on = b === f;
          b.setAttribute("aria-pressed", String(on));
          b.classList.toggle("text-on-gold", on);
          b.classList.toggle("text-muted", !on);
          let pill = b.querySelector(".filter-pill");
          if (on && !pill) { pill = document.createElement("span"); pill.className = "filter-pill absolute inset-0 -z-10 rounded-full bg-gold"; b.prepend(pill); }
          else if (!on && pill) pill.remove();
        });
        let n = 0;
        $$("li[data-track]", ov).forEach((li) => {
          const vis = which === "alles" || li.dataset.track === which;
          li.hidden = !vis;
          if (vis) n++;
        });
        const counter = $('p[aria-live="polite"]', ov);
        if (counter) counter.textContent = `${n} ${n === 1 ? T[l].one : T[l].many}`;
      }
    });
  });

  /* ---------- Contact ---------- */
  document.addEventListener("change", (e) => {
    const r = e.target.closest?.('input[type=radio][name="topic"]');
    if (!r) return;
    $$('input[name="topic"]', r.form).forEach((x) => {
      const lab = x.closest("label");
      ["border-gold", "bg-gold", "text-on-gold"].forEach((c) => lab.classList.toggle(c, x.checked));
      ["border-line-strong", "text-muted"].forEach((c) => lab.classList.toggle(c, !x.checked));
    });
  });
  async function copy(text, done) {
    try { await navigator.clipboard.writeText(text); done(true); } catch (_) { done(false); }
  }
  document.addEventListener("click", (e) => {
    const c = e.target.closest?.('button[aria-label="Kopieer e-mailadres"], button[aria-label="Copy email address"]');
    if (c) {
      const t = T[langOf(c)];
      copy("aymanae075@gmail.com", (ok) => {
        c.lastChild.textContent = ok ? t.copied : t.copyFail;
        setTimeout(() => (c.lastChild.textContent = t.copy), 2200);
      });
    }
    const s = e.target.closest?.("[data-share]");
    if (s) {
      const t = T[langOf(s)];
      copy(location.href.split("#")[0], (ok) => {
        const lab = s.querySelector("span[aria-live]");
        if (lab) { lab.textContent = ok ? t.shared : t.shareFail; setTimeout(() => (lab.textContent = t.share), 2400); }
      });
    }
  });
  $$("form").forEach((form) => {
    if (!form.querySelector('[name="message"]')) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const t = T[langOf(form)];
      const d = new FormData(form);
      const name = String(d.get("name") || "").trim();
      const email = String(d.get("email") || "").trim();
      const msg = String(d.get("message") || "").trim();
      const errs = {};
      if (name.length < 2) errs.name = t.errName;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = t.errEmail;
      if (msg.length < 10) errs.message = t.errMessage;
      ["name", "email", "message"].forEach((k) => {
        const inp = form.querySelector(`[name="${k}"]`);
        const id = `${form.closest("[data-view]").dataset.view}-err-${k}`;
        let p = document.getElementById(id);
        if (errs[k]) {
          inp.setAttribute("aria-invalid", "true");
          inp.setAttribute("aria-describedby", id);
          if (!p) { p = document.createElement("p"); p.id = id; p.className = "mt-2 text-sm text-red-400"; inp.parentElement.appendChild(p); }
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
      copy(`${t.topic}: ${d.get("topic") || ""}\n\n${msg}\n\n${name}\n${email}`, (ok) => (status.textContent = ok ? t.ready : t.readyFail));
    });
  });

  /* ---------- Footer ---------- */
  const fmt = new Intl.DateTimeFormat("nl-NL", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Amsterdam" });
  const tick = () => $$("[data-clock]").forEach((c) => (c.textContent = fmt.format(new Date())));
  tick(); setInterval(tick, 15000);
  $$("footer button").forEach((b) => {
    if (/boven|top/i.test(b.textContent)) b.addEventListener("click", () => scrollTo({ top: 0, behavior: reduce ? "instant" : "smooth" }));
  });

  /* ---------- Gouden cursor ---------- */
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
