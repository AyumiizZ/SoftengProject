var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/addjob", function(req, res) {
  res.render("addjob");
});

router.post("/addjob", function(req, res, next) {
  console.log(req.body);
  Jobs.query().insert(req.body);
  res.redirect("/");
});

module.exports = router;
