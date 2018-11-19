function get_tag(id){
  var arr = [];
  var inputs = $('#'+id+' .input-tag');
  for (i = 0; i < inputs.length; i++) {
    arr.push(inputs[i].innerText.substring(0, inputs[i].innerText.length - 1));
  }
  return arr
}


function sent_query() {
  var dropbtn = $('#sort-by');
  var sort = dropbtn[0].innerText.substring(8);
  var skill_arr = get_tag('skills');
  var lang_arr = get_tag('langs');
  var fix = $("#fix").is(":checked");
  var hour = $("#hour").is(":checked")
  var ret = {
    'fix': fix,
    'hour': hour,
    'skills': skill_arr,
    'langs': lang_arr,
    'min_fix': 0,
    'max_fix': 1000000,
    'min_hour': 0,
    'max_hour': 10000,
    'sort': sort
  }
  var ret_json = JSON.stringify(ret)
  console.log(ret_json)
}

function delete_tag(element) {
  element.parentNode.remove()
  sent_query()
}

function delete_all_tag(id) {
  var tag_box = $('#' + id + ' .input-tag')
  for (i = 0; i < tag_box.length; i++) {
    tag_box[i].remove()
  }
  sent_query()
}

function change_sort(element) {
  var dropbtn = $('#sort_by');
  dropbtn[0].innerText = "Sort By " + element.innerText
  sent_query()
}

function choose_this(){
  sent_query()
}


var lang_input = document.getElementById("lang-input");

lang_input.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    if (lang_input.value != '') {
      var tag = "<div class='input-tag'>" + lang_input.value + "<div class='delete-tag' onclick='delete_tag(this)'>×</div></div>"
      var langs = $('#langs .input-tag');
      if(langs.length > 0)
        $(tag).insertAfter(langs[langs.length - 1])
      else{
        var lang = $('#langs #lang-input');
        $(tag).insertBefore(lang);
      }
      // console.log(langs.innerHTML)
      lang_input.value = ''
      sent_query()
    }
  }
});

var skill_input = document.getElementById("skill-input");
skill_input.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    var skills = $('#skills .input-tag');
    if (skill_input.value != '') {
      var tag = "<div class='input-tag'>" + skill_input.value + "<div class='delete-tag' onclick='delete_tag(this)'>×</div></div>"
      $(tag).insertAfter(skills[skills.length - 1])
      skill_input.value = ''
      sent_query()
    }
  }
});