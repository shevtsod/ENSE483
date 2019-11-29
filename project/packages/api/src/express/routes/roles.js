const Router = require('express-promise-router');

const model = require('./common/model');
const Role = require('../../models/Role');

module.exports = Router()
  .use('/roles', model(Role, {
    rolesRead: ['admin'],
    rolesCreate: ['admin'],
    rolesUpdate: ['admin'],
    rolesDelete: ['admin'],
  }));
