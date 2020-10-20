
exports.up = function(knex) {
  return knex.schema.createTable('user_locations', function (table) {
        table.string('id').primary();
        table.decimal('latitude', 14, 10).notNullable();
        table.decimal('longitude', 14, 10).notNullable();
  });
};

exports.down = function(knex) {
    return knex.schema.dropTable('user_locations');
};
