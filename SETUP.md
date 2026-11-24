# Setup: install once, practise anywhere

## 1. Install the tools

| Tool | Version | Check |
|------|---------|-------|
| [Node.js LTS](https://nodejs.org) | **v24 or newer** (has `--watch` and `--env-file`) | `node -v` |
| [Git](https://git-scm.com) | any recent version (Windows: use Git Bash) | `git --version` |
| [VS Code](https://code.visualstudio.com) | latest | |
| [MariaDB](https://mariadb.org/download) or [MySQL 8](https://dev.mysql.com/downloads/) | from CH5-3 (Week 7) | `mysql --version` |
| [HeidiSQL](https://www.heidisql.com) (Windows) | optional GUI for MySQL | |

**VS Code extensions:** Live Server, REST Client (Huachao Mao), Tailwind CSS IntelliSense, EJS language support, Prettier, ESLint.

## 2. Get the course code

```bash
git config --global user.name  "Your Name"
git config --global user.email "you@up.ac.th"
git clone https://github.com/wattanapong/webtech.git
cd webtech
```

**Every week:** `git pull` to get new examples.

**Never edit the course files directly.** Copy what you want to practise into `my-work/` (Git ignores it), so `git pull` never conflicts:

```bash
mkdir -p my-work
cp -r ch05-2-express/lab6-skeleton my-work/lab6
```

Pull refused because you changed a course file? Run `git stash`, then `git pull`, then `git stash pop`, or throw your changes away with `git restore .`

## 3. Run any Node.js example

```bash
cd <chapter>/<example>
npm install                 # once per folder (creates node_modules/, never commit it)
cp .env.example .env        # only if the folder has .env.example – then edit the values
npm run dev                 # restarts on save; stop with Ctrl + C
```

Windows PowerShell: use `Copy-Item .env.example .env` instead of `cp`.

`node --env-file=.env` stops with "not found" if `.env` is missing, so copy it first.

## 4. Database (from Week 7)

1. Install MariaDB or MySQL and remember the root password.
2. Create the course user (HeidiSQL → Query, or `mysql -u root -p`):
   ```sql
   CREATE USER 'webtech'@'localhost' IDENTIFIED BY 'change-me';
   GRANT ALL ON *.* TO 'webtech'@'localhost';
   ```
3. Import the sample database: `mysql -u root -p < database/classicmodels.sql` (or HeidiSQL → File → Run SQL file).
4. Put the same user and password in each example's `.env`.

No MySQL on your computer? See `database/README.md` for the Docker option.

## Troubleshooting

| Message | Fix |
|---------|-----|
| `EADDRINUSE :::3000` | Another server is still running. Stop it (Ctrl + C) or set `PORT=3001` in `.env` |
| `.env: not found` | `cp .env.example .env` |
| `ER_ACCESS_DENIED_ERROR` | Wrong `DB_USER` / `DB_PASSWORD` in `.env` |
| `ER_BAD_DB_ERROR` | Import the folder's `schema.sql` first |
| `Cannot find module 'express'` | Run `npm install` in **that** folder |
| Page has no styling | The Tailwind Play CDN needs internet; the project uses the Tailwind CLI (`npm run css`) |
