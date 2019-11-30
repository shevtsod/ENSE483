const { ValidationError } = require('objection');

const Model = require('./Model');

/**
 * List of roles created by the application.
 */
const defaultRoles = [
  'admin',
  'worker',
  'farmer',
];

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
   * @returns {object} Model relationships
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
        },
        displayName: {
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

    const nameExists = !!(await this.constructor.query()
      .findOne('name', this.name));

    // Ensure that the role name is unique
    if (nameExists) {
      throw new ValidationError({
        type: 'ModelValidation',
        data: {
          name: {
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

    // Ensure that default roles cannot have their names modified
    if (this.name && defaultRoles.includes(opt.old.name)) {
      throw new ValidationError({
        type: 'ModelValidation',
        data: {
          name: {
            message: `cannot modify for roles [${defaultRoles.join(', ')}]`,
          },
        },
      });
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
    const User = require('./User');

    // Ensure that default roles cannot be deleted
    if (defaultRoles.includes(this.name)) {
      throw new ValidationError({
        type: 'ModelValidation',
        message: `cannot delete roles with name [${defaultRoles.join(', ')}]`,
      });
    }

    const farmerRoleId = (await this.constructor.farmer()).$id();

    // Change related users' roles
    const users = await User.query()
      .where('role_id', this.id);

    await Promise.all(
      users.map((user) => user.$query().patch({
        roleId: farmerRoleId,
      })),
    );
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
   * Returns the "worker" role
   *
   * @returns {Promise<Role>} Worker role
   */
  static worker() {
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
