$(document).ready(function () {
    // var skill_len = 0
    var skill_arr = [];
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
        // var s = document.getElementById("skills").getElementsByClassName("input-tag");
        var skills = $('#skills .input-tag') 
        // console.log(skills)
        for (i=0;i<skills.length;i++){
            console.log(skills[i].innerText.substring(0,skills[i].innerText.length-1))
            // console.log(skills[i].length)
        }
        // console.log($('#skills .input-tag')[0].innerText.substring(0,3))
        // $('.skills').each(function(){
        //     var skill = $(this);
        //     console.log(skill)
        // });
        // // console.log(skill_arr)
    }, 100);

});