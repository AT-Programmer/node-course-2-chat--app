var socket = io()  // For Making Client Request

    socket.on('connect',() => {
        console.log('Connected To Page 1!')

        socket.emit('createMessage',{
          from: 'At@example.com',
          text: 'Yup! Thats Work For Me!'
        })
    })


    socket.on('disconnect', () => {
        console.log('Disconnected From Page 1!')

          })

    socket.on('newMessage', function(message){         // For Listening Events Produced By Socket Emiting
        console.log(message)
      })
