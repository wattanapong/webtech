// CH9 · Callbacks → callback hell → async/await  (npm run callbacks)
// fake "database" functions in both styles
const db = { users: { 1: { id: 1, name: 'Somchai' } }, orders: { 1: [{ id: 10 }] }, items: { 10: ['Pen', 'Book'] } };
const later = (fn) => setTimeout(fn, 100);

// callback style (err, value)
function getUserCb(id, cb) { later(() => (db.users[id] ? cb(null, db.users[id]) : cb(new Error('no user')))); }
function getOrdersCb(uid, cb) { later(() => cb(null, db.orders[uid] ?? [])); }
function getItemsCb(oid, cb) { later(() => cb(null, db.items[oid] ?? [])); }

// pyramid of doom
getUserCb(1, (err, user) => {
  if (err) return console.error(err.message);
  getOrdersCb(user.id, (err, orders) => {
    if (err) return console.error(err.message);
    getItemsCb(orders[0].id, (err, items) => {
      if (err) return console.error(err.message);
      console.log('callbacks:', user.name, items);
    });
  });
});

// Promise style – same logic with async/await
const getUser = (id) => new Promise((ok, fail) => getUserCb(id, (e, v) => (e ? fail(e) : ok(v))));
const getOrders = (uid) => new Promise((ok) => getOrdersCb(uid, (e, v) => ok(v)));
const getItems = (oid) => new Promise((ok) => getItemsCb(oid, (e, v) => ok(v)));

async function main() {
  try {
    const user = await getUser(1);
    const orders = await getOrders(user.id);
    const items = await getItems(orders[0].id);
    console.log('async/await:', user.name, items);
    await getUser(99); // throws → catch
  } catch (err) {
    console.error('one place for errors:', err.message);
  }
}
main();
