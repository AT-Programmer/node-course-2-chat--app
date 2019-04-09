var expect = require('expect')
var {generateMessage,generateLocationMessage} = require('./message')
describe('Generating Message', () => {
    it('Should Check Everything Work Great',() => {
      var from = 'AT Programmer';
    var text  = 'Tatti Kha';
    var message = generateMessage(from, text)

    expect(message.createdAt).toBeA('number')
    expect(message).toInclude({from,text})
});
});

describe('generateLocationMessage', () => {
  it('Should Check Location Working As Expected!' , () => {
    var from = 'AT'
    var  latitude = 15
    var longitude = 16
    var message = generateLocationMessage(from,latitude,longitude)
    var url = 'https://www.google.com/maps?q=15,16'

    expect(message.createdAt).toBeA('number')
    expect(message).toInclude({from,url})
  })
})
