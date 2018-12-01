const User = require("../models/user");
const Job = require("../models/job");
const JobInterest = require("../models/jobInterest");
const Tag = require('../models/jobTag');

function redirectIfNotAuthenticated(req, res, next, userId) {
  if (userId != req.user.id) {
    res.status(403).render("errors/403");
  }
}

exports.redirectToBrowse = function(req, res, next) {
  res.redirect(req.baseUrl + "/browse");
};

exports.browsePost = async function(req, res, next) {
  console.log(req.body)
  // JSON SENT FROM FRONT-END ////////
  // var ret_json = req.body

  // var ret = JSON.parse(ret_json);
  // var filter_tag = {tag: []}
  // filter_tag.tag = ret.skills;
  // filter_tag = JSON.stringify(filter_tag)

  // console.log(filter_tag);

  // var user_skills = await Tag.query()
  //   .groupBy('tag');

  // var user_lang = ["Thai", "English"];

  // const jobs = await Job.query()
  // .joinRelation('tags')
  // .groupBy('id')
  // .where(subquery => {
  //   subquery
  //   .where('tag', 'in', ret.tag)
  // })
  // .where(subquery => {
  //   subquery.where('fixed', '=', ret.fix).whereBetween('price', [ret.min_fix, ret.max_fix])
  //   .orWhere('hourly', '=', ret.hour).whereBetween('price', [ret.min_hour, ret.max_hour])
  // })
  // .eager('tags')
  // .orderBy("created_at", 'desc');

  var user_skills = ["PHP", "Python", "MySQL", "Linux", "JavaScript"]
  var user_lang = ["Thai","English"]
  
  const jobs = await Job.query();
  const n_results = jobs.length

  let title = "Browse | JetFree by JainsBret";
  res.render("jobs/browse", {
    title: title,
    jobs: jobs,
    skills: user_skills,
    lang: user_lang,
    n_results: n_results
  });
};

exports.browseGet = async function(req, res, next) {
  // JSON SENT FROM FRONT-END ////////
  const temp = {
    "fix":1,
    "hour":1,
    "tag":["Python"],
    "langs":["Thai","English"],
    "min_fix": 0,
    "max_fix":1000000,
    "min_hour":0,
    "max_hour":10000,
    "sort":"Lowest Price"
  }
  var ret_json = JSON.stringify(temp)
  ////////////////////////////////////

  var ret = JSON.parse(ret_json);
  var filter_tag = {tag: []}
  filter_tag.tag = ret.tag;
  filter_tag = JSON.stringify(filter_tag)

  console.log(filter_tag);

  var user_skills = await Tag.query()
    .groupBy('tag');

  var user_lang = ["Thai", "English"];

  const jobs = await Job.query()
  .joinRelation('tags')
  .groupBy('id')
  .where(subquery => {
    subquery
    .where('tag', 'in', ret.tag)
  })
  .where(subquery => {
    subquery.where('fixed', '=', ret.fix).whereBetween('price', [ret.min_fix, ret.max_fix])
    .orWhere('hourly', '=', ret.hour).whereBetween('price', [ret.min_hour, ret.max_hour])
  })
  .eager('tags')
  .orderBy("created_at", 'desc');
  var n_results = jobs.length

  let title = "Browse | JetFree by JainsBret";
  res.render("jobs/browse", {
    title: title,
    jobs: jobs,
    skills: user_skills,
    lang: user_lang,
    n_results: n_results
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
