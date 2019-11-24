const bcrypt = require('bcrypt');

// Power of salting iterations. Runs 2^saltRounds salting iterations.
// See https://www.npmjs.com/package/bcrypt#a-note-on-rounds
const saltRounds = 10;

/**
 * Returns a hash of the given password. This hash can be safely stored in
 * persistent storage.
 *
 * @param password {string} Plaintext/encoded password
 * @returns {Promise<string>} Hashed password
 */
exports.hashPassword = (password) => bcrypt.hash(password, saltRounds);

/**
 * Compares a given password against a hash.
 *
 * @param password {string} Plaintext/encoded password
 * @param hash {string} Previously hashed password (e.g., from persistent
 *                      storage)
 * @returns {Promise<boolean>} Password matches hash?
 */
exports.checkPassword = (password, hash) => bcrypt.compare(password, hash);
