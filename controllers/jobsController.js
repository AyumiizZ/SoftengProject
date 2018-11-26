const User = require("../models/user");
const Job = require("../models/job");
const JobInterest = require("../models/jobInterest");
const JobBoost = require("../models/jobBoost");
const moment = require("moment");

function redirectIfNotAuthenticated(req, res, next, userId) {
  if (userId != req.user.id) {
    res.status(403).render("errors/403");
  }
}

exports.redirectToBrowse = function(req, res, next) {
  res.redirect(req.baseUrl + "/browse");
};

exports.browse = async function(req, res, next) {
  var user_skills = ["PHP", "Python", "MySQL", "Linux", "JavaScript"];
  var user_lang = ["Thai", "English"];
  const jobs = await Job.query().eager("[client, freelance, tags]");

  let title = "Projects | JetFree by JainsBret";
  res.render("jobs/browse", {
    title: title,
    jobs: jobs,
    n_results: jobs.length,
    skills: user_skills,
    lang: user_lang
  });
};

exports.view = async function(req, res, next) {
  const job = await Job.query()
    .findById(req.params.jobId)
    .eager("[client, freelance, freelance_interests]");
  console.log(job);
  res.render("jobs/view", {
    title: job.job + " | JetFree by JainsBret",
    job: job,
    interestCount: job.freelance_interests.length,
    query: req.query
  });
};

exports.addGet = function(req, res) {
  let title = "Add job | JetFree by JainsBret";
  res.render("jobs/addedit", {
    title: title,
    h1_title: "ลงประกาศงาน"
  });
};

exports.addPost = async function(req, res, next) {
  console.log(req.user);
  req.body.client_id = req.user.id;
  const job = await Job.query().insert(req.body);
  res.redirect("/jobs/view/" + job.id);
};

exports.editGet = async function(req, res, next) {
  const job = await Job.query().findById(req.params.jobId);
  redirectIfNotAuthenticated(req, res, next, job.client_id);
  let title = "Jobs | JetFree by JainsBret";
  res.render("jobs/addedit", {
    title: title,
    h1_title: "แก้ไขประกาศงาน",
    job: job
  });
};

exports.editPost = async function(req, res, next) {
  const job = await Job.query().findById(req.params.jobId);
  redirectIfNotAuthenticated(req, res, next, job.client_id);
  const updatedJob = await Job.query().updateAndFetchById(
    req.params.jobId,
    req.body
  );
  res.redirect("/jobs/view/" + updatedJob.id);
};

exports.interestedGet = async function(req, res, next) {
  let title = "Jobs | JetFree by JainsBret";
  const job = await Job.query()
    .findById(req.params.jobId)
    .eager("[client, freelance]");
  res.render("jobs/interested", {
    title: title,
    job: job
  });
};

exports.interestedPost = async function(req, res, next) {
  const currentUserId = req.user.id;
  const jobId = req.params.jobId;
  var data = {
    user_id: currentUserId,
    job_id: jobId,
    message: req.body.message
  };
  try {
    const newJobInterest = await JobInterest.query().insert(data);
  } catch (err) {
    var updatedJobInterest = await JobInterest.query().updateAndFetchById(
      [jobId, currentUsername],
      data
    );
  }
  console.log("completed!");
  res.redirect("/jobs/view/" + jobId + "?saveinterested=true");
};

exports.showInterestsGet = async function(req, res, next) {
  let user = await User.query()
    .where("username", req.user.username)
    .first();
  let title = "Jobs | JetFree by JainsBret";
  console.log(req.params.jobId);
  const job = await Job.query()
    .findById(req.params.jobId)
    .eager("freelance_interests");
  res.render("jobs/showInterests", {
    user: user,
    title: title,
    job: job
  });
};

exports.showInterestsPost = async function(req, res, next) {
  let jobId = req.params.jobId;
  const updatedFreelance = await Job.query().updateAndFetchById(
    jobId,
    req.body
  );
  console.log("success!");
  res.redirect("/jobs/view/" + jobId);
};

exports.boostGet = async function(req, res, next) {
  const job = await Job.query().findById(req.params.jobId);
  redirectIfNotAuthenticated(req, res, next, job.client_id);
  res.render("jobs/createBoost", {
    title: job.job + " | JetFree by JainsBret",
    job: job
  });
};

exports.boostPost = async function(req, res, next) {
  var regex = /\d{2}\/\d{2}\/\d{4}/g;
  var dates = req.body.time.match(regex);
  var startDate = moment(dates[0], "DD/MM/YYYY");
  var endDate = moment(dates[1], "DD/MM/YYYY");
  var job_data = {
    job_id: req.params.jobId,
    start: moment(startDate).format("YYYY-MM-DD"),
    end: moment(endDate).format("YYYY-MM-DD"),
    price: req.body.price
  };
  var jobBoost = await JobBoost.query().insert(job_data);
  res.redirect("/jobs/boost/" + jobBoost.job_id + "/" + jobBoost.id + "/pay");
};

exports.boostList = async function(req, res, next) {
  var job = await Job.query()
    .findById(req.params.jobId)
    .eager("boosts");
  console.log(job);
  res.render("jobs/boostsList", {
    job: job
  });
};

exports.payBoostGet = async function(req, res, next) {
  var boost = await JobBoost.query().findById(req.params.boostId);
  res.json(boost);
};
