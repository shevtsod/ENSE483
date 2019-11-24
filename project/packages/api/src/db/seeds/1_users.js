const { Model } = require('objection');

const User = require('../../models/User');
const Role = require('../../models/Role');
const { hashPassword } = require('../../util/crypto');

// Parameters for records to insert
const records = [
  {
    username: 'admin',
    password: 'admin',
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

  // Modify given records (hash passwords, assign roles, etc.)
  const modifiedRecords = await Promise.all(
    records.map(async (record, i) => ({
      ...record,
      // Encode password to Base64 and hash
      password: await hashPassword(
        Buffer.from(record.password).toString('base64'),
      ),
      // Assign the admin role to the first record
      roleId: i === 0 ? adminRoleId : undefined,
    })),
  );

  // Insert records to database
  return Promise.all(
    modifiedRecords.map((record) => User.query().insert(record)),
  );
};
