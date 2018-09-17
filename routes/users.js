var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function (req, res) {
  res.render('register');
});

router.post('/register', function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const confirm = req.body.confirm;
  const isTick = req.body.agreement;

  console.log('click');
  if(password == confirm && isTick == 'on'){
    console.log('match');
  }
  else{
    console.log('ERROR');
  }
  res.render('register')
});

router.get('/login', function (req, res) {
  res.render('login');
});

router.get('/resetPassword', function (req, res) {
  res.render('resetPassword');
});

router.post('/resetPassword', function (req, res) {
  const username = req.body.username;
  const answer = req.body.answer.toLowerCase();
  
  console.log('click')
  if(answer == 'o(n^2)' || answer == 'n^2' || answer == 'o(n**2)' || answer == 'n**2'){
    console.log('OK');
  }
  else{
    console.log('noob');
  }
  res.render('resetPassword')
});

module.exports = router;