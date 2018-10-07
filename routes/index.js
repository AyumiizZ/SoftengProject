var express = require('express');
var router = express.Router();

const Job = require("../models/job");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'JetFree by JainsBret' });
});

router.get("/addjob", function(req, res) {
  res.render("addjob");
});

router.post("/addjob", function(req, res, next) {
  console.log(Job);
  console.log(req.body);
  res.redirect("/");
  return Job.query().insert(req.body);
  }
);

module.exports = router;
