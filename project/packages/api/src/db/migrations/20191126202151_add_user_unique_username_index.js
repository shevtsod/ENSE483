const tableName = 'users';

exports.up = (knex) => knex.schema.table(tableName, (table) => {
  table.unique('username');
});

exports.down = (knex) => knex.schema.table(tableName, (table) => {
  table.dropUnique('username');
});
