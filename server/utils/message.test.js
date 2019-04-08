var expect = require('expect')
var {generateMessage} = require('./message')
describe('Generating Message', () => {
    it('Should Check Everything Work Great',() => {
      var from = 'AT Programmer';
    var text  = 'Tatti Kha';
    var message = generateMessage(from, text)

    expect(message.createdAt).toBeA('number')
    expect(message).toInclude({from,text})
});
});
