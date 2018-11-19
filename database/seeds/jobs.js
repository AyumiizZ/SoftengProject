
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('jobs').del()
    .then(function () {
      // Inserts seed entries
      return knex('jobs').insert([
        {
          id: 1,
          job: 'Build me a website',
          job_info: 'I need website for my upcoming project For that I need expert freelancer',
          client_id: 1,
          user_id: 1,
          fixed: true,
          price: 7500
        },
        {
          id: 2,
          job: 'Python help',
          job_info: 'Python help. C, C++, networking experience is a plus. More in PM. Ongoing, small tasks.',
          client_id: 2,
          user_id: 2,
          hourly: true,
          price: 360
        },
        {
          id: 3,
          job: 'Build a Wordpress Theme',
          job_info: 'Create a cost-effective Wordpress Theme for a new website.',
          client_id: 3,
          user_id: 3,
          fixed: true,
          price: 2000
        },
        {
          id: 4,
          job: 'Ongoing Web projects!',
          job_info: 'I would like to interview you and see if you\'d be a good freelancer to work with,Any Web Devs/Front End Devs. Lets chat!',
          client_id: 4,
          user_id: 4,
          hourly: true,
          price: 300
        },
        {
          id: 5,
          job: 'Create web crawler, Python, Scrapy',
          job_info: 'Looking for web crawler expert who create crawler for one online shope in Python 3.X (scrapy)',
          client_id: 5,
          user_id: 5,
          fixed: true,
          price: 6000
        },
        {
          id: 6,
          job: 'React.js - node.js Long term remote job',
          job_info: 'Hi , we are looking for longterm Node/react developer. Must know react and node. Interviews will be condcuted via skype.',
          client_id: 6,
          user_id: 6,
          hourly: true,
          price: 1200
        }
      ]);
    });
};
