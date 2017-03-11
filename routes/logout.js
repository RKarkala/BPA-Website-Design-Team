var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
    req.session.destroy();
    res.redirect("/");
});
router.post('/', function(req, res){

});
module.exports = router;
