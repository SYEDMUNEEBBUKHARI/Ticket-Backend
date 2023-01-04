/* eslint-disable no-unused-vars */
const db = require('../models')
const bcrypt = require('bcrypt')
//For Register Page
const registerUser = async (data) => {
  const { email, password } = data
  const salt = await bcrypt.genSalt(12)
  const hashedpassword = await bcrypt.hash(password, salt)
  const user = await db.Users.create({
    email,
    password: hashedpassword,
  })
  if (user) {
    return { message: 'new user created!' }
  }
}
// For View
const loginView = async (req, res) => {
  try {
    const data = await db.Users.findAll({})
    console.log(data)
  } catch (error) {
    console.log(error)
  }
  return true
}
const Logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err)
    }
    res.redirect('/')
  })
}
module.exports = {
  registerUser,
  loginView,
  Logout,
}
