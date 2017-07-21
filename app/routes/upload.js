var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('upload');
});

router.post('/', function(req, res, next) {
    console.log('Trying to upload file');
   if (!req.files) {
        console.log('not file indicated');
      errors = {error : {msg:'No ha indicado un archivo'}};
      res.render('upload');
   }
   let myFile = req.files.filename;
   let response = "";
   myFile.mv('../data/uploads', function(err) {
           if (err)
               return res.status(500).send(err);
            });
   console.log('File upload success!');
   response = 'Archivo subido correctamente';
   res.render('upload', {resp : response} );
    
});

module.exports = router;
