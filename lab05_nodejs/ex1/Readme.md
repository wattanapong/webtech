- Create package.json
```
npm init -y
```

- Start server
```
node index.js
```

- Auto reload server file (server.js, index.js)
```
node --watch index.js
```

- npm script 

```
npm run wstart
```
when package.json contains  

```
 "scripts": {
    "wstart": "node --watch index.js",
}

```

- Alternative web server (server.js, read query string `?name=...`)
```
npm run server
```
then browse http://127.0.0.1:3000/?name=webtech
