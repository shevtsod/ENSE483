const { ValidationError } = require('objection');

const Model = require('./Model');
const Pig = require('./Pig');

/**
 * Represents data that is entered and modified manually by users rather than
 * being automatically managed by sensors.
 */
class BatchDatum extends Model {
  /**
   * Binds database table to model
   *
   * @returns {string} Table name
   */
  static get tableName() {
    return 'batch_data';
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
          from: 'batch_data.pig_id',
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
        'status',
        'pigId',
      ],
      properties: {
        type: {
          type: 'string',
          minLength: 1,
          maxLength: 255,
        },
        status: {
          type: 'boolean',
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

    // Ensure that the type is unique
    const typeExists = !!(await this.constructor.query()
      .where('type', this.type)
      .resultSize());

    if (typeExists) {
      throw new ValidationError({
        type: 'ModelValidation',
        data: {
          type: {
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

    if (this.type) {
      // Ensure that the type is unique
      if (this.type !== opt.old.type) {
        const typeExists = !!(await this.constructor.query()
          .where('type', this.type)
          .resultSize());

        if (typeExists) {
          throw new ValidationError({
            type: 'ModelValidation',
            data: {
              type: {
                message: 'must be unique',
              },
            },
          });
        }
      }

      // TODO: Ensure only users with admin role can modify type
    }
  }
}

module.exports = BatchDatum;
