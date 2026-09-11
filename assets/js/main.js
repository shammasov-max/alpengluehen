/* ============================================================================
   ALPENGLÜHEN — main.js · interactions & progressive enhancement
   ============================================================================ */
(function () {
  "use strict";
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Year in footer ---- */
  $$("[data-year]").forEach(el => { el.textContent = new Date().getFullYear(); });

  /* ---- Header scroll state ---- */
  const header = $(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Mobile menu ---- */
  const toggle = $(".menu-toggle");
  const menu = $(".mobile-menu");
  if (toggle && menu) {
    const close = () => { document.body.classList.remove("menu-open"); toggle.setAttribute("aria-expanded", "false"); };
    toggle.addEventListener("click", () => {
      const open = document.body.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    $$(".mobile-menu a").forEach(a => a.addEventListener("click", close));
    document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
  }

  /* ---- Photo lazy fade-in + graceful fallback ----
     Every .ph[data-theme] has a themed gradient behind an <img.ph-img>.
     If the image loads → fade in. If it errors → keep the gradient. */
  $$(".ph-img").forEach(img => {
    const done = () => img.classList.add("loaded");
    if (img.complete && img.naturalWidth > 0) done();
    else {
      img.addEventListener("load", done);
      img.addEventListener("error", () => { img.style.display = "none"; });
    }
  });

  /* ---- Scroll reveal ---- */
  const reveals = $$(".reveal, .reveal-img");
  if (reveals.length) {
    if (reduce || !("IntersectionObserver" in window)) {
      reveals.forEach(el => el.classList.add("in"));
    } else {
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(en => {
          if (en.isIntersecting) { en.target.classList.add("in"); obs.unobserve(en.target); }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
      reveals.forEach(el => io.observe(el));
    }
  }

  /* ---- Active nav link by pathname ---- */
  const path = location.pathname.split("/").pop() || "index.html";
  $$(".nav-link, .mobile-menu-nav a").forEach(a => {
    const href = a.getAttribute("href");
    if (href === path) a.setAttribute("aria-current", "page");
  });

  /* ---- Seasonal / generic tabs ---- */
  $$("[data-tabs]").forEach(group => {
    const tabs = $$('[role="tab"]', group);
    const panels = $$('[role="tabpanel"]', group);
    const activate = (i) => {
      tabs.forEach((t, k) => t.setAttribute("aria-selected", String(k === i)));
      panels.forEach((p, k) => p.classList.toggle("is-active", k === i));
    };
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => activate(i));
      t.addEventListener("keydown", e => {
        if (e.key === "ArrowRight") { e.preventDefault(); tabs[(i + 1) % tabs.length].focus(); }
        if (e.key === "ArrowLeft")  { e.preventDefault(); tabs[(i - 1 + tabs.length) % tabs.length].focus(); }
      });
    });
  });

  /* ---- Lightbox gallery ---- */
  const galleryItems = $$("[data-lightbox]");
  if (galleryItems.length) {
    const lb = document.createElement("div");
    lb.className = "lightbox";
    lb.innerHTML =
      '<button class="lightbox-close" aria-label="Schließen">✕</button>' +
      '<button class="lightbox-nav prev" aria-label="Zurück">‹</button>' +
      '<button class="lightbox-nav next" aria-label="Weiter">›</button>' +
      '<div><img alt=""><p class="lightbox-cap"></p></div>';
    document.body.appendChild(lb);
    const lbImg = $("img", lb), lbCap = $(".lightbox-cap", lb);
    let idx = 0;
    const srcs = galleryItems.map(el => ({
      src: el.getAttribute("data-full") || el.getAttribute("data-src") || (el.querySelector("img") && el.querySelector("img").src),
      cap: el.getAttribute("data-cap") || ""
    }));
    const show = i => {
      idx = (i + srcs.length) % srcs.length;
      lbImg.src = srcs[idx].src; lbCap.textContent = srcs[idx].cap;
    };
    const open = i => { show(i); lb.classList.add("open"); document.body.style.overflow = "hidden"; };
    const close = () => { lb.classList.remove("open"); document.body.style.overflow = ""; };
    galleryItems.forEach((el, i) => el.addEventListener("click", () => open(i)));
    $(".lightbox-close", lb).addEventListener("click", close);
    $(".prev", lb).addEventListener("click", () => show(idx - 1));
    $(".next", lb).addEventListener("click", () => show(idx + 1));
    lb.addEventListener("click", e => { if (e.target === lb) close(); });
    document.addEventListener("keydown", e => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") show(idx + 1);
      if (e.key === "ArrowLeft") show(idx - 1);
    });
  }

  /* ---- Newsletter forms (front-end demo) ---- */
  $$("[data-newsletter]").forEach(form => {
    const msg = $(".nl-msg", form);
    form.addEventListener("submit", e => {
      e.preventDefault();
      const input = $('input[type="email"]', form);
      const val = (input && input.value || "").trim();
      const ok = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val);
      if (!msg) return;
      msg.className = "nl-msg show " + (ok ? "ok" : "err");
      msg.textContent = ok
        ? "Servus & danke! Bitte bestätigen Sie Ihre Anmeldung in Ihrem Postfach."
        : "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
      if (ok && input) input.value = "";
    });
  });

  /* ---- Contact form (front-end demo) ---- */
  $$("[data-contactform]").forEach(form => {
    const msg = $(".form-msg", form);
    form.addEventListener("submit", e => {
      e.preventDefault();
      let valid = true;
      $$("[required]", form).forEach(f => {
        const field = f.closest(".field");
        const bad = !f.value.trim() || (f.type === "email" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.value));
        if (field) field.classList.toggle("invalid", bad);
        if (bad) valid = false;
      });
      if (!valid) return;
      if (msg) { msg.className = "form-msg show ok"; msg.textContent = "Vielen Dank für Ihre Nachricht — wir melden uns ehestmöglich bei Ihnen. Alles Liebe, die Redaktion."; }
      form.reset();
    });
  });

  /* ---- Leaflet maps (data-driven) ---- */
  function initMaps() {
    if (typeof L === "undefined") return;
    $$("[data-map]").forEach(el => {
      let cfg;
      try { cfg = JSON.parse(el.getAttribute("data-map")); } catch (_) { return; }
      const map = L.map(el, { scrollWheelZoom: false, zoomControl: true, attributionControl: true })
        .setView(cfg.center || [47.5162, 14.5501], cfg.zoom || 7);
      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        attribution: '© OpenStreetMap · © CARTO',
        maxZoom: 19
      }).addTo(map);
      const brass = "#B08A4F", pine = "#375040", glow = "#D98C74";
      const colorFor = t => (t === "highlight" ? glow : t === "hotel" ? pine : brass);
      (cfg.points || []).forEach(p => {
        const m = L.circleMarker([p.lat, p.lng], {
          radius: 9, color: "#fff", weight: 2, fillColor: colorFor(p.type), fillOpacity: 1
        }).addTo(map);
        const html = '<div class="map-pop">' +
          (p.kicker ? '<div class="map-pop-kick">' + p.kicker + "</div>" : "") +
          '<div class="map-pop-title">' + (p.title || "") + "</div>" +
          (p.text ? "<p>" + p.text + "</p>" : "") + "</div>";
        m.bindPopup(html);
        if (p.open) m.openPopup();
      });
      map.on("focus", () => map.scrollWheelZoom.enable());
      map.on("blur", () => map.scrollWheelZoom.disable());
    });
  }
  if (document.querySelector("[data-map]")) {
    if (typeof L !== "undefined") initMaps();
    else window.addEventListener("load", initMaps);
  }

  /* ---- Subtle hero parallax ---- */
  if (!reduce) {
    const heroImg = $(".hero-media .ph-img, .hero-media img");
    if (heroImg) {
      window.addEventListener("scroll", () => {
        const y = window.scrollY;
        if (y < window.innerHeight) heroImg.style.transform = "translate3d(0," + (y * 0.18) + "px,0) scale(1.05)";
      }, { passive: true });
    }
  }
})();
