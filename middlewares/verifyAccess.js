const _ = require('lodash');
const { accessModel } = require("../models/accessModel");
const { errorHandler } = require("./errorHandler");

const verifyAccess = (requiredAccess) => { // Use singular for consistency
  return async (req, res, next) => {
    const user = req.user;
    if (_.isString(requiredAccess)) {
      requiredAccess = [requiredAccess];
    }
    try {
      if (!user || !user.id) {
        return errorHandler(res, 401, "Unauthorized: Missing user ID"); // Use 401 for unauthorized access
      }

      if (!user.accessLevel) {
        return errorHandler(res, 403, "Forbidden: User access level not found"); // Use 403 for access denied due to permissions
      }

      const accessLevel = await accessModel.findOne({
        accessLevel: user.accessLevel,
      });

      if (!accessLevel) {
        return errorHandler(res, 403, "Forbidden: Invalid user access level");
      }

      const userPermissions = accessLevel.permissions; // Use camelCase for consistency

      for (const elem of requiredAccess) {
        if (!userPermissions[elem]) {
          return res.status(403).json({ message: "Forbidden: Missing required permission" });
        }
      }

      return next();

    } catch (error) {
      console.error('Error in verifyAccess', error);
      return errorHandler(res, 500, "Internal server error");
    }
  };
};

module.exports = {
  verifyAccess
};
