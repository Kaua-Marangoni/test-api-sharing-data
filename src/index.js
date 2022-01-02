const { response, request } = require("express")
const express = require("express")
const { v4 } = require("uuid")
const dataUsers = require("./data.json")
const cors = require("cors")
const port = 3002

const app = express()
app.use(express.json())
app.use(cors())

const checkUserId = (request, response, next) => {
  const { id } = request.params
  const index = users.findIndex( user => user.id === id )
  
  if (index < 0) {
    return response.status(404).json({ error: "User not found" })
  }

  request.userIndex = index
  request.userId = id

  next()
}

const users = []

dataUsers.filter(user => users.push({ id: v4(), name: user.nome, number: user.celular }))

app.get("/numbers", (request, response) => {
  return response.json(users)
})

app.get("/numbers/:id", checkUserId, (request, response) => {
  const index = request.userIndex

  return response.json(users[index])
})

app.post("/numbers", (request, response) => {
  const { name, number } = request.body

  const user = { id: v4(), name, number }

  users.push(user)

  return response.status(201).json(user)
})

app.put("/numbers/:id", checkUserId, (request, response) => {
  const { name, number } = request.body
  const index = request.userIndex
  const id = request.userId
  
  const updateUser = { id, name, number }

  users[index] = updateUser

  return response.status(200).json(updateUser)
})

app.delete("/numbers/:id", checkUserId, (request, response) => {
  const index = request.userIndex
  
  users.splice(index, 1)

  return response.status(200).json({ sucess: "User deleted" })
})

app.listen(process.env.PORT || port, () => {
  console.log(`🚀️ Server started!`)
})