<<<<<<< HEAD
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/freelance', function(req, res, next){
  res.render('freelance');
});

router.get('/register',function(req,res){
  res.render('register');
});

router.get('/login',function(req,res){
  res.render('login');
});

module.exports = router;
=======
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
>>>>>>> fe11b50345c295d1ac3285ba607b5e25564edbbc
