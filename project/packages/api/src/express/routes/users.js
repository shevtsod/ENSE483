const Router = require('express-promise-router');

const model = require('./common/model');
const User = require('../../models/User');

module.exports = Router()
  .use('/users', model(User, {
    rolesRead: ['admin'],
    rolesCreate: ['admin'],
    rolesUpdate: ['admin'],
    rolesDelete: ['admin'],
  }));
