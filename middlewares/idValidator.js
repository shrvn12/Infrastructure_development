const { errorHandler } = require("./errorHandler");

const validateId = (model) => {
  return async (req, res, next) => {
    const id = req.params.id;
    if (id.length !== 24) {
      return errorHandler(res, 400, "Invalid id");
    }
    try {
      const response = await model.findById(id);
      console.log(id, response);
      console.log(model);
      if (response) {
        req.user = response;
        next();
      } else {
        return errorHandler(res, 404, "Id does not exist");
      }
    } catch (error) {
      console.error("Error in idValidator middleware:", error);
      return errorHandler(res, 500, "Internal Server Error");
    }
  };
};

module.exports = {
  validateId,
};
