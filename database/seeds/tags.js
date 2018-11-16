
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('tags').insert([
        {
          id: 1,
          job_id: 1,
          tag: 'Graphic Design'
        },
        {
          id: 2,
          job_id: 1,
          tag: 'HTML'
        },
        {
          id: 3,
          job_id: 1,
          tag: 'PHP'
        },
        {
          id: 4,
          job_id: 1,
          tag: 'Website Design'
        },
        {
          id: 5,
          job_id: 1,
          tag: 'WordPress'
        },
        {
          id: 6,
          job_id: 2,
          tag: 'C Programming'
        },
        {
          id: 7,
          job_id: 2,
          tag: 'C++ Programming'
        },
        {
          id: 8,
          job_id: 2,
          tag: 'Linux'
        },
        {
          id: 9,
          job_id: 2,
          tag: 'Python'
        },
        {
          id: 10,
          job_id: 2,
          tag: 'Software Architecture'
        },
        {
          id: 30,
          job_id: 3,
          tag: 'Graphic Design'
        },
        {
          id: 11,
          job_id: 3,
          tag: 'HTML'
        },
        {
          id: 12,
          job_id: 3,
          tag: 'PHP'
        },
        {
          id: 13,
          job_id: 3,
          tag: 'Website Design'
        },
        {
          id: 14,
          job_id: 3,
          tag: 'WordPress'
        },
        {
          id: 15,
          job_id: 4,
          tag: 'CSS'
        },
        {
          id: 16,
          job_id: 4,
          tag: 'HTML'
        },
        {
          id: 17,
          job_id: 4,
          tag: 'Javascript'
        },
        {
          id: 18,
          job_id: 4,
          tag: 'PHP'
        },
        {
          id: 19,
          job_id: 4,
          tag: 'Website Design'
        },
        {
          id: 20,
          job_id: 5,
          tag: 'Django'
        },
        {
          id: 21,
          job_id: 5,
          tag: 'PHP'
        },
        {
          id: 22,
          job_id: 5,
          tag: 'Python'
        },
        {
          id: 23,
          job_id: 5,
          tag: 'Software Architecture'
        },
        {
          id: 24,
          job_id: 5,
          tag: 'Web Scraping'
        },
        {
          id: 25,
          job_id: 6,
          tag: 'Angular.js'
        },
        {
          id: 26,
          job_id: 6,
          tag: 'Express JS'
        },
        {
          id: 27,
          job_id: 6,
          tag: 'Javascript'
        },
        {
          id: 28,
          job_id: 6,
          tag: 'node.js'
        },
        {
          id: 29,
          job_id: 6,
          tag: 'NoSQL Couch & Mongo'
        }
      ]);
    });
};
