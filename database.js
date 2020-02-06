const Sequelize = require('sequelize')

const db = new Sequelize('postgres://localhost:5432/sequelize-demo', {logging: false})

const User = db.define('user', {
  firstName: Sequelize.STRING,
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

const Pet = db.define('pet', {
  name: Sequelize.STRING,
  age: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  type: Sequelize.ENUM('dog', 'cat', 'bird')
})

User.beforeValidate(user => {
  // can do something with the user instance
});

Pet.belongsTo(User)
User.hasMany(Pet)

module.exports = {
  db,
  User,
  Pet
}
