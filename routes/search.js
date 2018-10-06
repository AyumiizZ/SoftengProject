var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Test' });
  res.redirect('/search/projects')
});

router.get('/projects', function (req, res, next) {
  var user_skills = ["PHP", "Python", "MySQL", "Linux", "JavaScript"]
  res.render('projects', {
    user_skills: user_skills
  });
});

module.exports = router;