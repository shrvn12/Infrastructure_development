const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { errorHandler } = require("../middlewares/errorHandler");
const { authorizer } = require("../middlewares/authorizer");
const { validate } = require("../middlewares/validator");

const authRouter = express.Router();

authRouter.post("/login", validate(["email", "password"]), authorizer, async (req, res) => {
  try {
    const user = req.user;

    // Generate token
    const token = jwt.sign({ email: user.email, id: user._id }, process.env.USER_TOKEN_KEY);

    // Set token as cookie
    res.cookie('token', token);

    // Send success response
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);
    return errorHandler(res, 500, "Internal Server Error");
  }
});

module.exports = {
  authRouter,
};
