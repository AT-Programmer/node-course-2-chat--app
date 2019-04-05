const path = require('path')
const publicPath = path.join(__dirname , '../public')
var express = require('express')
var app = express()
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname , '../public')))




app.listen(port, function () {
  console.log(`Our Port Is Listening At Port No. 3000`)
})
