const socket = io('ws://localhost:5000')

socket.on('info', (msg) => {
  console.log(msg)
})

socket.emit('info', 'hello from client')