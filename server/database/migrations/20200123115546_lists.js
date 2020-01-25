exports.up = function(knex) {
  return knex.schema.createTable("lists", table => {
    table.increments();
    table
      .integer("board_id")
      .unsigned()
      .references("boards.id")
      .notNullable();
    table.string("title");
    table.decimal("position").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("lists");
};
