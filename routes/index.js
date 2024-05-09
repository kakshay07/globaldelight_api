var express = require('express');
var router = express.Router();
// var index=require('./views/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{title:'express and mysql database to config Rest API'});
});

module.exports = router;
