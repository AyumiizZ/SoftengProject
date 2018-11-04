$(document).ready(function () {
    // var skill_len = 0
    
    // setInterval(() => {
    //     if ($("#fix").is(":checked")) {
    //         console.log("fix checked")
    //     } else {
    //         console.log("fix not checked")
    //     }

    //     if ($("#hour").is(":checked")) {
    //         console.log("hour checked")
    //     } else {
    //         console.log("hour not checked")
    //     }
    // }, 100);

    setInterval(() => {
        var skills = $('#skills .input-tag') ;
        var langs = $('#langs .input-tag');
        var skill_arr = [];
        var lang_arr = [];
        for (i=0;i<skills.length;i++){
            skill_arr.push(skills[i].innerText.substring(0,skills[i].innerText.length-1));
        }
        for (i=0;i<langs.length;i++){
            lang_arr.push(langs[i].innerText.substring(0,langs[i].innerText.length-1));
        }
        console.log(skill_arr);
        console.log(lang_arr);
        var j = JSON.stringify(skills)
        console.log(j)
    }, 100);

});