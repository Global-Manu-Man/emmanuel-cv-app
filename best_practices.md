# 📘 Project Best Practices

## 1. Project Purpose
Personal portfolio/CV website for Emmanuel Sandoval. It is a static, client-side site showcasing professional profile, skills, work and education timeline, services, portfolio items, testimonials, and contact information. The site supports dark mode and basic internationalization (English/Spanish/French) via client-side JavaScript.

## 2. Project Structure
- index.html: Single-page entry point wiring layout, metadata, CSS, and JS.
- assets/css/
  - styles.css: Core styles, variables, responsive layout, components, and sections.
  - swiper-bundle.min.css: Swiper carousel styles (vendor).
  - combo.css, line.css: Additional styles (optional/legacy).
- assets/js/
  - main.js: Interactive behavior (menu, accordions, modals, carousels, theme toggle, scroll effects, testimonial sizing, basic form handler).
  - idiomas.js: i18n loader that injects per-language translation files and replaces text by element id.
  - en.js, es.js, fr.js: Language dictionaries written as global objects.
  - swiper-bundle.min.js: Swiper carousel (vendor).
- assets/img/: Images and favicons.
- assets/pdf/: Resume file(s).
- README.md: Basic setup instructions (serving via XAMPP / Apache).

Conventions
- CSS classes follow a BEM-like convention: block__element with modifiers like skills_open/skills_close.
- Sections are structured as semantic sections with ids used for navigation and active-link highlighting.
- External libraries are loaded from local assets (Swiper) and CDNs (Unicons, Google Fonts).

## 3. Test Strategy
Current state: No automated tests.

Recommended lightweight strategy for a static site:
- Manual smoke tests per section after changes:
  - Navigation open/close; active link highlighting on scroll.
  - Accordion behavior (skills), services modals open/close.
  - Swiper carousels work for portfolio and testimonials at breakpoints.
  - Theme toggle persists across reloads (localStorage).
  - i18n switching updates all mapped ids (see i18n notes).
  - Contact form (if action defined) gracefully handles success/failure.
- Cross-browser checks: Latest Chrome, Firefox, Safari; test mobile Safari/Chrome.
- Accessibility checks: Keyboard navigation, focus rings, aria labels for interactive controls.
- Performance checks: Run Lighthouse; target performance ≥ 90 on desktop, ≥ 80 on mobile. Optimize images where needed.
- HTML/CSS validation: Use W3C validators occasionally to catch structural errors.

Optional automation (future):
- Add a simple Playwright/Cypress smoke test to verify key interactions (menu toggle, modal, carousel init) when/if a Node toolchain is introduced.

## 4. Code Style
HTML
- Use unique ids. Avoid duplicate id attributes across elements. Keep ids stable when used by JS (nav-menu, nav-toggle, etc.).
- Keep external includes deduplicated. Include each stylesheet/script only once and place vendor scripts before app scripts.
- Provide descriptive alt text for images; avoid empty alt attributes unless purely decorative.
- Maintain semantic structure: header, nav, main, section, footer; ensure heading levels are consistent (h1 → h2 → h3).

CSS
- Variables: Define theme colors and typography in :root; override in body.dark-theme only the required tokens.
- Naming: Continue BEM-like naming block__element with modifier classes (e.g., skills_open/skills_close). Avoid typos and unused classes.
- Responsiveness: Consolidate media queries; avoid duplication across breakpoints. Prefer mobile-first rules with min-width queries.
- Reuse and DRY: Factor repeated button styles into a single .button block; avoid redefining identical rules across multiple breakpoints.
- Vendor overrides: Scope Swiper customizations narrowly to avoid bleeding into other components.
- Performance: Prefer transform/opacity for animations; avoid heavy box-shadows on large elements.

JavaScript
- Scope and strictness: Wrap features in IIFEs or modules; use 'use strict'. Always declare variables with const/let (avoid implicit globals like sectionId).
- Null safety: Guard DOM queries before using classList/addEventListener; avoid document.querySelector(...).classList when the element may be absent.
- Event performance: Throttle/debounce scroll/resize handlers. Avoid location.reload() on resize; re-measure dynamically instead.
- State: Persist only user-facing settings (theme) in localStorage. Avoid storing transient UI state there.
- Logging: Remove console.log in production.
- Dependencies: Initialize Swiper after DOM is ready and after styles are loaded. Keep one Swiper instance per container and ensure selectors match HTML.
- Error handling: Catch/handle fetch errors in form submission; show user feedback on success/failure.

Internationalization (i18n)
- Source of truth: The idiomas.js loader updates textContent by element id using a translations map. Keep ids in HTML aligned with keys.
- Globals: Avoid redefining global var traducciones across files. Prefer a single namespace (window.I18N = {...}) or data-i18n attributes with a single loader.
- Loading: Load the desired language once; avoid injecting the same language file multiple times. Ensure the language selector exists before calling mostrarComboIdioma().
- Coverage: When adding text nodes, add corresponding keys in all language files. Avoid duplicate keys and inconsistencies (e.g., typos id_web_eignt vs id_web_eight).

## 5. Common Patterns
- BEM-like CSS structure: nav__, home__, skills__, portfolio__, testimonial__, project__, contact__, footer__.
- Accordion pattern: Toggle skills__content between skills_open and skills_close.
- Modal pattern: Add/remove active-modal on services__modal to show/hide.
- Carousels: Swiper instances configured for portfolio and testimonials with navigation and pagination.
- Theme toggle: Toggle body.dark-theme and icon class; persist via localStorage.
- Section active link: On scroll, compute section bounds and toggle .active-link on nav anchors.

## 6. Do's and Don'ts
✅ Do
- Keep ids unique and stable; use data- attributes if multiple elements need the same semantic tag.
- Deduplicate includes: load Swiper CSS/JS only once; keep vendor before app code.
- Validate DOM nodes before using them; short-circuit if a feature is not present on a page.
- Use const/let, strict mode, and small pure functions; keep handlers small and readable.
- Throttle scroll/resize handlers; remove expensive logs.
- Compress and properly size images; prefer modern formats (WebP/AVIF) with fallbacks.
- Add aria-labels/title attributes to icon-only buttons (menu, translate, theme).
- Keep translation keys consistent across en.js, es.js, fr.js; lint them for duplicates/missing keys.
- Keep CSS DRY and mobile-first; consolidate repeated button rules.

❌ Don’t
- Don’t reuse the same id on multiple elements (e.g., header on both header and nav).
- Don’t create implicit globals (e.g., assigning to sectionId without let/const).
- Don’t reload the page on resize to compute heights; re-measure and adjust dynamically.
- Don’t leave debug console.log statements in production.
- Don’t depend on elements that are commented out (e.g., language <select>) without null checks.
- Don’t include the same vendor CSS/JS twice.

## 7. Tools & Dependencies
Key libraries
- Swiper: Carousels for portfolio and testimonials (assets/js/css swiper-bundle). Configure with navigation, pagination, and breakpoints.
- Unicons (CDN): Icon set used for UI controls.
- Google Fonts (CDN): Poppins font family.

Project setup and serving
- Static site; can be served by any static server. README currently documents XAMPP/Apache, but for local dev any option works:
  - Python: python -m http.server 8000
  - Node: npx serve .
  - VS Code: Live Server extension

Performance/asset notes
- Minimize duplicate includes. Bundle/minify app CSS/JS if a Node toolchain is adopted.
- Optimize images; consider <img loading="lazy"> on below-the-fold assets.
- Use rel="preconnect" and rel="dns-prefetch" for critical CDNs (already present for Google Fonts).

## 8. Other Notes
- Known cleanups to consider:
  - Remove duplicated Swiper CSS/JS includes in index.html.
  - Fix duplicate id="header" (header and nav). Use a unique id for nav or rely on class.
  - Guard document.querySelector usages in main.js; declare sectionId with let/const; remove debug logs.
  - Replace location.reload() on resize with a debounced re-measure of testimonial card heights.
  - Ensure the language selector element exists (id="idioma") before calling mostrarComboIdioma() or add a non-DOM-based toggle.
  - Fix typos and inconsistent keys: e.g., id_web_eignt vs id_web_eight; duplicate keys in fr.js; repeated id_testimonial_name_4, id_testimonial_client_4 in HTML; class "contaider" typo.
  - Remove unused Google Translate function unless the library is integrated.
- Accessibility: Provide aria-expanded for accordions, aria-controls for buttons, and role="dialog" with aria-modal="true" for modals. Ensure focus is trapped inside open modal and returned to trigger on close.
- Security/hosting: When deploying with external CDNs, consider a Content Security Policy (CSP) that allows required domains. Prefer SRI for CDN assets where possible.
- LLM guidance: When generating code, follow existing naming patterns, prefer id-based hooks for translations, and ensure any new interactive feature is null-safe and responsive. Keep all text content wired into the i18n system.
