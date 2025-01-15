# build image
```
docker build . -t webtech/node-web-app
```

# Run container
```
docker run -p 49160:8080 -d webtech/node-web-app
```