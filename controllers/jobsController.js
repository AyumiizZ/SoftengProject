const Job = require("../models/job");
const JobInterest = require("../models/jobInterest");

exports.view = async function(req, res, next) {
  console.log(req.params.jobId);
  const job = await Job.query()
    .findById(req.params.jobId)
    .eager("[client, freelance]");
  //res.json(job);
  res.render("jobs/add", { job: job });
};

exports.interestedGet = async function(req, res, next) {
  const job = await Job.query()
    .findById(req.params.jobId)
    .eager("[client, freelance]");
  res.render("jobs/interested", { job: job });
};

exports.interestedPost = async function(req, res, next) {
  const currentUsername = req.user.username;
  const jobId = req.params.jobId;
  var data = {
    user_username: currentUsername,
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
  res.json(data);
};
