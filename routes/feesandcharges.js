var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  let title = 'Fees and Charges, Earn and Save More! | JetFree by JainsBret';
  res.render('feesandcharges', {
    title: title
  });
});

module.exports = router;