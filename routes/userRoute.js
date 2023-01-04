const express = require('express')
const userRoute = express.Router()
const { registerUser } = require('../controllers/userController')

userRoute.get('/ping', async (req, res) => {
  return res.status(200).send({ msg: 'pong' })
})

userRoute.post('/insertData', async (req, res) => {
  const data = req.body
  const response = await registerUser(data)
  res.send({ response })
})

module.exports = userRoute
