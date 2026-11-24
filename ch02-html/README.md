# CH2 · HTML (Week 2)

Slides: `slides/CH2 - HTML.pptx`

Open the files directly in your browser, or use the VS Code **Live Server** extension. No Node.js is needed this week.

## `examples/`: one file per slide topic

| File | Slide topic |
|------|-------------|
| `01_boilerplate.html` | Modern HTML boilerplate: lang, charset, viewport, defer |
| `02_semantic.html` | Semantic page skeleton: header, nav, main, article, aside, footer |
| `03_text_div_p_span.html` | div / p / span, headings, special characters, inline semantics |
| `04_lists.html` | ul / ol / dl (`type` on `<ul>` is obsolete) |
| `05_images_media.html` | img + alt + width/height, figure, picture, video, iframe |
| `06_table.html` | Accessible data table: caption, thead, scope |
| `07_links.html` | Relative, root-relative, absolute and fragment links, `rel="noopener"` |
| `08_forms.html` | Login form, input types, validation attributes, GET vs POST |
| `09_dialog.html` | Native modal with `<dialog>` |
| `10_data.xml` / `10_data.json` | XML vs JSON: the same data |

## `mockup/`: Lab 2 model answer (CampusFix)

These are 6 linked pages: `index`, `register`, `login`, `member`, `list` and `detail`. They show what your group's Lab 2 should look like. **Build your own pages for your own project idea; don't copy these.**
In CH3 the same pages are styled with Tailwind, and in CH7 they become EJS views.

## Lab 2 checklist

- [ ] Every page starts from the boilerplate (`lang`, `charset`, `viewport`)
- [ ] header / nav / main / footer on each page, with one `<h1>`
- [ ] Every page can be reached from the nav, with no broken links
- [ ] Forms: `label for` ↔ `id`, `name`, the right `type`, `required` / `minlength` / `pattern`
- [ ] Every `<img>` has `alt`
- [ ] W3C validator (https://validator.w3.org) shows **0 errors** on each page
- [ ] Each member wrote at least 1 page (check the commit history)
