import express from 'express'
import { createServer } from 'http'
import { resolve } from 'path'
import { Server } from 'socket.io'

const app = express()

app.use(
  express.static(
    resolve(__dirname, '..', 'public'),
  ),
)
const httpServer = createServer(app)
const io = new Server(httpServer)

io.on('connection', (socket) => {
  console.log('conectando..')
  io.emit('toClient', 'Ping ( do servidor )')

  socket.on('client-message', (message) => {
    io.emit('message', message)
  })
  socket.on('toServer', (data) => {
    console.log(data)
  })
})

httpServer.listen(3000)
