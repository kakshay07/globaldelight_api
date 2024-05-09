var express = require('express');
var router = express.Router();

// import { connection } from './utils/database';
var connection = require('./utils/database');

/* GET users listing. */
router.get('/', function(req, res, next) {
  const {name}=req.query;
  res.send('respond with a resource ' +name);
});

module.exports = router;
