const Model = require('./Model');

/**
 * Represents a user's role and controls authorization.
 */
class Role extends Model {
  /**
   * Binds database table to model
   *
   * @returns {string} Table name
   */
  static get tableName() {
    return 'roles';
  }

  /**
   * Defines relationships with other models
   *
   * @returns {Object} Model relationships
   */
  static get relationMappings() {
    // eslint-disable-next-line global-require
    const User = require('./User');

    return {
      role: {
        relation: Model.HasManyRelation,
        modelClass: User,
        join: {
          from: 'roles.id',
          to: 'users.role_id',
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
        'name',
        'displayName',
      ],
      properties: {
        name: {
          type: 'string',
          minLength: 1,
          maxLength: 255,
          enum: ['admin', 'worker', 'farmer'],
        },
        displayName: {
          type: 'string',
          minLength: 1,
          maxLength: 255,
        },
      },
    };
  }

  /**
   * Returns the administrator role
   *
   * @returns {Promise<Role>} Administrator role
   */
  static admin() {
    return this.query().findOne('name', 'admin');
  }

  /**
   * Returns the "worker of the slaughterhouse" role
   *
   * @returns {Promise<Role>} Worker of the slaughterhouse role
   */
  static workerOfSlaughterhouse() {
    return this.query().findOne('name', 'worker');
  }

  /**
   * Returns the farmer role
   *
   * @returns {Promise<Role>} Farmer role
   */
  static farmer() {
    return this.query().findOne('name', 'farmer');
  }
}

module.exports = Role;
