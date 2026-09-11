# ALPENGLÜHEN — Build Contract for interior pages

You are building ONE `.html` page for a premium Austrian travel magazine. It MUST look and feel identical in system to `index.html`. **Read `index.html` and `assets/css/main.css` first.** Copy the shared blocks below VERBATIM. Do not invent new CSS classes — only use classes that already exist in `main.css` (listed at the end). Do not add `<style>` blocks except tiny inline `style="..."` tweaks matching the home page's usage.

## Golden rules
1. `<html lang="de-AT">`. **All visible text in authentic Austrian German** (see vocab). Never Germany-German where an Austrian word exists.
2. Same `<head>` boilerplate: Google Fonts (Cormorant Garamond + Inter), Leaflet CSS, `assets/css/main.css`. Per-page `<title>`, `<meta name="description">`, canonical, OG tags, and a JSON-LD block appropriate to the page.
3. Header + mobile menu + footer = copy the blocks below EXACTLY (JS auto-highlights the active nav link — do not hand-set `aria-current`).
4. End of `<body>`: Leaflet JS then `assets/js/main.js` (in that order). Only include Leaflet `<script>`/CSS if the page has a `[data-map]`.
5. Every photo uses the `.ph` gradient-fallback pattern (below). Never a bare `<img>` for a big visual.
6. Add `reveal` (and `d1`..`d5` stagger) to major blocks for scroll animation; `reveal-img` on feature/hero media wrappers.
7. Responsive + accessible: alt text on images, `aria-label` on icon-only controls, semantic landmarks (`<main id="main">`, `<section>`, `<article>`).
8. Interior pages open with a `.page-hero` (shorter cinematic hero + breadcrumb), NOT the full `.hero`.

## Photo pattern (gradient fallback + lazy fade)
```html
<div class="ph zoom ratio-wide" data-theme="lake">
  <img class="ph-img" src="https://images.unsplash.com/photo-XXXX?auto=format&fit=crop&w=1100&q=80" alt="Beschreibung auf Deutsch">
</div>
```
- `data-theme` = one of: `alpenglow` `pine` `lake` `snow` `city` `meadow` `dusk`. Pick the one matching the mood — the gradient shows if the photo fails to load, so it must fit.
- Add `zoom` for hover-zoom on cards/gallery. Media wrappers can also carry `reveal-img`.
- Unsplash URL: `https://images.unsplash.com/photo-<ID>?auto=format&fit=crop&w=<W>&q=80` (hero w=1920, feature w=1100, card w=900, gallery-thumb w=700, gallery-full w=1600).

### Unsplash photo-ID pool (reuse freely; fallback covers any that 404)
- **city/architecture:** 1516550893923-42d28e5677af · 1516684732162-798a0062be99 · 1467003909585-2f8a72700288 · 1445019980597-93fa8acb246c · 1560969184-10fe8719e047
- **mountain/alpenglow:** 1506905925346-21bda4d32df4 · 1464822759023-fed622ff2c3b · 1454496522488-7a8e488e8606 · 1519681393784-d120267933ba
- **lake:** 1476514525535-07fb3b4ae5f1 · 1439066615861-d1af74d74000 · 1501785888041-af3ef285b470
- **snow/ski:** 1551524559-8af4e6624178 · 1520250497591-112f2f40a3f4 · 1605540436563-5bca919ae766
- **forest/meadow/alm:** 1470071459604-3b5ec3a7fe05 · 1441974231531-c6227db76b6e · 1508739773434-c26b3d09e071 · 1425913397330-cf8af2ff40a1
- **food/kulinarik:** 1414235077428-338989a2e8c0 · 1467003909585-2f8a72700288 · 1555939594-58d7cb561ad9

## Austrian German — tone & vocabulary
Warm, elegant, editorial. Use "Sie". Weave Austrianisms naturally (not every sentence — premium, not kitsch). Greetings: **Servus, Grüß Gott, Griaß di, Pfiat di, Baba.**
- Months: **Jänner** (not Januar), **Feber** (not Februar).
- Food: **Marille** (Aprikose), **Erdäpfel** (Kartoffeln), **Paradeiser** (Tomaten), **Karfiol** (Blumenkohl), **Fisolen** (grüne Bohnen), **Kren** (Meerrettich), **Topfen** (Quark), **Obers** (Sahne), **Faschiertes** (Hackfleisch), **Jause** (Brotzeit/Snack), **Palatschinken**, **Kaiserschmarrn**, **Germknödel**, **Tafelspitz**, **Backhendl**, **Powidl**, **Kipferl**, **Melange**, **Buschenschank**, **Heuriger**, **Beisl** (Wirtshaus/Kneipe).
- Words: **heuer** (dieses Jahr), **gemütlich/Gemütlichkeit**, **leiwand** (super, wienerisch), **urig**, **fesch**, **Sackerl** (Tüte), **Stiege** (Treppe), **Häferl** (Tasse), **Bim** (Straßenbahn, Wien), **Schmäh** (Wiener Witz/Charme), **Tschick**-frei, **Achterl/Viertel** (Wein), **Glaserl**, **bisserl**, **ur** (sehr).
- Nature: **Alm**, **Almhütte**, **Almabtrieb**, **Almrausch**, **Jausenstation**, **Gipfelkreuz**, **Klamm**, **Ferner/Gletscher**, **Tracht, Dirndl, Lederhose**.
Avoid clichés like "Sound of Music" unless ironic. Prefer real places & specifics.

## SHARED BLOCK A — Header (paste verbatim, right after `<a class="skip-link">`)
```html
<header class="site-header" id="siteHeader">
  <div class="container container--wide header-inner">
    <a class="brand" href="index.html" aria-label="ALPENGLÜHEN — Startseite">
      <svg class="brand-mark" viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="22" cy="10" r="3.4" fill="#CBAA6E"/>
        <path d="M2 27 L12 11 L18 21 L21.5 15 L30 27 Z" fill="currentColor"/>
        <path d="M12 11 L15.6 17 L13.2 20 L10 14.6 Z" fill="#B08A4F"/>
      </svg>
      <span class="brand-text">
        <span class="brand-name">Alpenglühen</span>
        <span class="brand-sub">Das Österreich-Magazin</span>
      </span>
    </a>
    <nav class="nav" aria-label="Hauptnavigation">
      <a class="nav-link" href="wien.html">Wien</a>
      <a class="nav-link" href="salzburg.html">Salzburg</a>
      <a class="nav-link" href="tirol.html">Tirol</a>
      <a class="nav-link" href="seen.html">Seen</a>
      <a class="nav-link" href="wandern.html">Wandern</a>
      <a class="nav-link" href="skifahren.html">Skifahren</a>
      <a class="nav-link" href="kulinarik.html">Kulinarik</a>
      <a class="nav-link" href="magazin.html">Magazin</a>
    </nav>
    <div class="header-actions">
      <a class="header-cta" href="kontakt.html">Kontakt</a>
      <button class="menu-toggle" aria-label="Menü öffnen" aria-expanded="false" aria-controls="mobileMenu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>

<div class="mobile-menu" id="mobileMenu">
  <div class="mobile-menu-brand">Alpenglühen</div>
  <nav class="mobile-menu-nav" aria-label="Mobile Navigation">
    <a href="index.html"><span class="idx">01</span> Startseite</a>
    <a href="wien.html"><span class="idx">02</span> Wien</a>
    <a href="salzburg.html"><span class="idx">03</span> Salzburg</a>
    <a href="tirol.html"><span class="idx">04</span> Tirol</a>
    <a href="seen.html"><span class="idx">05</span> Seen</a>
    <a href="wandern.html"><span class="idx">06</span> Wandern</a>
    <a href="skifahren.html"><span class="idx">07</span> Skifahren</a>
    <a href="kulinarik.html"><span class="idx">08</span> Kulinarik</a>
    <a href="magazin.html"><span class="idx">09</span> Magazin</a>
    <a href="kontakt.html"><span class="idx">10</span> Kontakt</a>
  </nav>
  <div class="mobile-menu-foot">
    <span>Servus &amp; herzlich willkommen</span>
    <span>Wien · Salzburg · Tirol</span>
  </div>
</div>
```

## SHARED BLOCK B — Page hero (interior pages)
```html
<section class="page-hero" aria-label="Seitentitel">
  <div class="hero-media ph" data-theme="THEME">
    <img class="ph-img" src="https://images.unsplash.com/photo-ID?auto=format&fit=crop&w=1920&q=80" alt="…" fetchpriority="high">
  </div>
  <div class="hero-overlay"></div>
  <div class="container container--wide page-hero-content">
    <nav class="breadcrumb" aria-label="Brotkrümel">
      <a href="index.html">Startseite</a><span>/</span><span>SEITENNAME</span>
    </nav>
    <p class="eyebrow hero-kicker">KICKER</p>
    <h1>SEITEN-ÜBERSCHRIFT</h1>
    <p class="hero-sub">Ein bis zwei Sätze Einleitung.</p>
  </div>
</section>
```

## SHARED BLOCK C — Footer (paste verbatim before the closing scripts)
```html
<footer class="site-footer">
  <div class="container container--wide">
    <div class="footer-top">
      <div class="footer-brand">
        <a class="brand" href="index.html">
          <svg class="brand-mark" viewBox="0 0 32 32" aria-hidden="true">
            <circle cx="22" cy="10" r="3.4" fill="#CBAA6E"/>
            <path d="M2 27 L12 11 L18 21 L21.5 15 L30 27 Z" fill="currentColor"/>
            <path d="M12 11 L15.6 17 L13.2 20 L10 14.6 Z" fill="#B08A4F"/>
          </svg>
          <span class="brand-text"><span class="brand-name">Alpenglühen</span><span class="brand-sub">Das Österreich-Magazin</span></span>
        </a>
        <p class="footer-tagline">Reise, Genuss und Lebensart aus dem Herzen der Alpen. Servus &amp; pfiat di.</p>
        <div class="footer-social">
          <a href="#" aria-label="Instagram">Ig</a><a href="#" aria-label="Facebook">Fb</a><a href="#" aria-label="Pinterest">Pt</a><a href="#" aria-label="YouTube">Yt</a>
        </div>
      </div>
      <div class="footer-col"><h4>Regionen</h4><ul>
        <li><a href="wien.html">Wien</a></li><li><a href="salzburg.html">Salzburg</a></li><li><a href="tirol.html">Tirol</a></li><li><a href="seen.html">Die Seen</a></li>
      </ul></div>
      <div class="footer-col"><h4>Erleben</h4><ul>
        <li><a href="wandern.html">Wandern</a></li><li><a href="skifahren.html">Skifahren</a></li><li><a href="kulinarik.html">Kulinarik &amp; Kultur</a></li><li><a href="magazin.html">Magazin</a></li>
      </ul></div>
      <div class="footer-col"><h4>Service</h4><ul>
        <li><a href="kontakt.html">Kontakt</a></li><li><a href="kontakt.html">Newsletter</a></li><li><a href="kontakt.html">Mediadaten</a></li><li><a href="kontakt.html">Impressum</a></li>
      </ul></div>
    </div>
    <div class="footer-bottom">
      <span>© <span data-year>2026</span> Alpenglühen Verlag · Wien. Alle Rechte vorbehalten.</span>
      <div class="footer-bottom-links"><a href="kontakt.html">Datenschutz</a><a href="kontakt.html">Impressum</a><a href="kontakt.html">AGB</a></div>
    </div>
  </div>
</footer>
```

## SHARED BLOCK D — closing scripts (before `</body>`)
```html
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="assets/js/main.js"></script>
```
(Leaflet line only needed if page has a map; harmless to always include.)

## Component snippets (use the ones your page needs)

**Newsletter band** (put near the end of most pages):
```html
<section class="section section--dark newsletter newsletter--split">
  <div class="container container--wide newsletter-inner">
    <div class="reveal"><p class="eyebrow">Die Post vom Berg</p><h2>Unser Newsletter</h2>
      <p class="lead mt-1">Alle vierzehn Tage die schönsten Geschichten frisch ins Postfach.</p></div>
    <form class="nl-form reveal d1" data-newsletter novalidate>
      <div class="nl-row">
        <input class="nl-input" type="email" name="email" placeholder="Ihre E-Mail-Adresse" aria-label="E-Mail-Adresse" required>
        <button class="btn btn--primary" type="submit">Abonnieren <span class="arw">→</span></button>
      </div>
      <p class="nl-note">✓ Kein Spam. Nur guade Sachen. Jederzeit kündbar.</p>
      <div class="nl-msg" role="status" aria-live="polite"></div>
    </form>
  </div>
</section>
```

**Interactive map** (regions/contact):
```html
<div class="map-shell reveal">
  <div class="map" data-map='{"center":[LAT,LNG],"zoom":Z,"points":[
    {"lat":..,"lng":..,"title":"..","kicker":"..","type":"highlight","text":"..","open":true},
    {"lat":..,"lng":..,"title":"..","kicker":"..","text":".."}
  ]}'></div>
  <div class="map-legend"><h4>Legende</h4><ul>
    <li><span class="pin" style="background:#D98C74"></span> Titel-Destination</li>
    <li><span class="pin" style="background:#B08A4F"></span> Redaktions-Tipp</li>
  </ul></div>
</div>
```
`type` optional: `highlight` (rose), `hotel` (pine), default brass. Use real Austrian coordinates.

**Itinerary timeline** (Tag für Tag):
```html
<div class="timeline">
  <div class="timeline-item reveal">
    <div class="day-num"><span class="lbl">Tag</span><span class="n">1</span></div>
    <div class="timeline-body"><h3>Titel</h3><p>Beschreibung…</p>
      <div class="timeline-tags"><span class="chip">Tipp</span><span class="chip">2 h</span></div></div>
  </div>
</div>
```

**Seasonal tabs:** copy the `.tabs[data-tabs]` structure from `index.html` (roles: tablist/tab/tabpanel; first tab `aria-selected="true"`, first panel `.is-active`).

**Hotel card:** copy `.hotel` structure from `index.html` (media `.ph` + `.stars`, body with `.hotel-loc/.hotel-name/.hotel-desc/.hotel-foot/.hotel-price`).

**Event calendar:**
```html
<div class="events">
  <div class="event reveal">
    <div class="event-date"><span class="d">14</span><span class="m">Jän</span></div>
    <div class="event-info"><h4>Event-Titel</h4><p>Kurzbeschreibung</p></div>
    <div class="event-loc">Ort</div>
  </div>
</div>
```

**Gallery + lightbox:**
```html
<div class="gallery reveal">
  <div class="gallery-item big ph" data-theme="THEME" data-lightbox data-full="…w=1600…" data-cap="Bildtext">
    <img class="ph-img" src="…w=800…" alt="…"></div>
  <!-- item modifiers: big / wide / tall / (none). Fill ~5–8 items. -->
</div>
```

**Feature split** (asymmetric editorial): copy `.feature.feature--split` (or `.reverse`, `--split-wide`) from `index.html`.

**Stats band:** `.stats` with `.stat > .stat-num + .stat-label`.

## Section rhythm
Alternate backgrounds for depth: default (paper) → `.section--paper-2` → `.section--dark` → `.section--ink`. Don't put two identical backgrounds back-to-back. Dark sections auto-restyle text.

## Available CSS classes (do not invent others)
Layout: container(--wide/--narrow), section(--tight/--paper-2/--dark/--ink/--flush-top), section-head(--center), grid grid-2/3/4/12, stack, flow, divider.
Type: eyebrow(--center/--plain/--light), lead, prose(.dropcap), pull-quote(+cite), serif-accent, text-glow/text-brass, overline-num, split-title.
Buttons: btn(--primary/--ghost/--light/--outline-light), link-more, arw, badge(--brass/--pine/--glow/--outline), chip(--fill).
Hero: hero, hero--center/--mid, hero-media, hero-overlay(--center), hero-content, hero-kicker, hero-sub, hero-actions, hero-meta, scroll-cue, page-hero, page-hero-content, breadcrumb.
Media: ph(+data-theme, zoom), ph-img, figure(figcaption), reveal-img, card-media(ratio-wide/-square), feature-media(ratio-portrait/-wide), feature-tag.
Cards: card, card-media, card-body, card-kicker, card-title, card-excerpt, card-meta(.dot).
Modules: tabs(data-tabs)/tablist/tab/tab-panel(.is-active); timeline/timeline-item/day-num/timeline-body/timeline-tags; hotel/hotel-media/.stars/hotel-body/hotel-loc/hotel-name/hotel-desc/hotel-foot/hotel-price; gallery/gallery-item(big/wide/tall)[data-lightbox]; events/event/event-date/event-info/event-loc; map-shell/map[data-map]/map-legend(.pin); marquee/marquee-track; stats/stat/stat-num/stat-label; newsletter(--split)/nl-form[data-newsletter]/nl-row/nl-input/nl-note/nl-msg; field/form-msg (contact, form[data-contactform]).
Reveal: reveal (+d1..d5), reveal-img.
Utils: text-center, mt-1/2/3, mb-1/2, mx-auto, maxw-narrow/-mid, op-70, sr-only, skip-link.
