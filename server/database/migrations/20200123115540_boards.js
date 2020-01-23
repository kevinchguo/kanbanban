exports.up = function(knex) {
  return knex.schema.createTable("boards", table => {
    table.increments();
    table
      .integer("user_id")
      .unsigned()
      .references("users.id")
      .notNullable();
    table.string("title").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("boards");
};
