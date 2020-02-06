const express = require('express')
const app = express()
const {db, User, Pet} = require('./database')

app.get('/users', async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch(err) {
    next(err)
  }
})

app.get('/users/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    res.json(user)
  } catch(err) {
    next(err)
  }
})

app.get('/pets', async (req, res, next) => {
  try {
    const pets = await Pet.findAll()
    res.json(pets)
  } catch(err) {
    next(err)
  }
})

app.get('/pets/:id', async (req, res, next) => {
  try {
    const pet = await Pet.findByPk(req.params.id)
    res.json(pet)
  } catch(err) {
    next(err)
  }
})

// note the below is not a RESTful route --> using for demo purposes
app.get('/finn', async (req, res, next) => {
  try {
    const finn = await User.findOne({
      where: {
        firstName: 'Finn'
      }
    })
    const rigatoni = await Pet.findOne({
      where: {
        name: 'Rigatoni'
      }
    })
    await finn.setPets(rigatoni)
    res.json(rigatoni)
  } catch(err) {
    next(err)
  }
})

const main = async () => {
  await db.sync()
  console.log('db synced')
  app.listen(3000, () => console.log('listening on port 3000'))
}

main()
