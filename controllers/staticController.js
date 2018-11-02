exports.feesAndCharges = function(req, res, next) {
  let title = "Fees and Charges, Earn and Save More! | JetFree by JainsBret";
  res.render("static/feesandcharges", {
    title: title
  });
};
