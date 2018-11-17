
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('jobs_tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('jobs_tags').insert([
        {
          job_id: 1,
          tag: 'Graphic Design'
        },
        {
          job_id: 1,
          tag: 'HTML'
        },
        {
          job_id: 1,
          tag: 'PHP'
        },
        {
          job_id: 1,
          tag: 'Website Design'
        },
        {
          job_id: 1,
          tag: 'WordPress'
        },
        {
          job_id: 2,
          tag: 'C Programming'
        },
        {
          job_id: 2,
          tag: 'C++ Programming'
        },
        {
          job_id: 2,
          tag: 'Linux'
        },
        {
          job_id: 2,
          tag: 'Python'
        },
        {
          job_id: 2,
          tag: 'Software Architecture'
        },
        {
          job_id: 3,
          tag: 'Graphic Design'
        },
        {
          job_id: 3,
          tag: 'HTML'
        },
        {
          job_id: 3,
          tag: 'PHP'
        },
        {
          job_id: 3,
          tag: 'Website Design'
        },
        {
          job_id: 3,
          tag: 'WordPress'
        },
        {
          job_id: 4,
          tag: 'CSS'
        },
        {
          job_id: 4,
          tag: 'HTML'
        },
        {
          job_id: 4,
          tag: 'Javascript'
        },
        {
          job_id: 4,
          tag: 'PHP'
        },
        {
          job_id: 4,
          tag: 'Website Design'
        },
        {
          job_id: 5,
          tag: 'Django'
        },
        {
          job_id: 5,
          tag: 'PHP'
        },
        {
          job_id: 5,
          tag: 'Python'
        },
        {
          job_id: 5,
          tag: 'Software Architecture'
        },
        {
          job_id: 5,
          tag: 'Web Scraping'
        },
        {
          job_id: 6,
          tag: 'Angular.js'
        },
        {
          job_id: 6,
          tag: 'Express JS'
        },
        {
          job_id: 6,
          tag: 'Javascript'
        },
        {
          job_id: 6,
          tag: 'node.js'
        },
        {
          job_id: 6,
          tag: 'NoSQL Couch & Mongo'
        }
      ]);
    });
};
