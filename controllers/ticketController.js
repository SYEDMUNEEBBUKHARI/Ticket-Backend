/* eslint-disable no-unused-vars */
const db = require('../models')

const submitTicket = async (data) => {
  const { userId, name, description, status, todos } = data
  const response = await db.Tickets.create({
    userId,
    name,
    description,
    status,
    todos,
  })
  if (response) {
    return true
  } else {
    return false
  }
}

const getTicketData = async (userId) => {
  const users = await db.Users.findAll({
    where: {
      id: userId,
    },
    include: db.Tickets,
    required: true,
  })
  return users
}
const getAllTicketData = async () => {
  const users = await db.Users.findAll({
    include: db.Tickets,
    required: true,
  })
  return users
}
const updateTodos = async (data, userId, ticketId) => {
  //the data will be refined via data structure using logic like we have 1,2,3 swap 2,3 and delete last index and push changes
  await db.Tickets.update({ todos: data }, { where: { userId, id: ticketId } })
}

const deleteTicket = async (userId, ticketId) => {
  await db.Tickets.destroy({
    where: {
      id: ticketId,
      userId,
    },
  })
}
module.exports = {
  submitTicket,
  getTicketData,
  getAllTicketData,
  updateTodos,
  deleteTicket,
}
