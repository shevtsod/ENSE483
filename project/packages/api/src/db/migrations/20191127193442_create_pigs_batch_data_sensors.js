exports.up = (knex) => knex.schema
  .table('roles', (table) => {
    table.string('name').notNullable().alter();
    table.string('display_name').notNullable().alter();
  })
  .table('users', (table) => {
    table.string('username').notNullable().alter();
    table.string('password').notNullable().alter();
  })
  .createTable('pigs', (table) => {
    table.increments('id').primary();
    table.string('rfid').notNullable();
    table.timestamps(true, true);
  })
  .createTable('batch_data', (table) => {
    table.increments('id').primary();
    table.string('type').notNullable();
    table.boolean('status').notNullable().defaultTo(true);
    table.integer('pig_id').unsigned().notNullable();
    table.foreign('pig_id').references('pigs.id');
    table.timestamps(true, true);
  })
  .createTable('sensors', (table) => {
    table.increments('id').primary();
    table.string('type').notNullable();
    table.integer('pig_id').unsigned().notNullable();
    table.foreign('pig_id').references('pigs.id');
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema
  .dropTableIfExists('sensors')
  .dropTableIfExists('batch_data')
  .dropTableIfExists('pigs')
  .table('users', (table) => {
    table.string('username').nullable().alter();
    table.string('password').nullable().alter();
  })
  .table('roles', (table) => {
    table.string('name').nullable().alter();
    table.string('display_name').nullable().alter();
  });
