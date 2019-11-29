const Router = require('express-promise-router');

const model = require('./common/model');
const { get, getCollection } = require('../../util/crud');
const Pig = require('../../models/Pig');
const Sensor = require('../../models/Sensor');
const BatchDatum = require('../../models/BatchDatum');
const authorize = require('../middleware/authorize');
const { pagination } = require('../constants');

module.exports = Router()
  .use('/pigs', model(Pig, {
    rolesRead: [],
    rolesCreate: ['admin'],
    rolesUpdate: ['admin'],
    rolesDelete: ['admin'],
  })
    .get('/:id/sensors', authorize([]), async (req, res) => {
      await get(Pig, req.params.id);

      const rows = await getCollection(
        Sensor,
        { pig_id: req.params.id },
        req.query.page || 0,
        req.query.perPage || pagination.perPage,
      );

      res.json(rows);
    })
    .get('/:id/batch_data', authorize([]), async (req, res) => {
      await get(Pig, req.params.id);

      const rows = await getCollection(
        BatchDatum,
        { pig_id: req.params.id },
        req.query.page,
        req.query.perPage || pagination.perPage,
      );

      res.json(rows);
    }));
