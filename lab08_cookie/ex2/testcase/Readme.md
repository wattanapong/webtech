# Test API using POSTMAN
- create verify-api to {{URL}}/member/verify-api
- set raw in Body tab and add this json
```
{
    "username":"{{username}}",
    "password":"{{password}}"
}
```

- Open Runner and upload Test file from auth.csv
- Start Run