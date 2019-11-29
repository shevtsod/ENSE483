const Router = require('express-promise-router');

const model = require('./common/model');
const Sensor = require('../../models/Sensor');

module.exports = Router()
  .use('/sensors', model(Sensor, {
    rolesRead: [],
    rolesCreate: ['admin'],
    rolesUpdate: ['admin'],
    rolesDelete: ['admin'],
  }).get('/:id/measurements', async (req, res) => {
    const row = await Sensor.query()
      .findById(req.params.id)
      .throwIfNotFound();
    const measurements = await row.$measurements();

    res.json(measurements);
  }));
