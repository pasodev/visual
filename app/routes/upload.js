var express = require('express');
var router = express.Router();
path = require('path'),
os = require('os'),
fs = require('fs');


var formidable = require('formidable');
var routeToFiles = __dirname + '/../uploads/';

router.get('/', function(req, res, next) {
  res.render('upload');
});

router.post('/', function(req, res, next) {
  var form = new formidable.IncomingForm();

  if (!req.files) {
    console.log('not file indicated');
    errors = {error : {msg:'No ha indicado un archivo'}};
    res.render('upload');
  } else {
      form.once('error', console.log);
      form.encoding = 'binary';
      form.parse(req, function (err, fields, files) {
          console.log('File upload success!');
          if (err) throw err;
          response = 'Archivo subido correctamente';
          res.render('upload', {resp: response});
      });
      form.on('fileBegin', function (name, file) {
          if (!fs.existsSync(routeToFiles)) {
              fs.mkdirSync(routeToFiles);
          }
          file.path = routeToFiles + file.name;
      });
      form.on('file', function (name, file) {
          console.log('Saved file ' + file.path)
      });
  }
});

module.exports = router;
