$(document).ready(function () {
  setInterval(() => {
    var skills = $('#skills .input-tag');
    var langs = $('#langs .input-tag');
    var skill_arr = [];
    var lang_arr = [];
    var fix = $("#fix").is(":checked");
    var hour = $("#hour").is(":checked")
    for (i = 0; i < skills.length; i++) {
      skill_arr.push(skills[i].innerText.substring(0, skills[i].innerText.length - 1));
    }
    for (i = 0; i < langs.length; i++) {
      lang_arr.push(langs[i].innerText.substring(0, langs[i].innerText.length - 1));
    }
    var ret = {
      'fix': fix,
      'hour': hour,
      'skills': skill_arr,
      'langs': lang_arr,
      'min_fix': 0,
      'max_fix': 1000000,
      'min_hour': 0,
      'max_hour': 10000,
      'sort': 'date'
    }
    var ret_json = JSON.stringify(ret)
    console.log(ret_json)
  }, 100);

});