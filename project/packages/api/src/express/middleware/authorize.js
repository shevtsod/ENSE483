const HttpError = require('../../errors/HttpError');
const User = require('../../models/User');
const Role = require('../../models/Role');

/**
 * Express middleware that only passes users with the given role name.
 *
 * @param roleNames {Array<string>} Names of roles to allow
 */
module.exports = (roleNames) => (req, res, next) => {
  Role
    .query()
    .findById(req.user.roleId)
    .then((role) => {
      if (!roleNames.includes(role.name)) throw new HttpError(401);

      next();
    })
    .catch((err) => next(err));
};
