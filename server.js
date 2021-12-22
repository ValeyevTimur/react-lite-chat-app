const express = require('express')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server, {
  cors: {
    // origin: 'http://localhost:3000/',
    origin: '*',
    methods: ['GET', 'POST'],
    allowEIO3: false,
    credentials: true,
  },
})

const PORT = 5000

io.on('connection', (socket) => {
  console.log(socket.id)

  //Соединение с комнатной
  socket.on('enter_room', (data) => {
    socket.join(data)
    console.log(`user ID: ${socket.id} has joined room: ${data}`)
  })

  //Отправка сообщения
  socket.on('send_message', (data) => {
    console.log(data)
    //Отправка сообщения из бекэнда в определенную комнату
    socket.to(data.room).emit('recieve_message', data)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id)
  })
})

server.listen(PORT, () => {
  console.log(`Сервер запущен и работает на порту ${PORT}`)
})
