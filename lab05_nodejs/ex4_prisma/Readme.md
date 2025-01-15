# import iot database
```
mysql -u root -p -t < iot_data_sm.sql
```

# setting prisma

```
npx prisma init
```

- Create .env contains
```
DATABASE_URL="mysql://iot:1234@localhost:3306/iot?schema=public"
```

Genearte schema in schema.prisma
```
npx prisma db pull
npx prisma generate
```

