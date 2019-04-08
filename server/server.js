const path = require('path')
const http = require('http')
var express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname , '../public')
const port = process.env.PORT || 3000;
var app = express()
var server = http.createServer(app)
var io = socketIO(server)  // For Connecting Socket Io To The Server

app.use(express.static(path.join(__dirname , '../public')))



io.on('connection' , function(socket){
  console.log('New User Is Connected!')


  socket.emit('newMessage',{
    from: 'John',
    text: 'I am Not Good!',
    createdAt : 123453
  })

  socket.on('createMessage', function(message){
    console.log('createMessage',message)
  })

  socket.on('disconnect' , (socket) => {
    console.log('1 User Is DisConnected!')
  })


})






server.listen(port, function () {
  console.log(`Our Port Is Listening At Port No. ${port}`)
})
