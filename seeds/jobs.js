
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('jobs').del()
    .then(function () {
      // Inserts seed entries
      return knex('jobs').insert([
        {id: 1, job: 'test', job_info: 'test2'},
        {id: 2, job: 'test', job_info: 'test2'},
        {id: 3, job: 'test', job_info: 'test2'},
      ]);
    });
};
