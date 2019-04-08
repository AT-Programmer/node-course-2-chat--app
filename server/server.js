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

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome To The Chat App!',
    createdAt: new Date().getTime()
  })

  socket.broadcast.emit('newMessage', {
    from : 'Admin',
    text: 'New User Joined',
    createdAt: new Date().getTime()
  })

  socket.on('createMessage', function(message){
  console.log('createMessage',message)

    io.emit('newMessage', {                        //  for Sending The Message For All Online Users
      from : message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });

    // socket.broadcast.emit('newMessage', {
    //   from: message.from,                                   // For Show Message Only On Others Not For Him
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // })
  });

  socket.on('disconnect' , (socket) => {
    console.log('1 User Is DisConnected!')
  })


})






server.listen(port, function () {
  console.log(`Our Port Is Listening At Port No. ${port}`)
})
