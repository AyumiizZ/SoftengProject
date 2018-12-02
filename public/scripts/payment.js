var valid = require("card-validator");

$("#cardnumber").mask("0000 0000 0000 0000");
$("#cvc").mask("000", {
  placeholder: "000"
});
$("#expire").mask("00/00", {
  placeholder: "MM/YY"
});
$('[data-toggle="popover"]').popover();

$("#cardnumber").keyup(function() {
  var number = $("#cardnumber").cleanVal();
  var numberValidation = valid.number(number);
  $("#credit-card-icon").removeClass();
  if (numberValidation.card != null) {
    var cardType = numberValidation.card.type;
    if (cardType == "visa") {
      $("#credit-card-icon")
        .addClass("fab")
        .addClass("fa-cc-visa");
    } else if (cardType == "mastercard") {
      $("#credit-card-icon")
        .addClass("fab")
        .addClass("fa-cc-mastercard");
    } else if (cardType == "jcb") {
      $("#credit-card-icon")
        .addClass("fab")
        .addClass("fa-cc-jcb");
    } else {
      $("#credit-card-icon")
        .addClass("far")
        .addClass("fa-credit-card");
    }
  } else {
    $("#credit-card-icon")
      .addClass("far")
      .addClass("fa-credit-card");
  }
  $("#credit-card-icon").addClass("fa-2x");
});

$("#cardnumber").change(function() {
  var number = $("#cardnumber").cleanVal();
  var numberValidation = valid.number(number);
  if (numberValidation.isValid) {
    $("#card-form button").attr("disabled", false);
    $("#cardnumber")
      .removeClass("is-invalid")
      .addClass("is-valid");
  } else {
    $("#card-form button").attr("disabled", true);
    $("#cardnumber")
      .addClass("is-invalid")
      .removeClass("is-valid");
  }
});
