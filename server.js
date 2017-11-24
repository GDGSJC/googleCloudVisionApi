var express = require('express');
var path = require('path');
var app = express();
//var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));


app.post('/upload', function(req, res) {
    console.log(req.files); // the uploaded file object
    fs.readFile(res, function(err, data) {
        var base64data = new Buffer(data).toString('base64');
        console.log(base64data);
     });
  });

app.listen(3000);
console.log('App rodando!');

module.exports = app;