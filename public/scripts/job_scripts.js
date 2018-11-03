$(document).ready(function () {
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
        $('.skills').each(function(){
            var skill = $(this);
            console.log(skill)
        });
        // console.log(skill_arr)
    }, 100);

});