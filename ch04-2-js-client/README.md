# CH4-2 · JavaScript: Client Side (Week 4)

Slides: `slides/CH4-2 - JavaScript Client Side.pptx`

Open the pages with the VS Code **Live Server** extension, or by double-clicking them. Keep DevTools → Console open.

## `examples/`

| File | Slide topic |
|------|-------------|
| `01_dialog.html` | `<dialog>` instead of `alert()` |
| `02_select_dom.html` | DOM tree, `querySelector` / `querySelectorAll` vs `getElementBy*` |
| `03_attributes_classlist.html` | Attributes, `data-*`, `classList` with Tailwind, **textContent vs innerHTML (XSS demo)** |
| `04_create_render.html` | `createElement`, `append` / `prepend`, `<template>` rendering |
| `05_events.html` | `addEventListener`, event object, **event delegation**, `preventDefault` |
| `06_form_validation.html` | `FormData`, Constraint Validation API, custom error messages |
| `07_timers_search.html` | `setTimeout` / `setInterval`, live search with debounce |
| `08_calculator.html` | Calculator: delegation + keyboard, no `eval()` |

Every page keeps its JavaScript in `examples/js/` and loads it with `<script defer>`.

## `lab-starter/`: Lab 4-2 model answer

These are the CH3 Tailwind pages with one shared `js/app.js` that adds:

1. A mobile menu toggle (`classList`)
2. Register validation: password ≥ 8, the confirm field must match, red messages, and a `<dialog>` on success
3. Live search on `list.html` (debounce 300 ms)
4. A delete-confirm `<dialog>` and a toast (`setTimeout`) on `detail.html`

## Self-check (Lab 4-2)

- [ ] At least 3 working features (validation, filter, modal)
- [ ] No inline `onclick`, no `var`
- [ ] User data is shown with `textContent`, never with `innerHTML`
- [ ] I can explain why client-side validation is **not** enough (the server checks again in CH5)
