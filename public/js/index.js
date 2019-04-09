 var socket = io()  // For Making Client Request

    socket.on('connect',() => {
        console.log('Connected To Page 1!')
      });


    socket.on('disconnect', () => {
        console.log('Disconnected From Page 1!')

          })

    socket.on('newMessage', function(message){         // For Listening Events Produced By Socket Emiting
      var formattedTime = moment().format('h:mm a')
      var template = jQuery('#message-template').html()
      var test = Mustache.render(template,{
        text : message.text,
        from : message.from,
        createdAt: formattedTime
      })
      jQuery('#messages').append(test)

      })

      socket.on('newLocationMessage', function(message){
              var formattedTime = moment().format('h:mm a')
        // var li = jQuery('<li></li>')
        // var a = jQuery('<a target="_blank">My Current Location</a>')
        // li.text(`${message.from}: ${formattedTime} `)
        // a.attr('href', message.url)
        // li.append(a)
        // jQuery('#messages').append(li)

        var template = jQuery('#location-message-template').html();
        var test = Mustache.render(template, {
          from : message.from,
          createdAt: formattedTime,
          url: message.url
        })
        jQuery('#messages').append(test)


      })




jQuery('#message-form').on('submit',function(e){
  e.preventDefault()
  var messageTextBox = jQuery('[name=message]')
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function(){
    messageTextBox.val('')
  })
})

var locationButton = jQuery('#send-location')
locationButton.on('click',function(){

  if(!navigator.geolocation){
    return alert('Your Browsers Does\'t Support Geolocation!')
  }
locationButton.attr('disabled','disabled').text('Sending Location...')
  navigator.geolocation.getCurrentPosition(function(position){          // For User Postition
    locationButton.removeAttr('disabled').text('Send Location')
    socket.emit('CreateLocationButton',{
      latitude : position.coords.latitude,
      longitude : position.coords.longitude
    })
  }, function(){                                                            // For Error
    alert('Unable To Fetch Location')
        locationButton.removeAttr('disabled').text('Send Location')

  })


})
