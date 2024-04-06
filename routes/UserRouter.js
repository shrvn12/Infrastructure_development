const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();

const { userModel } = require("../models/userModel");
const { errorHandler } = require("../middlewares/errorHandler");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // checks for missing required field.
    let requiredFields = ["firstName", "lastName", "email", "password"];

    for (let field of requiredFields) {
      if (!req.body[field]) {
        return errorHandler(res, 400, `Please provide ${field}`);
      }
    }

    //checks if user with same email is already registered
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return errorHandler(res, 409, "User with this email already exists");
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const payload = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    };

    //create the user
    const user = new userModel(payload);
    await user.save();
    res.status(201).json({ message: "Registered successfully" });
  } catch (error) {
    console.error("Error occurred during user registration:", error);
    errorHandler(res, 500, "Internal Server Error");
  }
});

module.exports = {
  userRouter,
};
