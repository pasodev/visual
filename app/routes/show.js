var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var os = require('os');
var parser = require('bio-parsers').anyToJson;
var vcf = require('biojs-vcf');

router.get('/:fileName', function(req, res, next) {

    var routeToFiles = __dirname + '/../uploads/';

    console.log(routeToFiles + req.param('fileName'));
    vcf.read(routeToFiles + req.param('fileName'));
    vcf.on('data', function(feature){
    });

    vcf.on('end', function(feature){
        console.log('end of file')
        res.render('show', { data: feature});
    });

    vcf.on('error', function(err){
        console.error('it\'s not a vcf', err)
    });

});


module.exports = router;