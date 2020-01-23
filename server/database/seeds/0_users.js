exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          email: "rdumingo0@tumblr.com",
          username: "ebrusle0",
          password: "a7HJNutQAn"
        },
        {
          email: "mleicester1@mozilla.com",
          username: "vmehaffey1",
          password: "ERY1ZY"
        },
        {
          email: "blilford2@ucoz.ru",
          username: "kskipton2",
          password: "ZHd3LOGcq"
        },
        {
          email: "hyeude3@sciencedaily.com",
          username: "clikely3",
          password: "64qOwnJTDk"
        },
        {
          email: "eosullivan4@phpbb.com",
          username: "lcurrier4",
          password: "nJl7cW"
        }
      ]);
    });
};
