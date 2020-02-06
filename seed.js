const {db, User, Pet} = require('./database')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({firstName: 'Priti', lastName: 'Patel'}),
    User.create({firstName: 'Finn', lastName: 'Terdal'}),
    User.create({firstName: 'Collin', lastName: 'Miller'})
  ])

  const pets = await Promise.all([
    Pet.create({name: 'Milo', age: 5, type: 'dog'}),
    Pet.create({name: 'Rigatoni', age: 1, type: 'cat'}),
    Pet.create({name: 'Peter the Pelican', type: 'bird'})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${pets.length} pets`)
  console.log(`seeded successfully`)

  db.close()

}

seed()
