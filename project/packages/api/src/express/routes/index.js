const Router = require('express-promise-router');

const jwt = require('../middleware/jwt');
const auth = require('./auth');
const users = require('./users');
const HttpError = require('../../errors/HttpError');

const router = Router();

// Routes used for authentication
router.use('/auth', auth);

// Protect all other routes with JWT authentication middleware
router.use(jwt);

// Application routes

router
  .use('/users', users);

// Unknown route handler
router.use('*', (req, res, next) => next(new HttpError(404)));

module.exports = router;
