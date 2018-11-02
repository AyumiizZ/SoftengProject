var express = require("express");
var router = express.Router();

const Job = require("../models/job");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.redirect("/search/projects");
});

router.get("/projects", async function(req, res, next) {
  var user_skills = ["PHP", "Python", "MySQL", "Linux", "JavaScript"];
  var user_lang = ["Thai", "English"];
  const jobs = await Job.query();
  // var jobs = [{id:1,job:'test',job_info:'Lorem',job_type:'Hourly',tag:'Python',price:500},{id:2,job:'test2',job_info:'Lorem2',job_type:'Fixed',tag:'PHP',price:7500}]
  let title = "Projects | JetFree by JainsBret";
  res.render("jobs/browse", {
    title: title,
    jobs: jobs,
    n_results: jobs.length,
    skills: user_skills,
    lang: user_lang
  });
});

module.exports = router;
