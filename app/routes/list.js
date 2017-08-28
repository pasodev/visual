var express = require('express');
var router = express.Router();

var path = require('path');
var os = require('os');
var fs = require('fs');

var routeToFiles = __dirname + '/../uploads/';

router.get('/', function(req, res, next) {
    var files = fs.readdirSync(routeToFiles);
    res.render('list', {myFiles:files});
});

module.exports = router;