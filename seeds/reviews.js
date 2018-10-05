exports.seed = function(knex, Promise) {
  return knex('reviews').del()
    .then(function () {
      return knex('reviews').insert([
        {id: 1, review: "test1", reviewer_id: 1, user_id: 1},
        {id: 2, review: "test2", reviewer_id: 1, user_id: 1},
        {id: 3, review: "test3", reviewer_id: 1, user_id: 1},
      ]);
    });
};
