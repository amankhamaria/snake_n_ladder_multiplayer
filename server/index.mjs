import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

let turn = ""

let clients = [
  // {
  //   name: "apple",
  //   socketId: "5wPtBoGlK0v-7FLfAAAF"
  // },
  // {
  //   name: "apple",
  //   socketId: "sHAHujgtGHV-7FLfAAAF"
  // }
]

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
})

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('info', (name) => {
    console.log(name);
    if (!name) {
      return
    }
    if (turn === "") {
      turn = socket.id
    }
    clients.push({ name, socketId: socket.id })
    console.log(clients)
  })
  socket.on('play', () => {
    let index = -1
    const clientArr = clients.filter((e, i) => {
      const match = e.socketId === socket.id
      if (match) {
        index = i
        return true
      }
    })
    if (clientArr.length === 0) {
      return
    }
    const client = clientArr[0]
    if (turn === client.socketId) {
      const diceValue = Math.ceil(Math.random() * 6)
      console.log(`Dice value : ${diceValue}`)
      io.emit('play', diceValue)
      index = (index + 1) % clients.length
      turn = clients[index].socketId
      console.log(`Next turn is : ${clients[index].name}, ${turn}`)
    } else {
      console.log(`Not your turn ${client.name} : ${client.socketId}`)
    }
  })
  socket.on('game', () => {
    io.emit('game', { clients, turn })
  })
  socket.on('disconnect', (msg) => {
    console.log(msg, socket.id)
    clients = clients.filter((e) => e.socketId != socket.id)
    console.log(clients)
  })
})

httpServer.listen(5000, (e) => {
  if (e) {
    return console.log(e);
  }
  console.log("server started on 5000");
})