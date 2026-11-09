(() => {
  "use strict";
  /*__LIVING__*/
  let livingCleanup = null;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const { states: STATES, panels: PANELS, pairs: PAIRS, search: SEARCH } = window.__DATA__;
  const T = {
    nl: {
      roles: ["verkoopadviseur", "e-commerceondernemer"],
      toDark: "Schakel naar donkere modus", toLight: "Schakel naar lichte modus",
      menuOpen: "Menu openen", menuClose: "Menu sluiten", menu: "Menu", mobileNav: "Mobiele navigatie",
      copy: "Kopieer", copied: "Gekopieerd", copyFail: "Selecteer het adres",
      share: "Deel dit profiel met een collega", shared: "Link gekopieerd", shareFail: "Kopieer de link uit de adresbalk",
      errName: "Vul je naam in.", errEmail: "Vul een geldig e-mailadres in.", errMessage: "Schrijf een bericht van minimaal 10 tekens.",
      ready: "Je bericht is gekopieerd. Plak het in een e-mail aan aymanae075@gmail.com, dan reageer ik zo snel mogelijk.",
      readyFail: "Stuur je bericht naar aymanae075@gmail.com, dan reageer ik zo snel mogelijk.",
      topic: "Onderwerp", one: "ervaring", many: "ervaringen",
      search: "Snel navigeren", hint: "Zoek een pagina of ervaring…", empty: "Niets gevonden. Probeer een ander woord.",
      pages: "Pagina’s", experience: "Ervaring & ondernemerschap", navigate: "navigeren", open: "openen", close: "Sluiten",
    },
    en: {
      roles: ["sales adviser", "e-commerce entrepreneur"],
      toDark: "Switch to dark mode", toLight: "Switch to light mode",
      menuOpen: "Open menu", menuClose: "Close menu", menu: "Menu", mobileNav: "Mobile navigation",
      copy: "Copy", copied: "Copied", copyFail: "Select the address",
      share: "Share this profile with a colleague", shared: "Link copied", shareFail: "Copy the link from the address bar",
      errName: "Please enter your name.", errEmail: "Please enter a valid email address.", errMessage: "Please write a message of at least 10 characters.",
      ready: "Your message has been copied. Paste it into an email to aymanae075@gmail.com and I will reply as soon as possible.",
      readyFail: "Please send your message to aymanae075@gmail.com and I will reply as soon as possible.",
      topic: "Subject", one: "role", many: "roles",
      search: "Quick navigation", hint: "Search for a page or role…", empty: "Nothing found. Try another word.",
      pages: "Pages", experience: "Experience & entrepreneurship", navigate: "navigate", open: "open", close: "Close",
    },
  };
  const langOf = (el) => el?.closest?.("[data-lang]")?.dataset.lang || lang;
  const ICON_ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="size-5 text-gold"><path d="M7 17 17 7M8 7h9v9"/></svg>';

  /* ---------- Weergaven ---------- */
  const views = $$("[data-view]");
  const viewByName = (n) => views.find((v) => v.dataset.view === n);
  let current = "home";
  let lang = "nl";
  const counterpart = (name, to) => {
    const isEn = viewByName(name)?.dataset.lang === "en";
    return (to === "en") === isEn ? name : PAIRS[name] || (to === "en" ? "en" : "home");
  };
  /** Bij welk menu-item hoort een weergave? (detailpagina's volgen hun spoor) */
  function navTarget(name) {
    const v = viewByName(name);
    if (!v) return "";
    const m = name.match(/^(en-experience|ervaring)-(.+)$/);
    if (!m) return name;
    const crumbs = $$("nav:not([data-toc]) ol a", v).map((a) => a.getAttribute("href").slice(1));
    return crumbs[crumbs.length - 1] || "";
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

  /* ---------- Routing (hash = weergave) ---------- */
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
    $$("a[hreflang]").forEach((a) => a.setAttribute("href", "#" + counterpart(current, a.getAttribute("hreflang"))));
    const h1 = v?.querySelector("h1")?.textContent.trim();
    document.title = name === "home" || name === "en" || !h1 ? "Ayman El Hammoudi" : `${h1} | Ayman El Hammoudi`;
    bindView(v);
    // Levende interacties (puntenveld, diepte, magneet, rail) voor de zichtbare weergave.
    requestAnimationFrame(() => {
      if (livingCleanup) livingCleanup();
      livingCleanup = initLiving(document);
    });
  }
  function route(withTransition) {
    const h = decodeURIComponent(location.hash.slice(1));
    const go = () => {
      const view = viewByName(h);
      if (view) {
        show(h);
        scrollTo({ top: 0, behavior: "instant" });
      } else {
        const target = h ? document.getElementById(h) : null;
        const owner = target?.closest("[data-view]");
        const wasOther = owner ? owner.dataset.view !== current : false;
        if (owner) show(owner.dataset.view);
        else if (!viewByName(current) || !h) show(h ? current : "home");
        if (target && h !== "main") requestAnimationFrame(() => target.scrollIntoView({ behavior: wasOther || reduce ? "instant" : "smooth" }));
      }
      closeMenu();
      updateNav();
      onScroll();
    };
    const isPage = !!viewByName(h) && h !== current;
    if (withTransition && isPage && document.startViewTransition && !reduce) document.startViewTransition(go);
    else go();
  }
  addEventListener("hashchange", () => route(true));

  /* ---------- Header: actief menu-item en achtergrond ---------- */
  function updateNav() {
    const target = navTarget(current);
    $$("header[data-lang] nav a").forEach((a) => {
      const on = a.getAttribute("href").slice(1) === target;
      a.classList.toggle("text-bg", on);
      a.classList.toggle("text-muted", !on);
      a.classList.toggle("hover:text-ink", !on);
      let pill = a.querySelector(".nav-pill");
      if (on && !pill) {
        pill = document.createElement("span");
        pill.className = "nav-pill absolute inset-0 -z-10 rounded-full bg-ink";
        a.prepend(pill);
      } else if (!on && pill) pill.remove();
      on ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current");
    });
  }
  const progress = $("[data-progress]");
  function onScroll() {
    const y = scrollY;
    const scrolled = y > 8 || menuOpen;
    $$("header[data-lang]").forEach((h) => {
      ["border-line", "bg-bg/80", "backdrop-blur-xl"].forEach((c) => h.classList.toggle(c, scrolled));
      ["border-transparent", "bg-bg/0"].forEach((c) => h.classList.toggle(c, !scrolled));
    });
    if (progress) {
      const max = document.documentElement.scrollHeight - innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    }
    updateToc();
  }
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);

  /* ---------- Inhoudsopgave op detailpagina's ---------- */
  function updateToc() {
    const v = viewByName(current);
    const toc = v && $("[data-toc]", v);
    if (!toc) return;
    const links = $$("a", toc);
    let active = links[0];
    links.forEach((a) => {
      const el = document.getElementById(a.getAttribute("href").slice(1));
      if (el && el.getBoundingClientRect().top < innerHeight * 0.35) active = a;
    });
    links.forEach((a) => {
      const on = a === active;
      on ? a.setAttribute("aria-current", "location") : a.removeAttribute("aria-current");
      ["border-ink", "text-ink", "lg:border-gold"].forEach((c) => a.classList.toggle(c, on));
      ["border-line", "text-muted", "hover:text-ink", "lg:border-transparent"].forEach((c) => a.classList.toggle(c, !on));
    });
  }

  /* ---------- Mobiel menu ---------- */
  let menuOpen = false;
  let menuEl = null;
  function setBars(btn, open) {
    const [l1, l2] = $$("span", btn);
    if (open) { l1?.classList.replace("-translate-y-[3px]", "rotate-45"); l2?.classList.replace("translate-y-[3px]", "-rotate-45"); }
    else { l1?.classList.replace("rotate-45", "-translate-y-[3px]"); l2?.classList.replace("-rotate-45", "translate-y-[3px]"); }
  }
  function openMenu(btn) {
    const t = T[lang];
    const h = header();
    const links = [...$$("nav a", h), $('a[href$="contact"]', h)].filter(Boolean);
    const target = navTarget(current);
    menuOpen = true;
    menuEl = document.createElement("div");
    menuEl.id = "mobile-menu";
    menuEl.setAttribute("role", "dialog");
    menuEl.setAttribute("aria-modal", "true");
    menuEl.setAttribute("aria-label", t.menu);
    menuEl.setAttribute("lang", lang);
    menuEl.className = "menu-in fixed inset-0 z-40 flex flex-col overflow-y-auto bg-bg xl:hidden";
    const items = links
      .map((a, i) => {
        const on = a.getAttribute("href").slice(1) === target;
        return `<li class="menu-link border-b border-line" style="animation-delay:${0.04 + i * 0.04}s"><a href="${a.getAttribute("href")}"${on ? ' aria-current="page"' : ""} class="flex items-center justify-between py-4 text-2xl font-semibold tracking-tight ${on ? "text-ink" : "text-muted"}">${a.textContent.trim()}${ICON_ARROW}</a></li>`;
      })
      .join("");
    const langBtn = (l) => `<a href="#${counterpart(current, l)}" hreflang="${l}" class="grid h-11 place-items-center rounded-full border px-4 font-mono text-xs tracking-[0.12em] uppercase ${l === lang ? "border-ink bg-ink text-bg" : "border-line-strong text-ink"}">${l === "nl" ? "Nederlands" : "English"}</a>`;
    menuEl.innerHTML = `<nav aria-label="${t.mobileNav}" class="container-x flex-1 py-6"><ul class="flex flex-col">${items}</ul></nav><div class="container-x flex flex-wrap items-center justify-between gap-4 border-t border-line py-6 text-sm text-muted"><span><span class="block text-ink">aymanae075@gmail.com</span>06 1906 7349</span><span class="flex gap-2">${langBtn("nl")}${langBtn("en")}</span></div>`;
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

  /* ---------- ⌘K: snel navigeren ---------- */
  let cmdk = null, cmdkIndex = 0, cmdkResults = [], cmdkReturn = null;
  const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  function renderCmdk() {
    const t = T[lang];
    const q = norm($("#cmdk-input", cmdk).value.trim());
    cmdkResults = SEARCH[lang].filter((r) => !q || norm(r.label + " " + r.sub).includes(q));
    cmdkIndex = Math.min(cmdkIndex, Math.max(0, cmdkResults.length - 1));
    const list = $("#cmdk-list", cmdk);
    if (!cmdkResults.length) { list.innerHTML = `<li class="px-3 py-10 text-center text-sm text-muted">${t.empty}</li>`; $("#cmdk-input", cmdk).removeAttribute("aria-activedescendant"); return; }
    list.innerHTML = ["pages", "experience"].map((g) => {
      const items = cmdkResults.map((r, i) => ({ r, i })).filter(({ r }) => r.group === g);
      if (!items.length) return "";
      return `<li role="presentation"><p class="px-3 pt-3 pb-1.5 font-mono text-[0.65rem] tracking-[0.14em] text-muted uppercase">${t[g]}</p><ul role="presentation">${items.map(({ r, i }) => {
        const on = i === cmdkIndex;
        return `<li id="cmdk-${i}" role="option" aria-selected="${on}" data-i="${i}" class="flex cursor-pointer items-center justify-between gap-4 rounded-xl px-3 py-2.5 text-sm transition-colors duration-150 ${on ? "bg-ink text-bg" : "text-ink"}"><span class="min-w-0"><span class="block truncate font-medium">${r.label}</span>${r.sub ? `<span class="block truncate text-xs ${on ? "opacity-70" : "text-muted"}">${r.sub}</span>` : ""}</span><span aria-hidden="true" class="font-mono text-xs">${on ? "↵" : "↗"}</span></li>`;
      }).join("")}</ul></li>`;
    }).join("");
    $("#cmdk-input", cmdk).setAttribute("aria-activedescendant", "cmdk-" + cmdkIndex);
    $(`#cmdk-${cmdkIndex}`, cmdk)?.scrollIntoView({ block: "nearest" });
  }
  function openCmdk() {
    if (cmdk) return;
    closeMenu();
    const t = T[lang];
    cmdkReturn = document.activeElement;
    cmdk = document.createElement("div");
    cmdk.className = "cmdk-in fixed inset-0 z-[90] flex items-start justify-center bg-[#071426]/50 px-4 pt-[12vh] backdrop-blur-sm";
    cmdk.innerHTML = `<div role="dialog" aria-modal="true" aria-label="${t.search}" lang="${lang}" class="cmdk-panel w-full max-w-xl overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-[0_40px_100px_-30px_rgb(0_0_0/0.6)]"><div class="flex items-center gap-3 border-b border-line px-4"><span aria-hidden="true" class="text-muted">⌕</span><input id="cmdk-input" placeholder="${t.hint}" role="combobox" aria-expanded="true" aria-controls="cmdk-list" aria-autocomplete="list" aria-label="${t.search}" class="h-14 w-full bg-transparent text-base text-ink outline-none placeholder:text-muted"><kbd class="rounded border border-line px-1.5 py-0.5 font-mono text-[0.65rem] text-muted">Esc</kbd></div><ul id="cmdk-list" role="listbox" class="max-h-[min(60vh,26rem)] overflow-y-auto p-2"></ul><div class="flex items-center gap-4 border-t border-line px-4 py-2.5 font-mono text-[0.65rem] text-muted"><span>↑ ↓ ${t.navigate}</span><span>↵ ${t.open}</span><button type="button" data-cmdk-close class="ml-auto rounded px-1.5 py-0.5 hover:text-ink">${t.close}</button></div></div>`;
    document.body.appendChild(cmdk);
    root.style.overflow = "hidden";
    cmdkIndex = 0;
    renderCmdk();
    const input = $("#cmdk-input", cmdk);
    input.focus();
    input.addEventListener("input", () => { cmdkIndex = 0; renderCmdk(); });
    cmdk.addEventListener("mousedown", (e) => e.target === cmdk && closeCmdk());
    cmdk.addEventListener("mousemove", (e) => {
      const o = e.target.closest("[role=option]");
      if (o && +o.dataset.i !== cmdkIndex) { cmdkIndex = +o.dataset.i; renderCmdk(); }
    });
    cmdk.addEventListener("click", (e) => {
      if (e.target.closest("[data-cmdk-close]")) return closeCmdk();
      const o = e.target.closest("[role=option]");
      if (o) goCmdk(+o.dataset.i);
    });
    cmdk.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); cmdkIndex = Math.min(cmdkResults.length - 1, cmdkIndex + 1); renderCmdk(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); cmdkIndex = Math.max(0, cmdkIndex - 1); renderCmdk(); }
      else if (e.key === "Enter" && cmdkResults[cmdkIndex]) { e.preventDefault(); goCmdk(cmdkIndex); }
      else if (e.key === "Tab") { e.preventDefault(); input.focus(); }
    });
  }
  function closeCmdk() {
    if (!cmdk) return;
    cmdk.remove();
    cmdk = null;
    root.style.overflow = "";
    cmdkReturn?.focus?.();
  }
  function goCmdk(i) {
    const href = cmdkResults[i]?.href;
    closeCmdk();
    if (href) location.hash = href;
  }
  document.addEventListener("click", (e) => e.target.closest?.("[data-cmdk]") && openCmdk());
  addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); cmdk ? closeCmdk() : openCmdk(); }
    else if (e.key === "Escape") { closeCmdk(); closeMenu(); }
  });
  const isMac = /Mac|iPhone|iPad/.test(navigator.platform);
  $$("[data-cmdk] kbd").forEach((k) => (k.textContent = isMac ? "⌘K" : "Ctrl K"));

  /* ---------- Wisselende functietitel ---------- */
  if (!reduce) {
    $$("em[data-role]").forEach((em) => {
      const roles = T[langOf(em)].roles;
      let i = Math.max(0, roles.indexOf(em.textContent.trim()));
      setInterval(() => {
        if (em.closest("[hidden]")) return;
        i = (i + 1) % roles.length;
        em.classList.remove("role-in");
        void em.offsetWidth;
        em.textContent = roles[i];
        em.classList.add("role-in");
      }, 2600);
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
      if (el.dataset.cntBound || el.children.length) return;
      el.dataset.cntBound = "1";
      const target = parseInt(el.textContent, 10);
      if (!isFinite(target) || target > 1900) return; // jaartallen niet laten optellen
      const ob = new IntersectionObserver(([en]) => {
        if (!en.isIntersecting) return;
        ob.disconnect();
        const t0 = performance.now();
        const step = (t) => {
          const k = Math.min(1, (t - t0) / 1200);
          el.textContent = String(Math.round(target * (1 - Math.pow(1 - k, 4))));
          if (k < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }, { rootMargin: "0px 0px -15% 0px" });
      ob.observe(el);
    });
  }

  /* ---------- Lichtvlek op kaarten ---------- */
  document.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    const s = e.target.closest?.(".spotlight");
    if (s) {
      const r = s.getBoundingClientRect();
      s.style.setProperty("--mx", e.clientX - r.left + "px");
      s.style.setProperty("--my", e.clientY - r.top + "px");
    }
  }, { passive: true });

  /* ---------- Toestanden (vaardigheden, ambitie, websites) ---------- */
  Object.entries(STATES).forEach(([view, s]) => {
    const wrap = $(`#${view}-${s.id} .container-x`);
    if (!wrap) return;
    const select = (idx, focus) => {
      if (!s.html[idx]) return;
      wrap.innerHTML = s.html[idx];
      wrap.classList.remove("state-in"); void wrap.offsetWidth; wrap.classList.add("state-in");
      if (focus) $$(s.btn, wrap)[idx]?.focus({ preventScroll: true });
      bindView(wrap);
    };
    wrap.addEventListener("click", (e) => {
      const btn = e.target.closest(s.btn);
      if (btn) select($$(s.btn, wrap).indexOf(btn), true);
    });
    wrap.addEventListener("keydown", (e) => {
      const btn = e.target.closest("[role=tab]");
      if (!btn) return;
      const tabs = $$("[role=tab]", wrap);
      const i = tabs.indexOf(btn);
      const map = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: tabs.length - 1 };
      if (!(e.key in map)) return;
      e.preventDefault();
      select((map[e.key] + tabs.length) % tabs.length, true);
    });
  });

  /* ---------- Tijdlijn: openklappen en filteren ---------- */
  Object.keys(PANELS).forEach((name) => {
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
          card.classList.remove("border-line-strong", "bg-surface");
          card.classList.add("border-transparent", "hover:bg-surface/60");
          b.querySelector("span[aria-hidden]:last-child")?.classList.remove("rotate-45", "border-ink", "bg-ink", "text-bg");
        });
        if (!open) {
          btn.setAttribute("aria-expanded", "true");
          const card = li.querySelector(":scope > div");
          card.classList.add("border-line-strong", "bg-surface");
          card.classList.remove("border-transparent", "hover:bg-surface/60");
          card.insertAdjacentHTML("beforeend", PANELS[name][btn.dataset.exp]);
          card.querySelector('[role="region"]')?.classList.add("panel-in");
          btn.querySelector("span[aria-hidden]:last-child")?.classList.add("rotate-45", "border-ink", "bg-ink", "text-bg");
        }
        return;
      }
      const f = e.target.closest("button[data-filter]");
      if (f) {
        const which = f.dataset.filter;
        $$("button[data-filter]", ov).forEach((b) => {
          const on = b === f;
          b.setAttribute("aria-pressed", String(on));
          b.classList.toggle("text-bg", on);
          b.classList.toggle("text-muted", !on);
          b.classList.toggle("hover:text-ink", !on);
          let pill = b.querySelector(".filter-pill, span.bg-ink");
          if (on && !pill) { pill = document.createElement("span"); pill.className = "filter-pill absolute inset-0 -z-10 rounded-full bg-ink"; b.prepend(pill); }
          else if (!on && pill) pill.remove();
        });
        let n = 0;
        $$("li[data-group]", ov).forEach((li) => {
          const vis = which === "alles" || li.dataset.group === which;
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
      ["border-ink", "bg-ink", "text-bg"].forEach((c) => lab.classList.toggle(c, x.checked));
      ["border-line-strong", "text-muted", "hover:border-ink", "hover:text-ink"].forEach((c) => lab.classList.toggle(c, !x.checked));
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
        status.className = "mt-6 text-sm text-ink";
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

  /* ---------- Start ---------- */
  function bindView(scope) {
    if (!scope) return;
    bindReveal(scope);
    bindCounters(scope);
  }
  route(false);
  onScroll();
})();
