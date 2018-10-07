const Job = require("../models/job");
const JobInterest = require("../models/jobInterest");

exports.view = async function (req, res, next) {
  const job = await Job.query()
    .findById(req.params.jobId)
    .eager("[client, freelance, freelance_interests]");
  console.log(job);
  //res.json(job);
  let title = 'Jobs | JetFree by JainsBret'
  res.render("jobs/view", {
    title: title,
    job: job,
    interestCount: job.freelance_interests.length,
    query: req.query
  });
};

exports.interestedGet = async function (req, res, next) {
  let title = 'Jobs | JetFree by JainsBret'
  const job = await Job.query()
    .findById(req.params.jobId)
    .eager("[client, freelance]");
  res.render("jobs/interested", {
    title: title,
    job: job
  });
};

exports.interestedPost = async function (req, res, next) {
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

exports.showInterests = async function (req, res, next) {
  let title = 'Jobs | JetFree by JainsBret'
  console.log(req.params.jobId);
  const job = await Job.query()
    .findById(req.params.jobId)
    .eager("freelance_interests");
  res.render("jobs/showInterests", {
    title: title,
    job: job
  });
};

exports.addPost = async function (req, res, next) {
  console.log(req.user);
  req.body.client_id = req.user.id;
  const job = await Job.query().insert(req.body);
  res.redirect("/jobs/view/" + job.id);
};