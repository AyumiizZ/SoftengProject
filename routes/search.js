var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Test' });
  res.redirect('/search/projects')
});

router.get('/projects', function (req, res, next) {
  var user_skills = ["PHP", "Python", "MySQL", "Linux", "JavaScript"]
  var user_lang = ["Thai","English"]
  res.render('projects', {
    skills: user_skills,
    lang: user_lang
  });
});

module.exports = router;