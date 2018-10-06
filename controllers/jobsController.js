const Job = require("../models/job");

exports.view = async function(req, res, next) {
  console.log(req.params.jobId);
  const job = await Job.query().findById(req.params.jobId);
  res.json(job);
};
