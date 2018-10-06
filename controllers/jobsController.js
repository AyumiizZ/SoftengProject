const Job = require("../models/job");

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
