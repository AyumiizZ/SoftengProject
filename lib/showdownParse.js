var xss = require("xss");
var showdown = require("showdown"),
  converter = new showdown.Converter({
    headerLevelStart: 3
  });

function parse(md) {
  var sanitized = xss(md);
  return converter.makeHtml(sanitized);
}
module.exports = parse;
