# CH4-1 · JavaScript Basic (Week 4)

Slides: **CH4-1 - JavaScript Basic** (from the lecturer; not in this repo)

## Run

```bash
cd ch04-1-js-basic/examples
node --watch 01_variables.js        # re-runs every time you save
```
Or paste the code into the browser console (F12 → Console).

| Folder / file | Slide topic |
|---------------|-------------|
| `browser/index.html` + `main.js` | Embedded JavaScript, where to put `<script>` (`defer`) |
| `browser/module.html` | `<script type="module">` (open with Live Server, not `file://`) |
| `examples/01_variables.js` | `const` / `let` / `var`, data types, `typeof` |
| `examples/02_strings_operators.js` | Template literals, conversions, operators, `===`, truthy/falsy |
| `examples/03_conditions_loops.js` | if / else if / ternary / switch, for / for…of / forEach / while, looping objects |
| `examples/04_functions.js` | Declarations, expressions, arrow functions, first-class functions, callbacks |
| `examples/05_arrays_objects.js` | Array methods, map / filter / reduce / find, destructuring, spread, `?.` `??` |
| `examples/06_classes.js` | `class`, `#private`, `static`, getters, `extends`, `super`, Thai date object |
| `examples/07_json_students.js` | `JSON.parse` / `JSON.stringify`, printing the students array |
| `examples/08_errors.js` | `throw`, `try / catch / finally`, common errors |
| `modules/` | ES Modules (`import` / `export`) vs CommonJS |
| `exercises/exercises.js` | **In-class exercises E1–E6** (solutions in `solutions.js`; try first!) |

## Self-check

- [ ] I use `const` by default and `let` only when the value changes. I never use `var`.
- [ ] I always use `===` / `!==`
- [ ] I can write map / filter / reduce without looking at the slides
- [ ] E3 and E5 in `exercises.js` run and print the right output (show them to the TA)
- [ ] I can explain why `<script>` in `<head>` without `defer` gets `null` from `querySelector`
