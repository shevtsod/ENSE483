const { Model } = require('objection');

const Role = require('../../models/Role');

// Parameters for records to insert
const records = [
  {
    name: 'admin',
    displayName: 'Administrator',
  },
  {
    name: 'worker',
    displayName: 'Worker of the Slaughterhouse',
  },
  {
    name: 'farmer',
    displayName: 'Farmer',
  },
];

/**
 * Creates records if none exist yet.
 */
exports.seed = async (knex) => {
  // Bind to Objection.js
  Model.knex(knex);

  // Do nothing if records already exist
  if (await Role.query().resultSize()) return null;

  // Insert records to database
  return Promise.all(records.map((record) => Role.query().insert(record)));
};
