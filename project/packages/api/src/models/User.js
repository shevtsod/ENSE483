const { ValidationError } = require('objection');

const Model = require('./Model');
const Role = require('./Role');
const { hashPassword } = require('../util/crypto');

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
   * @returns {object} Model relationships
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
        'roleId',
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
        roleId: {
          type: 'integer',
          minimum: 1,
        },
      },
      additionalProperties: false,
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
   * @param queryContext {object} Context object of the insert query
   */
  async $beforeInsert(queryContext) {
    await super.$beforeInsert(queryContext);

    // Ensure that the username is unique
    const usernameExists = !!(await this.constructor.query()
      .where('username', this.username)
      .resultSize());

    if (usernameExists) {
      throw new ValidationError({
        type: 'ModelValidation',
        data: {
          username: {
            message: 'must be unique',
          },
        },
      });
    }

    // Hash the given password
    this.password = await hashPassword(this.password);

    if (this.roleId) {
      // If a role ID is given, ensure that it exists
      await Role.query()
        .findById(this.roleId)
        .throwIfNotFound();
    } else {
      // Set a default role if none is provided
      this.roleId = (await Role.farmer()).$id();
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

    // Ensure that the username is unique
    if (this.username && this.username !== opt.old.username) {
      const usernameExists = !!(await this.constructor.query()
        .where('username', this.username)
        .resultSize());

      if (usernameExists) {
        throw new ValidationError({
          type: 'ModelValidation',
          data: {
            username: {
              message: 'must be unique',
            },
          },
        });
      }
    }

    // Hash the given password
    if (this.password) {
      this.password = await hashPassword(this.password);
    }

    if (this.roleId && this.roleId !== opt.old.roleId) {
      // Ensure that the related role ID is valid
      await Role.query()
        .findById(this.roleId)
        .skipUndefined()
        .throwIfNotFound();

      const adminRoleId = (await Role.admin()).$id();
      const adminRoleCount = await this.constructor.query()
        .joinRelation('role')
        .where('role.name', 'admin')
        .resultSize();

      // Ensure that the last admin user's role cannot be modified
      if (adminRoleCount === 1 && opt.old.roleId === adminRoleId) {
        throw new ValidationError({
          type: 'ModelValidation',
          data: {
            roleId: {
              message: 'cannot modify when only one admin user',
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

    const adminRoleId = (await Role.admin()).$id();
    const adminRoleCount = await this.constructor.query()
      .joinRelation('role')
      .where('role.name', 'admin')
      .resultSize();

    // Ensure that the last admin user's role cannot be modified
    if (adminRoleCount === 1 && this.roleId === adminRoleId) {
      throw new ValidationError({
        type: 'ModelValidation',
        message: 'cannot delete last admin user',
      });
    }
  }
}

module.exports = User;
