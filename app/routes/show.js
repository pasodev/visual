var express = require('express');
var router = express.Router();
var fs = require('fs');
var parser = require('bio-parsers').anyToJson;

router.get('/:fileName', function(req, res, next) {
    console.log(req.params.fileName);
    parsedData = req.params.fileName;
    res.render('show', { data: parsedData });
});


module.exports = router;