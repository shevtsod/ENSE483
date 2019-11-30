const { ValidationError } = require('objection');

const Model = require('./Model');

/**
 * Represents a pig in a farm that may have sensors and/or batch data attached
 * to it for the purposes of monitoring its health.
 */
class Pig extends Model {
  /**
   * Binds database table to model
   *
   * @returns {string} Table name
   */
  static get tableName() {
    return 'pigs';
  }

  /**
   * Defines relationships with other models
   *
   * @returns {object} Model relationships
   */
  static get relationMappings() {
    // eslint-disable-next-line global-require
    const Sensor = require('./Sensor');
    // eslint-disable-next-line global-require
    const BatchDatum = require('./BatchDatum');

    return {
      sensors: {
        relation: Model.HasManyRelation,
        modelClass: Sensor,
        join: {
          from: 'pigs.id',
          to: 'sensors.pig_id',
        },
      },
      batch_data: {
        relation: Model.HasManyRelation,
        modelClass: BatchDatum,
        join: {
          from: 'pigs.id',
          to: 'batch_data.pig_id',
        },
      },
    };
  }

  /**
   * Returns the JSON Schema for validating this model.
   *
   * @see https://vincit.github.io/objection.js/api/model/static-properties.html#static-jsonschema
   * @see https://json-schema.org/
   * @returns {object} JSON Schema
   */
  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'rfid',
      ],
      properties: {
        rfid: {
          type: 'string',
          minLength: 1,
          maxLength: 255,
        },
      },
      additionalProperties: false,
    };
  }

  /**
   * Performs additional processing before a new record is inserted.
   *
   * @param queryContext {object} Context object of the insert query
   */
  async $beforeInsert(queryContext) {
    await super.$beforeInsert(queryContext);

    // Ensure that the rfid is unique
    const rfidExists = !!(await this.constructor.query()
      .where('rfid', this.rfid)
      .resultSize());

    if (rfidExists) {
      throw new ValidationError({
        type: 'ModelValidation',
        data: {
          rfid: {
            message: 'must be unique',
          },
        },
      });
    }
  }

  /**
   * Performs additional processing before an existing record is updated.
   *
   * @param opt {object} Update options
   * @param queryContext {object} Context object of the update query
   */
  async $beforeUpdate(opt, queryContext) {
    await super.$beforeUpdate(queryContext);

    // Ensure that the rfid is unique
    if (this.rfid && this.rfid !== opt.old.rfid) {
      const rfidExists = !!(await this.constructor.query()
        .where('rfid', this.rfid)
        .resultSize());

      if (rfidExists) {
        throw new ValidationError({
          type: 'ModelValidation',
          data: {
            rfid: {
              message: 'must be unique',
            },
          },
        });
      }
    }
  }

  /**
   * Performs additional processing before an existing record is deleted.
   *
   * @param queryContext {object} Context object of the update query
   */
  async $beforeDelete(queryContext) {
    await super.$beforeDelete(queryContext);

    // eslint-disable-next-line global-require
    const Sensor = require('./Sensor');
    // eslint-disable-next-line global-require
    const BatchDatum = require('./BatchDatum');

    // Delete related models
    const sensors = await Sensor.query()
      .where('pig_id', this.id);

    await Promise.all(
      sensors.map((sensor) => sensor.$query().delete()),
    );

    const batchData = await BatchDatum.query()
      .where('pig_id', this.id);

    await Promise.all(
      batchData.map((batchDatum) => batchDatum.$query().delete()),
    );
  }
}

module.exports = Pig;
