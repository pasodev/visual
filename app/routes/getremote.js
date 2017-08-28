var express = require('express');
var router = express.Router();
path = require('path'),
    os = require('os'),
    fs = require('fs');


var formidable = require('formidable');
var routeToFiles = __dirname + '/../uploads/';

// Databases available
var dbs = ['Gene', 'Protein'];

router.get('/', function(req, res, next) {
    var errors = {};
    res.render('getremote', {db:dbs, 'errors':errors});
});

router.post('/', function(req, res, next) {
    var form = new formidable.IncomingForm();
    var errors = {};
    form.parse(req, function (err, fields, files) {
        console.log(fields);
        if(fields['id'] == '' || dbs.includes(fields['db']) )
            var errors = {error : {msg:'You should fill all fields'}};
            res.render('getremote', {db:dbs, 'errors':errors});

    });

    var baseUrl = 'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/';
});

module.exports = router;