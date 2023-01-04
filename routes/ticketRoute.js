const express = require('express')
const ticketRoute = express.Router()
const {
  submitTicket,
  getTicketData,
  getAllTicketData,
  updateTodos,
  deleteTicket,
} = require('../controllers/ticketController')

ticketRoute.post('/submitTicket', async (req, res) => {
  const data = req.body
  const result = await submitTicket(data)
  if (result) {
    return res.send({ msg: 'ticket record inserted!', status: true })
  }
  return res.send({ msg: 'data is not inserted!', status: false })
})
ticketRoute.get('/getTicketData', async (req, res) => {
  const { userId } = req.query
  try {
    const response = await getTicketData(userId)
    return res.send({ status: true, response })
  } catch (err) {
    return res.send({ status: false, err })
  }
})

ticketRoute.get('/getAllUsersTicketData', async (req, res) => {
  try {
    const response = await getAllTicketData()
    return res.send({ status: true, response })
  } catch (err) {
    return res.send({ status: false, err })
  }
})
ticketRoute.patch('/updateTodos', async (req, res) => {
  try {
    const data = req.body
    const { userId, ticketId } = req.query
    const response = await updateTodos(data, userId, ticketId)
    return res.send({ status: true, response })
  } catch (err) {
    return res.send({ status: false, err })
  }
})

ticketRoute.delete('/deleteTicket', async (req, res) => {
  try {
    const { userId, ticketId } = req.query
    const response = await deleteTicket(userId, ticketId)
    return res.send({ status: true, response })
  } catch (err) {
    return res.send({ status: false, err })
  }
})
module.exports = ticketRoute
