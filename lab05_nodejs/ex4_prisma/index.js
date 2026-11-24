const express = require('express');
const { PrismaClient, Prisma } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const path = require('path');

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

app.use('/css', express.static(path.resolve(__dirname, 'static/css')))

// app.configure(function(){
//   app.use(express.bodyParser());
// });

app.get('/', (req, res) => {
  let url = path.resolve(__dirname, 'static/index.html')
  res.sendFile(url)
});

app.get('/locations', async (req, res) => {
  try {
    const locations = await prisma.location.findMany({
      // where: { published: true },
      // include: { author: true },
      orderBy: {
        location_id: 'desc'
      }
    })
    res.json(locations)
  } catch (e) {
    res.status(500).json({'error': e.message})
  }
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
    return res.status(500).json({'error': e.message})
  }
})

app.get('/location/:id', async (req, res) => {
  const { id } = req.params
  try {
    const location = await prisma.location.findUnique({
      where: { "location_id": parseInt(id) },
    })
    if (!location) {
      return res.status(404).json({'error': 'Location not found'})
    }
    res.json(location)
  } catch (e) {
    res.status(500).json({'error': e.message})
  }
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


const server = app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})