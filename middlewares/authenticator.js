const bcrypt = require("bcrypt");
const { userModel } = require("../models/userModel");
const { errorHandler } = require("./errorHandler");

const authenticator = async (req, res, next) => {
  try {
    const data = req.body;
    const { email, password } = data;

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return errorHandler(res, 404, "User with this email doesn't exist");
    }
    req.user = user;

    // Compare passwords
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return errorHandler(res, 500, "Something went wrong, please try again");
      }

      if (result) {
        next(); // Passwords match, proceed to next middleware
      } else {
        return errorHandler(res, 401, "Password incorrect");
      }
    });
  } catch (error) {
    console.error("Error in authorizer middleware:", error);
    return errorHandler(res, 500, "Internal Server Error");
  }
};

module.exports = {
  authenticator,
};
