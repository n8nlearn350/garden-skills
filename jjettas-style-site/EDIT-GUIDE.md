# MH8 — JJetas-style athlete site · Edit Guide

A dark, cinematic personal-brand site in the spirit of jjettas.com.
Single file: `index.html` + photos in `assets/`.

## 1. Rename the whole site (1 minute)

Open `index.html`, scroll to the bottom `<script>`, edit `SITE_CONFIG`:

```js
heroTitle: 'YOUR<br><span class="stroke">NAME</span>',
tagline: 'From <strong>Hometown to Big Stage.</strong> ...',
bigNum: '8',   // your number — also update logo + cardNum
...
```

Every headline, chip, quote and footer updates automatically.

## 2. Swap photos — pick your way

**Way A · In the browser (easiest, no code):**
1. Open the site, click **✎ Edit photos** (bottom-right).
2. Click any photo → pick a new image from your device.
3. It swaps instantly and **auto-saves in that browser** (localStorage).
4. **Reset** restores the originals.

**Way B · Replace files (permanent, for publishing):**
Replace any file in `assets/` keeping the **same filename**:

| File | Used for | Best shape |
|---|---|---|
| `hero-portrait.jpg` | Giant hero + rookie card | Vertical portrait |
| `moment-run.jpg` | Moment 01 + gallery | Vertical action |
| `moment-record.jpg` | Moment 02 + gallery | Vertical portrait |
| `moment-catch.jpg` | Moment 03 + 05 | Vertical action |
| `moment-dance.jpg` | Moment 04 + gallery | Vertical celebration |
| `camp-kids.jpg` | Foundation photo 1 | Landscape, daylight |
| `backpack-drive.jpg` | Foundation photo 2 | Landscape, daylight |
| `cleats-feature.jpg` | Signature partner card | Landscape close-up |
| `moment-probowl.jpg` | Moment 05 (All-Star) | Vertical portrait |
| `style-tunnel.jpg` | Gallery (tunnel fits) | Vertical fashion |
| `style-gala.jpg` | Gallery (red carpet) | Vertical fashion |

> Tip: after Way A edits you love, download those images and save them
> over the `assets/` files (Way B) so they ship with the site everywhere.

## 3. Edit moments / sponsors / stats

They're plain HTML — search in `index.html` for:
- `The Debut`, `The Catch` … → moment titles, stat lines, descriptions
- `Apex Athletics`, `VOLT`, `GRIDLINE` … → partner names + blurbs
- `1,400`, `88`, `7` … → rookie-card stats

## 4. Colors

All tokens live in `:root` at the top of the `<style>` block:

```css
--bg:#0a0a10; --purple:#7c3aed; --violet:#a78bfa; --gold:#d9a441;
```

Change once, updates everywhere.

## 5. Publish

It's a static site — drag the folder to Netlify / Vercel / GitHub Pages,
or just open `index.html` in any browser. No build step, no dependencies
except Google Fonts (gracefully degrades offline).

## 6. Pages (multi-page site)

| File | Route | Purpose |
|---|---|---|
| `index.html` | `/` | Home — hero, moments, stats, cards, partners teaser |
| `foundation.html` | `/foundation.html` | Full foundation page + get-involved |
| `partnerships.html` | `/partnerships.html` | All partners + inquiry form |
| `privacy.html` / `terms.html` | | Legal pages |
| `404.html` | | Not-found page |
| `assets/css/style.css` | | Shared design system — edit once, applies everywhere |
| `assets/js/app.js` | | Shared behavior + `SITE_CONFIG` identity strings |

New photos: `foundation-volunteers.jpg` (foundation hero), `partner-studio.jpg` (partnerships banner).

Design guidance: UX rules (active nav state, sticky-nav offset, chapter CTAs)
applied per **UI/UX Pro Max** (`ux-guidelines` + design-system generator).
