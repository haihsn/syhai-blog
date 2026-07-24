# syhai.xyz — Design System

**Source:** structural/technical patterns extracted from a ChainGPT Labs portfolio-page
reference (light theme, orange accent, rounded corners, CAD/blueprint styling).

**Approach:** adapt, don't reskin. syhai.xyz already has an established dark editorial
identity — near-black background, red accent, sharp (0px) corners, Space Grotesk +
IBM Plex Mono, hairline borders. This document takes the *structural DNA* from the
reference (grid-paper texture, bracket-corner cards, stat grids, pill filters + search,
status chips, arrow-affordance cards) and rebuilds it entirely in the existing palette,
type, and radius. Nothing here introduces orange, rounded corners, or a light-first
theme — those were deliberately left behind.

Live preview of every component below: [`design-system.html`](./design-system.html)
(open directly in a browser — self-contained, includes the live dark/light toggle).

---

## 1. What was kept vs. dropped from the reference

| Reference trait | Decision | Why |
|---|---|---|
| Grid-paper / blueprint background texture | **Kept** → `.grid-paper` | Reinforces the technical/research tone of the blog without adding color |
| Bracket / viewfinder corner marks on cards | **Kept** → `.frame` | Becomes the site's signature "CAD" motif in place of the reference's rounded card + shadow |
| Stat rows (label + big value) on cards | **Kept** → `.stat-grid` | Directly useful for post metadata (read time, word count, category, date) |
| Status + category pill chips | **Kept** → `.chip` | Extends the existing `.tag` system rather than replacing it |
| Filter pills + search box combo | **Kept** → `.filter-bar` | The blog already has filter pills (`blog/index.astro`); this just adds the missing search field |
| Arrow-in-circle "view more" affordance | **Kept** → `.card-arrow` | Small, quiet hover affordance, fits the existing minimal hover states |
| Bottom CTA strip (label + dual button) | **Kept** → `.cta-strip` | Reusable for "enjoyed this post" / newsletter / contact prompts |
| Rounded cards, drop shadows | **Dropped** | Conflicts with `--radius: 0` and the site's flat, hairline-border language |
| Orange accent | **Dropped** | Site's identity color is `--accent: #E2001A` (red) |
| Light-theme-first | **Dropped** | Site defaults to dark; light mode is a secondary toggle, not the base |
| Big rounded "APPLY NOW" pill button | **Dropped** | Replaced by the existing sharp-cornered `.btn` |

---

## 2. Tokens

All tokens already exist in [`src/styles/global.css`](../src/styles/global.css). This
system adds **no new colors** — only new component classes built from these variables.

### Color

| Token | Dark (default) | Light (`html.light`) | Use |
|---|---|---|---|
| `--bg` / `--paper` | `#0d0d0d` | `#f5f5f2` | Page background |
| `--ink` | `#eeeeee` | `#1a1a1a` | Primary text |
| `--ink2` | `#888888` | `#555555` | Secondary text |
| `--accent` | `#E2001A` | `#E2001A` | Links, hover states, active pills, status chips |
| `--rule` | `#2a2a2a` | `#d4d4d0` | Hairline borders, dividers |
| `--b100`…`--b700` | grayscale ramp | inverted ramp | Surfaces, borders, muted UI |
| `--highlight` | `#FDE8D8` | `#FDE8D8` | Text `<mark>` |

### Type

| Token | Font | Use |
|---|---|---|
| `--playfair` | Space Grotesk | Headings, display type, stencil headlines |
| `--source` | Space Grotesk | Body text |
| `--mono` | IBM Plex Mono | Labels, tags, stats, nav chrome, buttons |

### Structure

- `--radius: 0` — every surface is sharp-cornered. The reference's rounded cards become
  **bracket-cornered** instead (see `.frame` below) — the closest equivalent that still
  reads as "framed" without violating the flat-corner rule.
- Borders are `0.5px` hairlines (`var(--rule)`) almost everywhere; `1.5px` solid only on
  interactive controls (`.btn`).
- Spacing follows the existing `.container` (760px) / `.container--wide` (1100px) rhythm.

---

## 3. New components

Each component is additive CSS — copy the relevant block into `global.css` (or a new
`design-system.css` partial) when ready to use. Class names are chosen to avoid any
collision with existing classes in `global.css`.

### 3.1 `.grid-paper` — blueprint background texture

A faint dot/line grid for hero or section backgrounds. Replaces the reference's literal
grid-paper canvas.

```html
<section class="grid-paper">
  ...
</section>
```

```css
.grid-paper {
  background-image:
    linear-gradient(var(--rule) 0.5px, transparent 0.5px),
    linear-gradient(90deg, var(--rule) 0.5px, transparent 0.5px);
  background-size: 28px 28px;
  background-position: -0.5px -0.5px;
  opacity: 1; /* grid lines already low-contrast via --rule */
}
```

Use sparingly — one hero or divider section per page, not the whole page (the reference
uses it everywhere because it's a component-library demo page, not a real product page).

### 3.2 `.frame` — bracket-corner card

The site's answer to the reference's rounded-corner-plus-shadow card. Four small
L-shaped tick marks sit just outside a hairline border, evoking a CAD/viewfinder frame
instead of a soft shadowed panel.

```html
<div class="frame">
  <p>Framed content…</p>
</div>
```

```css
.frame {
  position: relative;
  border: 0.5px solid var(--rule);
  padding: 1.5rem;
}
.frame::before, .frame::after,
.frame > .frame-tick { /* see design-system.html for the full 4-corner implementation */ }
```

Modifier: `.frame--accent` — ticks render in `var(--accent)` instead of `var(--ink2)`,
for a single "featured" frame per page (mirrors the reference's one highlighted
incubation card).

### 3.3 `.headline-block` — stencil display headline

A big, tight, uppercase Space Grotesk headline with an underscore joiner, standing in
for the reference's blocky "PORT_FOLIO" wordmark.

```html
<h1 class="headline-block">BLOG<span class="headline-block__joiner">_</span>INDEX</h1>
```

```css
.headline-block {
  font-family: var(--playfair);
  font-weight: 800;
  text-transform: uppercase;
  font-size: clamp(2.5rem, 8vw, 5.5rem);
  letter-spacing: -0.02em;
  line-height: 0.95;
}
.headline-block__joiner { color: var(--accent); }
```

Use for section-opening headers only (blog index, about page) — not body headings,
which stay on the existing `h1`–`h4` rules.

### 3.4 `.chip` — status / category pill

Extends the existing `.tag` system with a filled pill variant for a two-chip row (status
+ category), like the reference's "New" + "Incubated" pair.

```html
<div class="chip-row">
  <span class="chip chip--status">Featured</span>
  <span class="chip chip--outline">AI Tutorial</span>
</div>
```

```css
.chip {
  font-family: var(--mono);
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 600;
  padding: 3px 9px;
  border: 0.5px solid var(--rule);
}
.chip--status  { background: var(--accent); color: #fff; border-color: var(--accent); }
.chip--outline { color: var(--ink2); }
.chip-row { display: flex; gap: 6px; }
```

### 3.5 `.stat-grid` — label/value stat pairs

Direct translation of the reference's card stat rows (Funds Raised / ATH ROI / Social
Growth / Partnerships) into post metadata (read time / words / category / date).

```html
<div class="stat-grid">
  <div class="stat-item"><span class="stat-item__value">8 min</span><span class="stat-item__label">Read time</span></div>
  <div class="stat-item"><span class="stat-item__value">1.2k</span><span class="stat-item__label">Words</span></div>
</div>
```

```css
.stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem 1.5rem; }
.stat-item__value { display: block; font-family: var(--mono); font-weight: 600; font-size: 1.1rem; color: var(--ink); }
.stat-item__label { display: block; font-family: var(--mono); font-size: 0.6rem; color: var(--b400); text-transform: uppercase; letter-spacing: 0.08em; }
```

### 3.6 `.counter-block` — big bracket-framed number

For a small "07 posts this year"-style callout (reference: "Projects 07").

```html
<div class="counter-block frame">
  <span class="counter-block__value">07</span>
  <span class="counter-block__label">Posts</span>
</div>
```

### 3.7 `.filter-bar` — filter pills + search

Adds a search input alongside the category pills already used in `blog/index.astro`
(`.filter-btn`). No changes to the existing pill markup — this only adds the search
field and a flex wrapper.

```html
<div class="filter-bar">
  <div class="filter-row"> <!-- existing .filter-btn buttons --> </div>
  <input class="search-input" type="search" placeholder="Search posts…" />
</div>
```

```css
.filter-bar { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
.search-input {
  font-family: var(--mono);
  font-size: 0.7rem;
  background: transparent;
  border: 0.5px solid var(--rule);
  color: var(--ink);
  padding: 8px 12px;
  min-width: 200px;
}
.search-input::placeholder { color: var(--b400); }
```

### 3.8 `.post-card` + `.card-arrow` — grid card (alternative to the current row list)

A card-grid alternative to the current `.post-row` list, for a future portfolio-style
blog index. Combines `.frame`, `.chip-row`, and `.stat-grid`, plus a small arrow
affordance bottom-right that fills with the accent on hover.

```html
<a href="/blog/my-post" class="post-card frame">
  <div class="chip-row"><span class="chip chip--outline">AI Tutorial</span></div>
  <h3 class="post-card__title">Building a Trading Agent with Claude</h3>
  <div class="stat-grid">
    <div class="stat-item"><span class="stat-item__value">8 min</span><span class="stat-item__label">Read</span></div>
    <div class="stat-item"><span class="stat-item__value">Jul 24</span><span class="stat-item__label">Published</span></div>
  </div>
  <span class="card-arrow">→</span>
</a>
```

```css
.post-card { display: block; color: inherit; transition: border-color 0.15s; }
.post-card:hover { border-color: var(--ink2); }
.card-arrow {
  position: absolute; right: 1rem; bottom: 1rem;
  width: 28px; height: 28px;
  display: flex; align-items: center; justify-content: center;
  border: 0.5px solid var(--rule);
  font-family: var(--mono); font-size: 0.85rem;
  transition: background 0.15s, color 0.15s;
}
.post-card:hover .card-arrow { background: var(--accent); color: #fff; border-color: var(--accent); }
```

This is **optional** — the existing `.post-row` list view remains the default for the
blog index. `.post-card` is offered as a grid-view alternative (e.g. for a future
"Featured" section on the homepage).

### 3.9 `.cta-strip` — bottom call-to-action bar

Reusable end-of-page prompt (reference: "Ready to discuss your project?" + two buttons).
On the blog this fits a newsletter or contact prompt at the end of a post.

```html
<div class="cta-strip">
  <span class="section-label">▸ Enjoyed this post?</span>
  <div class="cta-strip__actions">
    <a href="/rss.xml" class="btn">Subscribe via RSS</a>
    <a href="https://x.com/syngochai" class="btn btn--solid">Follow on X</a>
  </div>
</div>
```

```css
.cta-strip { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; padding: 1.5rem 0; border-top: 0.5px solid var(--rule); }
.cta-strip__actions { display: flex; gap: 0.75rem; }
.btn--solid { background: var(--ink); color: var(--bg); }
.btn--solid:hover { opacity: 0.85; }
```

`.btn--solid` is the one new button modifier — a filled counterpart to the existing
outline `.btn`, used sparingly for the single primary action in a CTA pair (mirrors the
reference's solid-vs-outline "Apply for incubation" / "Apply for funding" pair).

---

## 4. Usage guidelines

- **One accent moment per view.** The reference uses orange everywhere (active pills,
  chips, buttons, hover). On syhai.xyz, `--accent` red should stay reserved for hover
  states and exactly one "featured" element per page (`.frame--accent`, one `.chip--status`)
  — not every pill.
- **Bracket ticks are the site's signature, use them like punctuation.** Don't wrap
  every box in `.frame` — reserve it for cards, pull quotes, and callouts that deserve
  emphasis, the same way the current site uses `.rule-thick` sparingly.
- **`.grid-paper` is texture, not wallpaper.** One section per page, low-traffic areas
  (hero, footer band) — never behind body copy.
- **Stats need real numbers.** Don't invent metrics for blog posts the way the reference
  invents "800% Social Growth" — read time and word count are the honest equivalents;
  don't add vanity stats.
- **Mobile:** `.stat-grid` collapses to a single column under 480px; `.filter-bar` stacks
  pills above the search input under 600px, matching the existing `.filter-row` mobile
  behavior.

---

## 5. Where this plugs into the existing codebase

| Component | Would touch |
|---|---|
| `.grid-paper`, `.frame`, `.headline-block`, `.chip*`, `.stat-grid`, `.counter-block`, `.filter-bar`, `.post-card`, `.card-arrow`, `.cta-strip`, `.btn--solid` | Add to `src/styles/global.css` (or a new imported partial) |
| `.headline-block` on blog index | `src/pages/blog/index.astro` — replace plain `<h1>All Posts</h1>` |
| `.filter-bar` search input | `src/pages/blog/index.astro` — extend existing `.filter-row` |
| `.post-card` grid | Optional alternative view in `src/pages/blog/index.astro` or a "Featured" section in `src/pages/index.astro` |
| `.cta-strip` | `src/layouts/PostLayout.astro` — end of article |
| `.counter-block` | `src/pages/about.astro` — e.g. posts-written count |

No component here requires new dependencies, new fonts, or new colors — everything
resolves against the CSS variables already defined in `global.css`.
