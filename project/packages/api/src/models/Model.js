const { Model: ObjectionModel, snakeCaseMappers } = require('objection');

const { toSQLTimestamp } = require('../util/date');

/**
 * Represents a generic Model for inheritance.
 */
class Model extends ObjectionModel {
  /**
   * Converts snake_case parameters in database to camelCase in JavaScript.
   *
   * @see https://vincit.github.io/objection.js/recipes/snake-case-to-camel-case-conversion.html
   * @returns {object} Objection.snakeCaseMappers
   */
  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  /**
   * Returns a list of model fields/parameters that should be hidden when
   * converted to an external representation.
   *
   * @returns {string[]} Array of field/parameter names to omit
   */
  static get hiddenFields() {
    return [];
  }

  /**
   * Performs additional processing before a new record is inserted.
   *
   * @param queryContext {object} Context object of the insert query
   */
  async $beforeInsert(queryContext) {
    await super.$beforeInsert(queryContext);

    this.createdAt = toSQLTimestamp(new Date());
  }

  /**
   * Performs additional processing before an existing record is updated.
   *
   * @param queryContext {object} Context object of the insert query
   */
  async $beforeUpdate(queryContext) {
    await super.$beforeInsert(queryContext);

    this.updatedAt = toSQLTimestamp(new Date());
  }

  /**
   * Formats the model to its extenal JSON representation.
   *
   * @param json {object} JSON to pass to parent model class
   * @returns {object} External JSON representation
   */
  $formatJson(json) {
    const parentJson = super.$formatJson(json);

    const { hiddenFields } = this.constructor;
    const result = {};

    Object.keys(parentJson).forEach((key) => {
      // Skip fields that should be hidden
      if (hiddenFields.includes(key)) return;

      result[key] = parentJson[key];
    });

    return result;
  }
}

module.exports = Model;
