const express = require('express')
const passport = require('passport')
const routes = express.Router()
const userRoute = require('./userRoute')
const ticketRoute = require('./ticketRoute')

// routes.use(
//   passport.authenticate('local', {
//     failureRedirect: '/',
//     successRedirect: '/user',
//   }),
//   // eslint-disable-next-line no-unused-vars
//   function (req, res) {}
// )
routes.use('/user', userRoute)
routes.use('/ticket', ticketRoute)
module.exports = routes
