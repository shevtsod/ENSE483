const Router = require('express-promise-router');

const User = require('../../models/User');
const { checkPassword } = require('../../util/crypto');
const { sign } = require('../../util/jwt');
const HttpError = require('../../errors/HttpError');

const router = Router();

/**
 * Accepts a username and password provided by the user, authenticates the
 * user, signs and returns a JSON Web Token (JWT) for that user.
 *
 * @see https://jwt.io/
 * @param req {object} Express request
 * @param res {object} Express response
 * @param next {Function} Next Express middleware in the chain
 */
router.post('/access_token', async (req, res, next) => {
  const { username, password } = req.body;

  // Validate passed params
  if (!username) throw new HttpError(400, '"username" is required.');
  if (!password) throw new HttpError(400, '"password" is required.');

  // Find a user with this username
  const user = await User.query().findOne({ username });

  // Ensure that the user exists
  if (!user) throw new HttpError(401);

  // Ensure that the password matches
  const match = await checkPassword(password, user.password);

  if (!match) throw new HttpError(401);

  // Generate and return a JWT for the user
  const token = await sign({
    // The subject of the token is the user's unique ID
    sub: user.$id(),
  });

  // Respond with the token
  res.json({
    access_token: token,
  });
});

module.exports = router;
