1. Clone server git clone git@github.com:localtunnel/server.git
2. cd server && npm install
3. node -r esm ./bin/server  --port 3000

# client when map router port 46413 to PC port 3000
lt -p 8001 --host wattanapongsu.3bbddns.com:46413 

# wsl admin powershell
- map network wsl and physical ip
netsh interface portproxy add v4tov4 listenport=3000 listenaddress=0.0.0.0 connectport=3000 connectaddress=172.26.226.92
- list mapping
 netsh interface portproxy show all
- delete map
netsh interface portproxy delete v4tov4 listenport=3000 listenaddress=0.0.0.0