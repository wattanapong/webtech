# CH5-3 · Database & RESTful API (Week 7)

Slides: `slides/CH5-3 - Database and RESTful API (CRUD).pptx`

You need MySQL or MariaDB plus HeidiSQL (see the root `SETUP.md`). Create a user once:

```sql
CREATE USER 'webtech'@'localhost' IDENTIFIED BY 'change-me';
GRANT ALL ON *.* TO 'webtech'@'localhost';
```

## `products-api/`: full CRUD API + fetch frontend (the 2026 slides)

```bash
cd ch05-3-mysql-rest/products-api
mysql -u root -p < schema.sql      # or HeidiSQL: File → Run SQL file
npm install
cp .env.example .env               # then set DB_PASSWORD
npm run dev
```

- Open http://localhost:3000/products for the CSR page: list, search, add and delete with `fetch`.
- Test every route with `api.http` (VS Code **REST Client**) or curl.

| File | Slide topic |
|------|-------------|
| `schema.sql` | CREATE TABLE with foreign keys, a 5-table shop system, SQL CRUD |
| `db.js` | `mysql2/promise` pool, credentials from `.env` |
| `routes/products.js` | GET list (`?q=`), GET `:id`, POST, PUT, PATCH (whitelist), DELETE, status codes 200/201/204/400/404 |
| `public/products.html`, `public/js/products.js` | fetch: load & render, submit a form as JSON, delete with event delegation |
| `api.http` | VS Code REST Client tests |

## `classicmodels/`: the original example, updated

Import `database/classicmodels.sql` first, set `DB_NAME=classicmodels` in `.env`, then run `npm run dev`.

- REST: `GET/PUT/DELETE /api/customers/:id` replaces the old `GET /customers/delete/1` and `POST /customers/update`.
- **SQL injection demo:** compare `/demo/unsafe?city=' OR '1'='1`, which returns all 122 customers, with `/demo/safe`, which returns 0.

> `mysql2` returns `DECIMAL` columns as strings (`"15.00"`). Convert them with `Number()` on the client.

## Lab 7 check-off

- [ ] ER diagram with ≥ 5 tables, PK/FK visible (draw.io / dbdiagram.io)
- [ ] `schema.sql` runs on an empty database without errors
- [ ] CRUD endpoints: GET list, GET `:id`, POST, PUT or PATCH, DELETE
- [ ] Prepared statements only: no SQL built from user input with `+` or `${}`
- [ ] Status codes 200 / 201 / 204 / 400 / 404 used correctly
- [ ] `.env` is ignored by Git; `.env.example` is committed
