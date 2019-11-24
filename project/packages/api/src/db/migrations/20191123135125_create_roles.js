const tableName = 'roles';

exports.up = (knex) => knex.schema.createTable(tableName, (table) => {
  table.increments('id').primary();
  table.string('name');
  table.string('display_name');
  table.timestamps(true, true);
});

exports.down = (knex) => knex.schema.dropTableIfExists(tableName);
