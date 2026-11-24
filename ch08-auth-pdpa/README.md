# CH8 · Authentication, Authorization & PDPA (Week 10)

Slides: `slides/CH8 - Authentication, Authorization and PDPA.pptx`

## Setup (once)

```bash
cd ch08-auth-pdpa
mysql -u root -p < database/schema.sql     # creates database webtech_auth (or HeidiSQL → Run SQL file)
```
For each example:
```bash
cd ex2-login-register        # or ex1-simple-login / ex3-admin-role
npm install
cp .env.example .env         # set DB_PASSWORD and SESSION_SECRET
npm run dev
```
Generate a secret with `node -e "console.log(crypto.randomUUID() + crypto.randomUUID())"`.

The test admin user is **admin / admin12345**. It's fake data; never put real people in a demo database.

| Folder | Slide topic |
|--------|-------------|
| `ex1-simple-login/` | Ex1 simple login, **insecure on purpose**: plain-text passwords, no session, no roles. "What is wrong with Ex1?" |
| `cookie-demo/` | Cookies in Express (`cookie-parser`, `res.cookie`, `clearCookie`). Shows why a `username` cookie can be forged (edit it in DevTools) |
| `ex2-login-register/` | Ex2: bcrypt hash, `express-session` + MySQL store, `regenerate()`, `requireLogin`, POST logout, PDPA consent checkbox + `consent_at`, `/privacy` page |
| `ex3-admin-role/` | **Lab 10 Part B model answer**: `requireRole('admin')`, admin member list, enable/disable members, logged-in users redirected away from `/member/register` |

Security covered: prepared statements (SQL injection), `<%= %>` escaping (XSS), `HttpOnly` + `SameSite=Lax` cookies and POST-only changes (CSRF).

## Lab 10 UAT checklist (`ex3-admin-role` passes all of these)

| Test | Expected |
|------|----------|
| Register john / 1234 (too short) | Error: 8+ characters |
| Register john / secret123 without consent | Error: accept the Privacy Notice |
| Register john again | 409 Username already taken |
| Login john / wrong | Wrong Username or Password |
| Login john / secret123 | `/member/member` shows "Hello john" |
| Edit the `connect.sid` cookie in DevTools | Redirect to login |
| john opens `/member/admin` | 403 Forbidden |
| Admin disables john → john logs in | Wrong Username or Password |
| Log out, then press Back + reload | Redirect to login |

## Project PDPA checklist

- [ ] A `/privacy` page linked in the footer and on the register form
- [ ] A required consent checkbox, not pre-ticked, with `consent_at` saved
- [ ] Minimal data only (no ID card numbers)
- [ ] bcrypt, prepared statements, sessions, HTTPS when deployed
- [ ] Fake test users only, in the demo and on GitHub
