$(document).ready(function () {
  // var sent_query = $(function () {
  //   var data = get_query()
  //   $.ajax({
  //     type: "POST",
  //     data: data,
  //     url: "/jobs/browse",
  //     contentType: "application/json"
  //   });
  // });

  var sent_ = function () {
    get_query()
  }

  var delete_tag = function () {
    $(this).remove()
    get_query()
  }

  var delete_all_tag = function (id) {
    var tag_box = $('#' + id + ' .input-tag')
    for (i = 0; i < tag_box.length; i++) {
      tag_box[i].remove()
    }
  }

  var add_tag = function (input, id) {
    var tags = get_tag(id)
    var res = ""
    if (tags.indexOf(input.value) === -1) {
      tags.push(input.value)
    }
    for (i = 0; i < tags.length; i++) {
      res += "<div class='input-tag'>" + tags[i] + "<div class='delete-tag' id='" + tags[i] + "'>×</div></div>"
    }
    res += "<input id='skill-input' type='text' placeholder='Select Skill'>"
    input.parentNode.innerHTML = res
    input.value = ''
    $('.input-tag').click(delete_tag)
    $('.filter-tag-input input').on('keyup', function (event) {
      event.preventDefault();
      key = event.keyCode;
      id = this.parentNode.id
      input = this.value
      if (key === 13 && (id === "langs" || id === "skills") && (input != 0 || input === "0")) {
        add_tag(this, id)
      }
    });
  }

  $('#min-fix').on('keyup', sent_);
  $('#min-hour').on('keyup', sent_);
  $('#max-fix').on('keyup', sent_);
  $('#max-hour').on('keyup', sent_);

  // $('#lang-input').on('keyup', function(event){
  //   event.preventDefault();
  //   if (event.keyCode === 13) {
  //     add_tag($('#lang-input')[0], 'lang')
  //   }
  // });

  $('.filter-tag-input input').on('keyup', function (event) {
    event.preventDefault();
    key = event.keyCode;
    id = this.parentNode.id
    input = this.value
    if (key === 13 && (id === "langs" || id === "skills") && (input != 0 || input === "0")) {
      add_tag(this, id)
    }
  });

  fix.onchange = sent_
  hour.onchange = sent_
  // del_tag = delete_tag(element)
  $('.input-tag').click(delete_tag)
  $('#clear-skill').click(function () {
    delete_all_tag('skills')
  })
  $('#clear-lang').click(function () {
    delete_all_tag('langs')
  })
  console.log($('#sort-type'))
  console.log($('#clear-lang'))
  $('#sort-type').click(() => {
    console.log("click")
    var dropbtn = $('#sort-by');
    dropbtn[0].innerText = "Sort By " + $(this).innerText
    console.log(this)
  })

  // console.log($('#del_tag'))

  // sent_query()

  


});

function get_tag(id) {
  var arr = [];
  var inputs = $('#' + id + ' .input-tag');
  for (i = 0; i < inputs.length; i++) {
    arr.push(inputs[i].innerText.substring(0, inputs[i].innerText.length - 1));
  }
  return arr
}

function get_sort() {
  var dropbtn = $('#sort-by');
  return dropbtn[0].innerText.substring(8);
}

function get_int(id, Default) {
  var input = document.getElementById(id).value;
  if (parseInt(input) == input) {
    return parseInt(input)
  } else {
    return Default
  }
}

function get_query() {
  var sort = get_sort();
  var skill_arr = get_tag('skills');
  var lang_arr = get_tag('langs');
  var fixed_check = $("#fix").is(":checked");
  var fixed_min = get_int('min-fix', 0);
  var fixed_max = get_int('max-fix', 1000000);
  var hourly_check = $("#hour").is(":checked");
  var hourly_min = get_int('min-hour', 0);
  var hourly_max = get_int('max-hour', 100000);
  var ret = {
    sort: sort,
    fixed: {
      checked: fixed_check,
      min: fixed_min,
      max: fixed_max
    },
    hourly: {
      checked: hourly_check,
      min: hourly_min,
      max: hourly_max
    },
    skills: skill_arr,
    langs: lang_arr
  }
  console.log(JSON.stringify(ret))
  return JSON.stringify(ret)
}





// function change_sort(element) {
//   var dropbtn = $('#sort-by');
//   dropbtn[0].innerText = "Sort By " + element.innerText
//   sent_query()
// }


// function add_tag(input, id) {
//   if (input.value != '') {
//     var tag = "<div class='input-tag'>" + input.value + "<div class='delete-tag' id='" + input.value + "'>×</div></div>"
//     var input_tag = $('#' + id + ' .input-tag');
//     var input_arr = get_tag(id + 's');
//     if (input_arr.indexOf(input.value) === -1) {
//       if (langs.length > 0)
//         $(tag).insertAfter(input_tag[input_tag.length - 1])
//       else
//         $(tag).insertBefore(input);
//       sent_query()
//     }
//     input.value = ''
//   }
// }

// var lang_input = document.getElementById("lang-input");
// lang_input.addEventListener("keyup", function (event) {
//   event.preventDefault();
//   if (event.keyCode === 13) {
//     add_tag(lang_input, 'lang')
//   }
// });

// var skill_input = document.getElementById("skill-input");
// skill_input.addEventListener("keyup", function (event) {
//   event.preventDefault();
//   if (event.keyCode === 13) {
//     add_tag(skill_input, 'skill')
//   }
// });