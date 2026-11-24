// CH9 · Ex1 – Promises in an Express server  (npm run server)
//   /then-ok        → "Then OK"           (res.end inside then)
//   /then-broken    → request hangs/empty  (res.end runs BEFORE then – the classic bug)
//   /then-finally   → then + finally order
//   /time           → JSON time via async/await (used by await.html)
const express = require('express');
const path = require('node:path');
const app = express();
app.use(express.static(path.join(__dirname, 'static')));

const work = (ok = true) =>
  new Promise((resolve, reject) => setTimeout(() => (ok ? resolve('ok') : reject(new Error('fail'))), 500));

app.get('/then-ok', (req, res) => {
  work().then((v) => res.send(`Then ${v.toUpperCase()}`));
});

app.get('/then-broken', (req, res) => {
  let msg = '';
  work().then((v) => { msg = `Then ${v}`; }); // runs 500 ms later…
  res.end(msg);                               // …but this runs NOW → empty page
});

app.get('/then-finally', (req, res) => {
  const log = [];
  work(req.query.fail === undefined)
    .then((v) => log.push(`then: ${v}`))
    .catch((err) => log.push(`catch: ${err.message}`))
    .finally(() => {
      log.push('finally (always last)');
      res.send(log.join('<br>'));
    });
});

// async/await version – Express 5 sends a rejected promise to the error handler
app.get('/time', async (req, res) => {
  await work();
  const fmt = new Intl.DateTimeFormat('th-TH', { dateStyle: 'full', timeStyle: 'medium', timeZone: 'Asia/Bangkok' });
  res.json({ now: fmt.format(new Date()) });
});

app.listen(3000, () => console.log('http://localhost:3000/await.html'));
