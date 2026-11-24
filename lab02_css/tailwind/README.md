# CH3 · Tailwind CSS: last year's CSS examples, rewritten with Tailwind

Open each file in the browser (double-click it, or use VS Code Live Server). The pages use the Tailwind **Play CDN**, so you need internet.
Compare each file with the CSS version in the folder above (`../`).

| File | What it shows | Compare with |
|------|---------------|--------------|
| `01_cdn.html` | Way 1: Play CDN, how to read a class (`text-3xl`, `mt-4`, `p-8`) | |
| `02_layout.html` | header, sidebar, main, fixed footer: `<style>` → classes, `float` → `flex` | `../index1.html` |
| `03_menu.html` | Sidebar menu with `hover:` | `../index3.html` + `main.css` + `main2.css` |
| `04_sticky_notes.html` | Sticky notes, shadow, responsive text (`sm:` `md:`) | `../sticky.html` + `css/sticky.css` |
| `05_navbar.html` | **Top navbar**: `flex justify-between items-center` | `../navbar.html` |
| `06_fixed_footer.html` | **Fixed footer**: `fixed bottom-0 w-full` + `pb-20` | `../index1.html` footer |
| `07_hamburger_css.html` | **Hamburger menu without JavaScript** (checkbox + `peer-checked:`) | `../navbar.html` checkbox trick |
| `08_hamburger_js.html` | **Hamburger menu with 3 lines of JavaScript** | |
| `09_full_page.html` | Everything together: navbar + hamburger + sidebar + fixed footer | `../index6.html` (Bootstrap) |
| `cli/` | Way 2: Tailwind CLI (works offline) | |

## How many ways can you install Tailwind?

| Way | How | When to use it |
|-----|-----|----------------|
| 1. Play CDN | One `<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>` in `<head>` | Labs, learning, quick tests (not for real websites) |
| 2. Tailwind CLI | `npm install tailwindcss @tailwindcss/cli`, then build a CSS file | Plain HTML or Node.js/Express + EJS projects (**our course project**) |
| 3. Vite plugin | `npm install tailwindcss @tailwindcss/vite` | Front-end projects that use Vite |
| 4. PostCSS plugin | `npm install tailwindcss @tailwindcss/postcss` | Projects that already use PostCSS (e.g. Next.js) |

### Try way 2 (the CLI)

```bash
cd lab02_css/tailwind/cli
npm install
npm run dev        # watches your HTML and writes output.css
```
Then open `cli/index.html`. Every class you add to the HTML appears in `output.css` automatically.

## Exercise

1. In `05_navbar.html`, add `sticky top-0` to the `<nav>` and add more text so the page scrolls.
2. In `06_fixed_footer.html`, remove `pb-20`. What happens to the last line?
3. In `07_hamburger_css.html`, change `md:` to `lg:`. When does the ☰ appear now?
4. Rebuild `../index5.html` with Tailwind classes only (no `main.css`, no `sticky.css`).
