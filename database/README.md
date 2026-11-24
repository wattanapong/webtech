# Shared sample databases

| File | Used by | Import |
|------|---------|--------|
| `classicmodels.sql` | CH5-3 `classicmodels/`, CH7 `ex4-classicmodels/`, CH9 `ex2-ajax-customers/` | `mysql -u root -p < database/classicmodels.sql` |

You can re-run the file any time to reset the data.

Each chapter keeps its own small schema next to its code:

- `ch05-3-mysql-rest/products-api/schema.sql` → database `shop`
- `ch07-ejs/ex5-items-crud/database/schema.sql` → database `webtech`
- `ch08-auth-pdpa/database/schema.sql` → database `webtech_auth`
- `project-starter/database/schema.sql` → database `project_db`

Create the course user once (as root):

```sql
CREATE USER 'webtech'@'localhost' IDENTIFIED BY 'change-me';
GRANT ALL ON *.* TO 'webtech'@'localhost';
```

## Optional: MySQL with Docker

If you don't want to install MySQL, run `docker compose up -d` in this folder. It starts MySQL 8 on port 3306 (user `webtech`, password `change-me`) and imports `classicmodels.sql` automatically.
