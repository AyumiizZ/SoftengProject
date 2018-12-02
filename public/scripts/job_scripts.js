// import TimeAgo from 'javascript-time-ago'
// import en from 'javascript-time-ago/locale/en'
$(document).ready(function () {
  console.log(Date.now())
  var sent_query = function () {
    $(function () {
      var data = get_query();
      $.ajax({
        type: "POST",
        data: data,
        url: "/jobs/browse",
        contentType: "application/json"
      }).done((data) => {
        render(data);
      });
    });
  }

  var render = function (data) {
    console.log(data)
    var fixed_icon = `<figure class="info-card-iconBox">
        <span class="Icon">
          <fl-icon name="ui-fixed-project">
            <svg class="Icon-image" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M0 15.5v1c0 1.103.897 2 2 2h9v2H7v2h10v-2h-4v-2h9c1.103 0 2-.897 2-2v-1H0zm24-1v-11c0-1.103-.897-2-2-2H2c-1.103 0-2 .897-2 2v11h24z"
                fill="#0087E0">
              </path>
            </svg>
          </fl-icon>
        </span>
      </figure>`
    var hourly_icon = `<figure class="info-card-iconBox">
      <span class="Icon">
        <fl-icon name="ui-hourly-project">
          <svg class="Icon-image" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 0C5.384 0 0 5.384 0 12s5.384 12 12 12 12-5.384 12-12S18.616 0 12 0zm3.26 15.776l-4.593-3.063v-7.38h2.666v5.954l3.407 2.27-1.48 2.219z"
              fill="#0087E0"></path>
          </svg>
        </fl-icon>
      </span>
    </figure>`

    $(".result-amount").html(data.length + " Result")
    res = ""
    for (i = 0; i < data.length; i++) {
      res += `<li>
        <a class="search-result-link" href='/jobs/view/` + data[i].id + `' target='_blank'>
          <div class="search-result-item">
            <div class="project-tile">`

      if (data[i].fixed == 1) {
        res += fixed_icon
      } else if (data[i].hourly == 1) {
        res += hourly_icon
      } else {
        console.log('Fixed Hourly column bug')
      }
      res += `<div class="info-card-inner">
          <h2 class="info-card-title">` + data[i].job + `</h2>
          <p class="info-card-description">` + data[i].job_info + `</p>
          <div class="info-card-grid">
            <div class="info-card-details info-card-grid-item">
              <img src="/svgs/solid/hourglass-start.svg" width="16" height="16" alt="">
                <time>` + data[i].created_at + `</time>
            </div>
            <div class="info-card-details info-card-grid-item"><img src="/svgs/solid/user.svg" width="16" height="16" alt="">
            <span>`
      if (data[i].freelance == null || data[i].freelance == 0) {
        res += `<span class='open'>Open</span>`
      } else {
        res += data[i].freelance.name
      }
      res += `</span>
            </div>
            <div class="info-card-details info-card-grid-item info-card-skills-container"><img src="/svgs/solid/tags.svg"
                width="16" height="16" alt="">`
      if (data[i].tags == null || data[i].tags == 0) {
        res += `No tag`
      } else {
        for (j = 0; j < data[i].tags.length; j++) {
          res += `<div class="btn btn-outline-secondary btn-sm" style="padding: 0px 3px; margin-right: 3px">` + data[i].tags[j].tag + `</div>`
        }
      }
      res += `</div>
          </div>
        </div>
        <div class="info-card-rate">
          <div class="info-card-price"><span>` + data[i].price + `</span></div>
          <div class="info-card-price-type">`
      if (data[i].fixed == 1) {
        res += `<span>THB</span>`
      } else if (data[i].hourly == 1) {
        res += `<span>THB per hour</span>`
      } else {

      }

      res += `</div>
        </div>
      </div>
    </div>
    </li>`
    }
    $(".search-result-list").html(res);
  }

  var delete_tag = function () {
    $(this).remove()
    $(function () {
      var data = get_query()
      $.ajax({
        type: "POST",
        data: data,
        url: "/jobs/browse",
        contentType: "application/json"
      }).done((data) => {
        render(data);
      });
    });
  }

  var delete_all_tag = function (id) {
    var tag_box = $('#' + id + ' .input-tag')
    for (i = 0; i < tag_box.length; i++) {
      tag_box[i].remove()
    }
    $(function () {
      var data = get_query()
      $.ajax({
        type: "POST",
        data: data,
        url: "/jobs/browse",
        contentType: "application/json"
      }).done((data) => {
        render(data);
      });
    });
  }

  var add_tag = function (input, id, key) {
    var tags = get_tag(id)
    var res = ""
    if (tags.indexOf(input.value) === -1) {
      if (key === 188)
        tags.push(input.value.substring(0, input.value.length - 1))
      else
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
      if ((key === 13 || key === 188) && (id === "langs" || id === "skills") && (input != 0 || input === "0")) {
        add_tag(this, id)
      }
    });
    $(function () {
      var data = get_query()
      $.ajax({
        type: "POST",
        data: data,
        url: "/jobs/browse",
        contentType: "application/json"
      }).done((data) => {
        render(data);
      });
    });
  }

  $('#min-fix,#max-fix,#min-hour,#max-hour').on('keyup', sent_query);

  $('.filter-tag-input input').on('keyup', function (event) {
    event.preventDefault();
    key = event.keyCode;
    id = this.parentNode.id
    input = this.value
    if ((key === 13 || key === 188) && (id === "langs" || id === "skills") && (input != 0 || input === "0")) {
      add_tag(this, id, key)
    }
  });

  fix.onchange = sent_query
  hour.onchange = sent_query
  $('.input-tag').click(delete_tag)
  $('#clear-skill').click(function () {
    delete_all_tag('skills')
  })
  $('#clear-lang').click(function () {
    delete_all_tag('langs')
  })
  $('a#sort-type').click(function () {
    var dropbtn = $('#sort-by');
    dropbtn[0].innerText = "Sort By " + $(this)[0].innerText
    $(function () {
      var data = get_query()
      $.ajax({
        type: "POST",
        data: data,
        url: "/jobs/browse",
        contentType: "application/json"
      }).done((data) => {
        render(data);
      });
    });
  })


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
  console.log(ret)
  return JSON.stringify(ret)
}


// function change_sort(element) {
//   var dropbtn = $('#sort-by');
//   dropbtn[0].innerText = "Sort By " + element.innerText
//   sent_query()
// }

// $('a').click(function(){
//   console.log("click")
//   var dropbtn = $('#sort-by');
//   dropbtn[0].innerText = "Sort By " + $(this)[0].innerText
// })

// $( "p" ).click(function() {
//   $( this ).slideUp();
//   console.log(this)
// });