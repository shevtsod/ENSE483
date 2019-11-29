const tableName = 'roles';

exports.up = (knex) => knex.schema.table(tableName, (table) => {
  table.unique('name');
});

exports.down = (knex) => knex.schema.table(tableName, (table) => {
  table.dropUnique('name');
});
