const path = require('path')
const http = require('http')
var express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname , '../public')
const port = process.env.PORT || 3000;
var app = express()
var server = http.createServer(app)
var io = socketIO(server)  // For Connecting Socket Io To The Server
var {generateMessage, generateLocationMessage} = require('./utils/message')

app.use(express.static(path.join(__dirname , '../public')))



io.on('connection' , function(socket){
  console.log('New User Is Connected!')

  socket.emit('newMessage', generateMessage('Admin','Welcome To The Chat App'))

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined!'))

  socket.on('createMessage', function(message,callback){
  console.log('createMessage',message)

    io.emit('newMessage', generateMessage(message.from,message.text));
    callback()


  });

  socket.on('CreateLocationButton', function(coords){
    io.emit('newLocationMessage',generateLocationMessage('Admin : ', coords.latitude, coords.longitude))
  })



  socket.on('disconnect' , (socket) => {
    console.log('1 User Is DisConnected!')
  })


})






server.listen(port, function () {
  console.log(`Our Port Is Listening At Port No. ${port}`)
})
