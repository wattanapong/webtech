
# setting Next.js 

- build project
```bash
npm run dev
```

- Open [http://localhost:3000](http://localhost:3000)


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
```

Update database type in schema.prisma
```
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

```
npx prisma generate
```
