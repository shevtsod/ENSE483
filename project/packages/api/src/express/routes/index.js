const Router = require('express-promise-router');

const jwt = require('../middleware/jwt');
const auth = require('./auth');
const HttpError = require('../../errors/HttpError');

const roles = require('./roles');
const users = require('./users');
const pigs = require('./pigs');
const sensors = require('./sensors');
const batchData = require('./batchData');

const router = Router();

// Routes used for authentication
router.use('/auth', auth);

// Protect all other routes with JWT authentication middleware
router.use(jwt);

// Application routes

router.use([
  roles,
  users,
  pigs,
  sensors,
  batchData,
]);

// Unknown route handler
router.use('*', (req, res, next) => next(new HttpError(404)));

module.exports = router;
