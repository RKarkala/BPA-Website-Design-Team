var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('about');

});
router.post('/', function(req, res){

});
module.exports = router;
