const HttpError = require('../../errors/HttpError');
const Role = require('../../models/Role');

/**
 * Express middleware that only passes users with the given role name.
 *
 * @param roleNames {Array<string>} Names of roles to allow
 */
module.exports = (roleNames = []) => async (req, res, next) => {
  // If the list of role names is empty, allow all roles.
  if (!roleNames.length) return next();

  const role = await Role
    .query()
    .findById(req.user.roleId);

  if (!roleNames.includes(role.name)) throw new HttpError(401);

  next();
};
