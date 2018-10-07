var express = require('express');
var router = express.Router();

const Job = require("../models/job");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'JetFree by JainsBret' });
});

module.exports = router;
