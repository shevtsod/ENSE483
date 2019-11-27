const HttpError = require('../../errors/HttpError');
const { verify } = require('../../util/jwt');
const User = require('../../models/User');

/**
 * Express middleware that verifies the JWT passed in a request's
 * "Authorization" header and sets `req.user`.
 *
 * @param req {object} Express request
 * @param res {object} Express response
 * @param next {Function} Next Express middleware in the chain
 */
module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');

  // Ensure that the authorization header is present
  if (!authHeader) throw new HttpError(401);

  const token = authHeader.split('Bearer ')[1];

  // Ensure that the authorization header contains the bearer token (JWT)
  if (!token) throw new HttpError(401);

  // Verify that the token is a valid JWT
  verify(token)
    .then(async (decoded) => {
      // Set the current user in the request
      req.user = await User.query().findById(decoded.sub);

      next();
    })
    .catch(() => next(new HttpError(401)));
};
