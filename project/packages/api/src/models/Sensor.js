const { ValidationError } = require('objection');
const influxClient = require('../db/influxClient');

const Model = require('./Model');
const Pig = require('./Pig');
const logger = require('../util/logger');

/**
 * Represents a sensor that provides measurements for some physical phenomenon.
 */
class Sensor extends Model {
  /**
   * Binds database table to model
   *
   * @returns {string} Table name
   */
  static get tableName() {
    return 'sensors';
  }

  /**
   * Defines relationships with other models
   *
   * @returns {object} Model relationships
   */
  static get relationMappings() {
    return {
      pig: {
        relation: Model.BelongsToOneRelation,
        modelClass: Pig,
        join: {
          from: 'sensors.pig_id',
          to: 'pigs.id',
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
        'type',
        'pigId',
      ],
      properties: {
        type: {
          type: 'string',
          minLength: 1,
          maxLength: 255,
        },
        pigId: {
          type: 'integer',
          minimum: 1,
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

    // Ensure that the pig exists
    await Pig.query()
      .findById(this.pigId)
      .throwIfNotFound();

    // Ensure that the type is unique per pig
    const typeExists = !!(await this.constructor.query()
      .where({
        type: this.type,
        pig_id: this.pigId,
      })
      .resultSize()
    );

    if (typeExists) {
      throw new ValidationError({
        type: 'ModelValidation',
        data: {
          type: {
            message: 'must be unique per pig',
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

    if (this.pigId) {
      // Ensure that the pig exists
      await Pig.query()
        .findById(this.pigId)
        .throwIfNotFound();
    }

    // Ensure that the type is unique per pig
    if (this.type) {
      const typeExists = !!(await this.constructor.query()
        .where({
          type: this.type,
          pig_id: this.pigId || opt.old.pigId,
        })
        .resultSize());

      if (typeExists) {
        throw new ValidationError({
          type: 'ModelValidation',
          data: {
            type: {
              message: 'must be unique per pig',
            },
          },
        });
      }
    }
  }

  /**
   * Queries InfluxDB and returns the measurements associated with this sensor.
   *
   * @return {Promise<Results[]>} list of result points queried from InfluxDB
   */
  async $measurements() {
    const pigRfid = (await this.$relatedQuery('pig')).rfid;

    const query = `
      SELECT "data"
      FROM "${this.type}"
      WHERE ("id" = '${pigRfid}')
      ORDER BY time DESC
      LIMIT 100
    `;

    logger.debug(query);

    return influxClient.query(query);
  }
}

module.exports = Sensor;
