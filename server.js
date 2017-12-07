var express = require('express');
var path = require('path');
var app = express();
const fileUpload = require('express-fileupload');
//var bodyParser = require('body-parser');
var fs = require('fs');
//var base64 = require('base64js');
var base64 = require('file-base64');

module.exports = app;
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));
app.use(fileUpload());



app.post('/upload', function (req, res) {
  if (!req.files)
   // return res.status(400).send('No files were uploaded.');
  var sampleFile = req;
  console.log(sampleFile);
  console.log(req);

});

app.listen(3000);
console.log('App rodando!');
