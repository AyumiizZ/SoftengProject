const User = require("../models/user");
const Job = require("../models/job");
const JobInterest = require("../models/jobInterest");
const Tag = require("../models/jobTag");
const JobBoost = require("../models/jobBoost");
const moment = require("moment");
const omise = require("omise")({
  secretKey: process.env.OMISE_SECRET,
  omiseVersion: "2017-11-02"
});

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
  var ret = req.body

  let jobs = Job.query()
      .joinRelation('tags')
      .groupBy('id');
  
  console.log(ret.fixed.min)
  if (ret.fixed.checked && ret.hourly.checked) {
    jobs.where('fixed', '=', 1).whereBetween('price', [ret.fixed.min, ret.fixed.max])
    .orWhere('hourly', '=', 1).whereBetween('price', [ret.hourly.min, ret.hourly.max])
  }
  else if (ret.fix && !ret.hourly) {
    jobs.where('fixed', '=', 1).whereBetween('price', [ret.fixed.min, ret.fixed.max])
  }
  else if (!ret.fix && ret.hourly) {
    jobs.where('hourly', '=', 1).whereBetween('price', [ret.hourly.min, ret.hourly.max])
  }
  if (ret.skills.length > 0) {
    jobs.where('tag', 'in', ret.skills)
  }
  if (ret.sort == 'Lastest') {
    jobs.orderBy('created_at', 'desc')
  }
  else if (ret.sort == 'Oldest') {
    jobs.orderBy('created_at', 'increase')
  }
  else if (ret.sort == 'Lowest Price') {
    jobs.orderBy('price', 'increase')
  }
  else if (ret.sort == 'Highest Price') {
    jobs.orderBy('price', 'desc')
  }
  jobs = jobs.eager('[client, tags, freelance, freelance_interests]')
  console.log(await jobs);
  var user_skills = ["PHP", "Python", "MySQL", "Linux", "JavaScript"]
  var user_lang = ["Thai","English"]

  // const n_results = jobs.length

  let title = "Browse | JetFree by JainsBret";
  res.json(await jobs);
  // res.render("jobs/browse", {
  //   title: title,
  //   jobs: await jobs,
  //   skills: user_skills,
  //   lang: user_lang,
  //   n_results: n_results
  // });
};

exports.browseGet = async function(req, res, next) {
  // JSON SENT FROM FRONT-END ////////
  // const temp = {
  //   'sort': 'Highest Price',
  //   'fixed': {
  //     'checked': false,
  //     'min': 0,
  //     'max': 1000000
  //   },
  //   'hourly': {
  //     'checked': false,
  //     'min': 0,
  //     'max': 1000000
  //   },
  //   'skills': ['Python'],
  //   'langs': ['Thai', 'English']
  // }
  // var ret_json = JSON.stringify(temp)
  ///////////////////////////////////
  //
  // console.log('REQ: ' + req);
  //
  // var ret = JSON.parse(ret_json);
  var user_lang = ["Thai", "English"];
  // let jobs = Job.query()
  //     .joinRelation('tags')
  //     .groupBy('id');
  //
  // if (ret.fixed.checked && ret.hourly.checked) {
  //   jobs.where('fixed', '=', 1).whereBetween('price', [ret.min_fix, ret.max_fix])
  //   .orWhere('hourly', '=', 1).whereBetween('price', [ret.min_hour, ret.max_hour])
  // }
  // else if (ret.fix && !ret.hourly) {
  //   jobs.where('fixed', '=', 1).whereBetween('price', [ret.min_fix, ret.max_fix])
  // }
  // else if (!ret.fix && ret.hourly) {
  //   jobs.where('hourly', '=', 1).whereBetween('price', [ret.min_fix, ret.max_fix])
  // }
  // if (ret.skills.length > 0) {
  //   jobs.where('tag', 'in', ret.skills)
  // }
  // if (ret.sort == 'Lastest') {
  //   jobs.orderBy('created_at', 'desc')
  // }
  // else if (ret.sort == 'Oldest') {
  //   jobs.orderBy('created_at', 'increase')
  // }
  // else if (ret.sort == 'Lowest Price') {
  //   jobs.orderBy('price', 'increase')
  // }
  // else if (ret.sort == 'Highest Price') {
  //   jobs.orderBy('price', 'desc')
  // }

  let jobs = await Job.query().eager('[tags, freelance_interests, client, freelance]')
  // console.log(jobs);
  let n_results = jobs.length;
  // console.log(jobs.freelance_interests);
  //console.log(n_results);

  let title = "Browse | JetFree by JainsBret";
  res.render("jobs/browse", {
    title: title,
    jobs: await jobs,
    lang: user_lang,
    skills: {},
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
  console.log(req.body);
  req.body.client_id = req.user.id;
  const tagsText = req.body.tags.split(",");
  delete req.body.tags;
  delete req.body.deleted;
  delete req.body.job_type;
  console.log(req.body);
  const job = await Job.query().insert(req.body);
  for(var i = 0; i < tagsText.length; i++) {
    const tag = {
      job_id: job.id,
      tag: tagsText[i]
    };
    const tags = await Tag.query().insert(tag);
  }
  res.redirect("/jobs/view/" + job.id);
};

exports.editGet = async function(req, res, next) {
  const job = await Job.query().findById(req.params.jobId).eager("tags");
  redirectIfNotAuthenticated(req, res, next, job.client_id);
  console.log(job);
  let title = "Jobs | JetFree by JainsBret";
  res.render("jobs/addedit", {
    title: title,
    h1_title: "แก้ไขประกาศงาน",
    job: job,
    tags: job.tags,
  });
};

exports.editPost = async function(req, res, next) {
  const newTags = req.body.tags.split(",");
  const job = await Job.query().findById(req.params.jobId);
  redirectIfNotAuthenticated(req, res, next, job.client_id);

  if(req.body.deleted || newTags != "") {
    const oldTags = await Tag.query().where("job_id", job.id).del();
    for(var i = 0; i < newTags.length; i++) {
      const tag = {
        job_id: job.id,
        tag: newTags[i]
      };
      const updatedTag = await Tag.query().insert(tag);
    }
  }
  delete req.body.tags;
  delete req.body.deleted;
  delete req.body.job_type;
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
  res.render("jobs/payBoost", {
    boost: boost
  });
};

exports.payBoostPost = async function(req, res, next) {
  var boost = await JobBoost.query().findById(req.params.boostId);
  omise.charges.create(
    {
      description: "JainsBret charge for boost #" + boost.id,
      amount: boost.total_price * 100,
      currency: "thb",
      capture: true,
      card: req.body.token
    },
    async function(err, resp) {
      if (err) {
        res.json(err);
      } else {
        var paymentData = {
          payment_success: resp.status == "successful",
          omise_id: resp.id,
          omise_transaction: resp.transaction,
          paid_at: new Date(resp.paid_at),
          card_number: resp.card.last_digits,
          card_issuer: resp.card.brand
        };
        var boost = await JobBoost.query().patchAndFetchById(
          req.params.boostId,
          paymentData
        );
        res.redirect(req.protocol + "://" + req.get("host") + req.originalUrl);
      }
    }
  );
};
