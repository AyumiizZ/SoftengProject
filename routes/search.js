var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Test' });
  res.redirect('/search/view_jobs')
});

router.get('/view_jobs', function(req, res, next) {
  res.render('view_jobs', { title: 'Jobs' });
});

module.exports = router;