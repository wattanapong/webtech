const express = require('express');
const { PrismaClient, Prisma } = require('@prisma/client');
const bodyParser = require('body-parser');

const app = express();
const prisma = new PrismaClient();
const path = require('path');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// var urlencodedParser = bodyParser.urlencoded({ extended: false })

// parse application/json
app.use(bodyParser.json())

app.use('/css', express.static(path.resolve(__dirname, 'static/css')))

// app.configure(function(){
//   app.use(express.bodyParser());
// });

app.get('/', (req, res) => {
  let url = path.resolve(__dirname, 'static/index.html')
  res.sendFile(url)
});

app.get('/locations', async (req, res) => {
  const locations = await prisma.location.findMany({
    // where: { published: true },
    // include: { author: true },
    orderBy: {
      location_id: 'desc'
    }
  })
  res.json(locations)
})

app.post('/location', async (req, res) => {
  const obj = req.body
  try {
    const data = await prisma.location.create({
      data: {
        location_name: obj.location_name
      },
    })
    res.json(data)
  } catch (e) {
    return res.json({'error': e.message})
  }
})

app.get('/location/:id', async (req, res) => {
  const { id } = req.params
  const location = await prisma.location.findUnique({
    where: { "location_id": parseInt(id) },
    // data: { published: true },
  })
  console.log('location')
  res.json(location)
})

// app.delete('/user/:id', async (req, res) => {
//   const { id } = req.params
//   const user = await prisma.user.delete({
//     where: {
//       id,
//     },
//   })
//   res.json(user)
// })

// Close the Prisma client when the server is stopped
process.on('SIGTERM', () => {
  prisma.$disconnect();
});


const server = app.listen(3000)