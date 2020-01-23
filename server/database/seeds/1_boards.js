exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("boards")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("boards").insert([
        {
          user_id: 1,
          title: "Work"
        },
        {
          user_id: 1,
          title: "Home"
        }
      ]);
    });
};
