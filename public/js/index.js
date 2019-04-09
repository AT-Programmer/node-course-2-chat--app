 var socket = io()  // For Making Client Request

    socket.on('connect',() => {
        console.log('Connected To Page 1!')
      });


    socket.on('disconnect', () => {
        console.log('Disconnected From Page 1!')

          })

    socket.on('newMessage', function(message){         // For Listening Events Produced By Socket Emiting
        console.log('newMessage',message )
        var li = jQuery('<li></li>');
        li.text(`${message.from}: ${message.text}`)

        jQuery('#messages').append(li)
      })

      socket.on('newLocationMessage', function(message){
        var li = jQuery('<li></li>')
        var a = jQuery('<a target="_blank">My Current Location</a>')
        li.text(`${message.from}: `)
        a.attr('href', message.url)
        li.append(a)
        jQuery('#messages').append(li)


      })




jQuery('#message-form').on('submit',function(e){
  e.preventDefault()

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function(){

  })
})

var locationButton = jQuery('#send-location')
locationButton.on('click',function(){

  if(!navigator.geolocation){
    return alert('Your Browsers Does\'t Support Geolocation!')
  }

  navigator.geolocation.getCurrentPosition(function(position){          // For User Postition
    socket.emit('CreateLocationButton',{
      latitude : position.coords.latitude,
      longitude : position.coords.longitude
    })
  }, function(){                                                            // For Error
    alert('Unable To Fetch Location')
  })


})
