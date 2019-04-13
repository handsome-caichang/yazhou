var opn = require('opn')
var path = require('path')
var express = require('express')

var app = express()
var port = 9999

app.use(express.static(path.resolve(__dirname, '../../dist' )))

var uri = 'http://localhost:' + port

console.log('> Listening at ' + uri + '\n')
opn(uri)

var server = app.listen(port)

