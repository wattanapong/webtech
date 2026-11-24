# CH3 · CSS & TailwindCSS (Week 3)

Slides: **CH3 - CSS and TailwindCSS** (from the lecturer; not in this repo)

> The course project uses **TailwindCSS only**. Bootstrap is covered on one comparison page here; the old Bootstrap labs are in `archive/lab02_css`.

## `css/`: plain CSS (Part 1)

| File | Slide topic |
|------|-------------|
| `01_selectors.html` | Selector cheat sheet, `:has()` `:is()` `:where()`, native nesting |
| `02_cascade_specificity.html` | Cascade, specificity (id, class, type), inheritance ("Who wins?") |
| `03_box_model.html` | Box model, `box-sizing: border-box`, `margin: 0 auto` |
| `04_grid_layout.html` | Page layout with CSS Grid (replaces float / fixed) |
| `05_flexbox.html` | Flexbox navbar and centring |
| `06_responsive.html` | Mobile-first `@media`, `clamp()`, `min()`, `auto-fit`, `@container` |
| `07_variables.html` | CSS custom properties + `prefers-color-scheme` |

## `tailwind/`: TailwindCSS v4 (Part 2)

| File | Slide topic |
|------|-------------|
| `01_bootstrap_vs_tailwind.html` | Bootstrap vs Tailwind cheat sheet |
| `02_play_cdn_theme.html` | Setup A · Play CDN, `@theme`, reading utility classes |
| `03_flex_grid_cards.html` | Flex & grid utilities, colours & typography |
| `04_responsive_hero.html` | Responsive prefixes, `hidden md:flex` |
| `05_states.html` | hover / focus-visible / active / disabled / user-invalid / group |
| `06_dark_mode.html` | `dark:` with `@custom-variant` |
| `07_components_apply.html` | Reusable `.btn` with `@layer components` + `@apply` |

## `mockup-tailwind/`: Lab 3 model answer

These are the CH2 CampusFix pages restyled with Tailwind: a responsive navbar, card grid, form focus/invalid states, dark variants and `<dialog>`. Check them in DevTools device mode at 375px and at 1280px.

## `tailwind-cli/`: Setup C (used from CH5 onward with Express + EJS)

```bash
cd ch03-css-tailwind/tailwind-cli
npm install
npm run css          # builds public/css/style.css and watches for changes
```
Then open `public/index.html`. The Play CDN needs internet; the CLI output works offline and is what your project should use.

## Lab 3 checklist

- [ ] No horizontal scrolling at 375px (DevTools → iPhone SE)
- [ ] Navbar wraps or collapses on a phone
- [ ] Cards: 1 column on a phone → 2–3 columns on a desktop
- [ ] Visible hover and focus styles (move through the page with Tab)
- [ ] Brand colours come from `@theme`, with no inline `style=""`
- [ ] Images have `alt`, inputs have `<label>`; Lighthouse Accessibility ≥ 90
