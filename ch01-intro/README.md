# CH1 · Introduction to Web Technology (Week 1)

Slides: `slides/CH1 - Introduction to Web Technology.pptx`, "First Node.js Web Server" and Lab 1.

## Files

| File | What it shows |
|------|---------------|
| `server.mjs` | The smallest web server: Node.js only, no packages |
| `requests.http` | HTTP requests to send from VS Code (REST Client extension) |

## Run

```bash
cd ch01-intro
node --watch server.mjs        # --watch restarts the server when you save
```

Open http://localhost:3000 and press F12, then the **Network** tab.

## Lab 1 · Toolchain & HTTP inspection

1. Install VS Code, Node.js LTS (v24+) and Git. Check them with `node -v`, `npm -v` and `git --version`.
2. Set up Git once on your computer:
   ```bash
   git config --global user.name  "Your Name"
   git config --global user.email "you@example.com"
   git config --global init.defaultBranch main
   ```
3. Run `server.mjs` and open http://localhost:3000. Watch the log in the terminal.
4. In DevTools → Network, visit 3 websites. For each one, find the status, protocol (h2/h3), response headers and Timing.
5. Run these commands in a terminal:
   ```bash
   curl -I http://localhost:3000
   curl -I https://www.up.ac.th
   curl -IL http://github.com      # find the 301
   ```

## Self-check

- [ ] `node -v` prints v24 or newer
- [ ] I can explain each part of `https://a.com/p?id=7#top` (the fragment is never sent to the server)
- [ ] I changed the `<h1>` text, saved, and saw the server restart by itself
- [ ] I found a `301` and its `Location` header with `curl -IL`
