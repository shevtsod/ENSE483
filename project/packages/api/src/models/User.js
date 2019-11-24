const Model = require('./Model');
const Role = require('./Role');

/**
 * Represents a user of the application and provides facilities for
 * authentication and role-based authorization.
 */
class User extends Model {
  /**
   * Binds database table to model
   *
   * @returns {string} Table name
   */
  static get tableName() {
    return 'users';
  }

  /**
   * Defines relationships with other models
   *
   * @returns {Object} Model relationships
   */
  static get relationMappings() {
    return {
      role: {
        relation: Model.BelongsToOneRelation,
        modelClass: Role,
        join: {
          from: 'users.role_id',
          to: 'roles.id',
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
        'username',
        'password',
      ],
      properties: {
        username: {
          type: 'string',
          minLength: 1,
          maxLength: 255,
        },
        password: {
          type: 'string',
          minLength: 1,
          maxLength: 255,
        },
        role_id: {
          type: 'integer',
        },
      },
    };
  }

  /**
   * Returns a list of model fields/parameters that should be hidden when
   * converted to an external representation.
   *
   * @returns {string[]} Array of field/parameter names to omit
   */
  static get hiddenFields() {
    return ['password'];
  }

  /**
   * Performs additional processing before a new record is inserted.
   *
   * @param queryContext {Object} Context object of the insert query
   */
  async $beforeInsert(queryContext) {
    await super.$beforeInsert(queryContext);

    // Set a default role if none is provided
    if (!this.roleId) {
      this.roleId = (await Role.farmer()).$id();
    }
  }
}

module.exports = User;
