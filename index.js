var app = require('express')();
var fileUpload = require('express-fileupload');
var server = require('http').Server(app);
 
app.use(fileUpload());
var template = require('./template.js');
app.get('/template', template.get);
server.listen(80);
 
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});