const Router = require('express-promise-router');

const model = require('./common/model');
const BatchDatum = require('../../models/BatchDatum');

module.exports = Router()
  .use('/batch_data', model(BatchDatum, {
    rolesRead: [],
    rolesCreate: ['admin'],
    rolesUpdate: [],
    rolesDelete: ['admin'],
  }));
