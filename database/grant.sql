-- used by docker-compose.yml: let the webtech user create the course databases
GRANT ALL ON *.* TO 'webtech'@'%';
FLUSH PRIVILEGES;
