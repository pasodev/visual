var express = require('express');
var router = express.Router();
path = require('path'),
os = require('os'),
fs = require('fs');


var formidable = require('formidable');


router.get('/', function(req, res, next) {
  res.render('upload');
});

router.post('/', function(req, res, next) {
  var form = new formidable.IncomingForm();
  form.once('error', console.log);
  form.uploadDir =
  form.encoding = 'binary';
  form.parse(req, function(err, fields, files) {
    console.log('File upload success!');
    if (err) throw err;
    files.path = form.uploadDir + files.name;
    response = 'Archivo subido correctamente';
    res.render('upload', {resp : response} );
  });
  form.on('fileBegin', function(name, file){
    file.path =  __dirname + '/../uploads/' + file.name;  
  });
  form.on('file', function(name, file){
    console.log('Saved file ' + file.path)
  });
});

module.exports = router;
