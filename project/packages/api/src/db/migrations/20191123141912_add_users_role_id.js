const tableName = 'users';

exports.up = (knex) => knex.schema
  .table(tableName, (table) => {
    table.integer('role_id').unsigned().notNullable();
    table.foreign('role_id').references('roles.id');
  });

exports.down = (knex) => knex.schema
  .table(tableName, (table) => {
    table.dropForeign('role_id');
    table.dropColumn('role_id');
  });
