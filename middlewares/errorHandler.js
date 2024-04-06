// Error handler middleware

const errorHandler = (res, statusCode, message) => {
  return res.status(statusCode).json({ error: { message } });
};

module.exports = {
    errorHandler
}