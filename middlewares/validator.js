const _ = require("lodash");
const { errorHandler } = require("./errorHandler");

const validate = (args) => {
  return (req, res, next) => {
    const data = req.body;
    if (_.isString(args)) {
      if (data[args]) {
        return next();
      } else {
        return errorHandler(res, 400, `Please provide ${args}`);
      }
    }

    for (let elem of args) {
      if (!data[elem]) {
        return errorHandler(res, 400, `Please provide ${elem}`);
      }

      if (elem === "email" && !isValidEmail(data.email)) {
        return errorHandler(res, 400, "Please enter a valid email");
      }

      if (elem === "password" && !isValidPassword(data.password)) {
        return errorHandler(res,400,"Password should be at least 5 characters long");
      }
    }

    next();
  };
};

function isValidEmail(email) {
  // Use a regex pattern to validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPassword(password) {
  return password.length >= 5;
}

module.exports = {
  validate,
};
