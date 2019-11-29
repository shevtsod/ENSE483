const jsonwebtoken = require('jsonwebtoken');

const { HOST, PORT, SECRET_KEY } = require('../env');

// Options for jsonwebtoken.sign()
const jwtOptions = {
  issuer: `http://${HOST}:${PORT}`,
  // JWT duration until expiration, in seconds
  expiresIn: 3600,
};

/**
 * Signs and returns a JSON Web Token with the given payload.
 *
 * @see https://jwt.io/
 * @param payload {object} Arbitrary data inside token
 * @returns {Promise<string>} JSON Web Token
 */
exports.sign = (payload) => new Promise((resolve, reject) => {
  jsonwebtoken.sign(payload, SECRET_KEY, jwtOptions, (err, token) => {
    if (err) return reject(err);

    return resolve({
      access_token: token,
      expires_in: jwtOptions.expiresIn,
    });
  });
});

/**
 * Verifies the given JSON Web Token. Resolves to the decoded token if its
 * signature as well as expiration time are still valid. Rejects with an
 * error otherwise.
 *
 * @see https://jwt.io/
 * @param token {string} JSON Web Token
 * @returns {Promise<object>} Decoded token data/payload
 */
exports.verify = (token) => new Promise((resolve, reject) => {
  jsonwebtoken.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return reject(err);

    return resolve(decoded);
  });
});
