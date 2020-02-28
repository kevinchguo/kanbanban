exports.up = function(knex) {
  return knex.schema.createTable("tasks", table => {
    table.increments();
    table
      .integer("list_id")
      .unsigned()
      .references("lists.id")
      .notNullable();
    table.string("description");
    table.integer("position").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("tasks");
};
