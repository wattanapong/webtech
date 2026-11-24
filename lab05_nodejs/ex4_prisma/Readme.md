# import iot database
(create the database first: `CREATE DATABASE iot;` because the sql file only runs `USE iot`)
```
mysql -u root -p -t < ../db/iot/iot_data_sm.sql
```

# setting prisma

```
npx prisma init
```

- Create .env contains
```
DATABASE_URL="mysql://iot:1234@localhost:3306/iot"
```

Generate schema in schema.prisma
```
npx prisma db pull
npx prisma generate
```

# install and run
```
npm install
npx prisma generate
npm run dev
```
