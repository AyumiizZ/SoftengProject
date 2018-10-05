var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Test' });
  res.redirect('/search/view_jobs')
});

router.get('/projects', function(req, res, next) {
  res.render('projects');
});

module.exports = router;