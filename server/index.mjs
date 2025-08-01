import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
})

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('info', "hello from server")
  socket.on('info', (msg) => {
    console.log(msg);
  })
  socket.on('disconnect', (msg) => {
    console.log(msg)
    console.log(socket.id)
  })
})

httpServer.listen(5000, (e) => {
  if (e) {
    return console.log(e);
  }
  console.log("server started on 5000");
})