$("#cardnumber").mask("0000 0000 0000 0000");
$("#cvc").mask("000", {
  placeholder: "000"
});
$("#expire").mask("00/00", {
  placeholder: "MM/YY"
});
$('[data-toggle="popover"]').popover();

Omise.setPublicKey("#{process.env.OMISE_KEY}");

var cardForm = $("#card-form");

function submitCardForm(e) {
  e.preventDefault();
  $("#card-form .form-control").prop("disabled", true);
  $("#card-form button").prop("disabled", true);
  $("#loader").prop("hidden", false);
  var expiry = $("#expire")
    .val()
    .match(/[0-9]{2}/g);
  var cardData = {
    name: $("#name").val(),
    number: $("#cardnumber").cleanVal(),
    expiration_month: expiry[0],
    expiration_year: "20" + expiry[1],
    security_code: $("#cvc").val()
  };
  Omise.createToken("card", cardData, function(statusCode, response) {
    if (statusCode == 200) {
      console.log(response);
      $("#pay-form #card-id").val(response.id);
      $("#pay-form").submit();
    } else {
      $("#error")
        .slideDown(300)
        .delay(3000)
        .slideUp(300);
      $("#card-form .form-control").prop("disabled", false);
      $("#card-form button").prop("disabled", false);
      $("#loader").prop("hidden", true);
    }
  });
}
cardForm.on("submit", submitCardForm);
