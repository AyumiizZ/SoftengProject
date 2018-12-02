$(document).ready(function () {

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

  var render = function(data){
    console.log(data)
    console.log($(".search-result-list"))
    $(".result-amount").html(data.length + " Result")
    // $(".search-result-list").html("");
    res = ""
    for(i = 0; i < data.length;i++){
      res += `<div class="search-result-item">
      <div class="project-tile">
        <figure class="info-card-iconBox"><span class="Icon">
            <fl-icon name="ui-fixed-project"><svg class="Icon-image" width="24" height="24" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path d="M0 15.5v1c0 1.103.897 2 2 2h9v2H7v2h10v-2h-4v-2h9c1.103 0 2-.897 2-2v-1H0zm24-1v-11c0-1.103-.897-2-2-2H2c-1.103 0-2 .897-2 2v11h24z"
                  fill="#0087E0"></path>
              </svg></fl-icon>
          </span></figure>
        <div class="info-card-inner">
          <h2 class="info-card-title">Build me a website</h2>
          <p class="info-card-description">I need website for my upcoming project For that I need expert freelancer</p>
          <div class="info-card-grid">
            <div class="info-card-details info-card-grid-item"><img src="/svgs/solid/hourglass-start.svg" width="16" height="16"
                alt=""><time>2018-12-02 01:45:42</time></div>
            <div class="info-card-details info-card-grid-item"><img src="/svgs/solid/user.svg" width="16" height="16" alt=""><span>JetFree</span></div>
            <div class="info-card-details info-card-grid-item info-card-skills-container"><img src="/svgs/solid/tags.svg"
                width="16" height="16" alt="">
              <div class="btn btn-outline-secondary btn-sm" style="padding: 0px 3px; margin-right: 3px">Graphic Design</div>
              <div class="btn btn-outline-secondary btn-sm" style="padding: 0px 3px; margin-right: 3px">HTML</div>
              <div class="btn btn-outline-secondary btn-sm" style="padding: 0px 3px; margin-right: 3px">PHP</div>
              <div class="btn btn-outline-secondary btn-sm" style="padding: 0px 3px; margin-right: 3px">Website Design</div>
              <div class="btn btn-outline-secondary btn-sm" style="padding: 0px 3px; margin-right: 3px">WordPress</div><span></span>
            </div>
          </div>
        </div>
        <div class="info-card-rate">
          <div class="info-card-price"><span>7500</span></div>
          <div class="info-card-price-type"><span>THB</span></div>
        </div>
      </div>
    </div>`
    }
    $(".search-result-list").html(res);
    // $(".search-result-list")[0].append("<li>");
    // for(var i=0; i<data.length; i++){
    //   $(".search-result-list")[0].append(data[i].job);
    // }
    // $(".search-result-list")[0].append("</li>");
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
      if(key === 188)
        tags.push(input.value.substring(0,input.value.length-1))
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
  $('a#sort-type').click(function(){
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