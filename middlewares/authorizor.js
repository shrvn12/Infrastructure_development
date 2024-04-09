const jwt = require("jsonwebtoken");
require("dotenv").config();

const { userModel } = require("../models/userModel");
const { errorHandler } = require("./errorHandler");

const authorize = () => {
  return async (req, res, next) => {
    try {
      const token =
        req.cookies && req.cookies.token
          ? req.cookies.token
          : req.headers.token;
      if (!token) {
        return errorHandler(res, 401, "Permission denied, user not logged in");
      }

      jwt.verify(token, process.env.USER_TOKEN_KEY, async (err, decoded) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            return errorHandler(res, 401, "Token has expired");
          } else {
            console.error("Error verifying token:", err);
            return errorHandler(res, 401, "Invalid token");
          }
        }

        if (!decoded || !decoded.id || !decoded.email) {
          return errorHandler(res, 401, "Invalid token");
        }

        const user = await userModel.findById(decoded.id);
        console.log(user, decoded);
        if (!user || user.email !== decoded.email) {
          return errorHandler(res, 401, "User not found or token mismatch");
        }

        req.user = user;
        next(); // Move to the next middleware
      });
    } catch (error) {
      console.error("Error in authorize middleware:", error);
      return errorHandler(res, 500, "Internal Server Error");
    }
  };
};

module.exports = {
  authorize,
};
