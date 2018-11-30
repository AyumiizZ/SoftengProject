var valid = require("card-validator");

$("#cardnumber").mask("0000 0000 0000 0000");
$("#cvc").mask("000", {
  placeholder: "000"
});
$("#expire").mask("00/00", {
  placeholder: "MM/YY"
});
$('[data-toggle="popover"]').popover();
