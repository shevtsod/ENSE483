const { Model } = require('objection');

const User = require('../../models/User');
const Role = require('../../models/Role');

// Parameters for records to insert
const records = [
  {
    username: 'admin',
    password: Buffer.from('admin').toString('base64'),
  },
];

/**
 * Creates records if none exist yet.
 */
exports.seed = async (knex) => {
  // Bind to Objection.js
  Model.knex(knex);

  // Do nothing if records already exist
  if (await User.query().resultSize()) return null;

  // Get the administrator role ID
  const adminRoleId = (await Role.admin()).$id();

  // Modify given records (assign roles, etc.)
  const modifiedRecords = await Promise.all(
    records.map(async (record, i) => ({
      ...record,
      // Assign the admin role to the first record
      roleId: i === 0 ? adminRoleId : undefined,
    })),
  );

  // Insert records to database
  return Promise.all(
    modifiedRecords.map((record) => User.query().insert(record)),
  );
};
