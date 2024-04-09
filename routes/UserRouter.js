const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();

const { userModel } = require("../models/userModel");
const { errorHandler } = require("../middlewares/errorHandler");
const { validateId } = require("../middlewares/idValidator");
const { validate } = require("../middlewares/validator");
const { authorize } = require("../middlewares/authorizor");

const userRouter = express.Router();

userRouter.post("/register", validate(["firstName", "lastName", "email", "password"]), async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
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
  }
);

userRouter.get("/user/:id", validateId(userModel), authorize(), async (req, res) => {
  const id = req.params.id;
  try {
    // Check if req.user is set by the middleware
    if (req.user) {
      // Create a new object excluding the password field
      const userData = {
        _id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        contact: req.user.contact,
        team: req.user.team,
        designation: req.user.designation,
        permissions: req.user.permissions,
        accountSettings: req.user.accountSettings,
        verified: req.user.verified,
        createdAt: req.user.createdAt,
        updatedAt: req.user.updatedAt
      };
      res.status(200).json(userData);
    } else {
      return errorHandler(res, 404, "User not found");
    }
  } catch (error) {
    console.error("Error in user route:", error);
    return errorHandler(res, 500, "Internal Server Error");
  }
});

module.exports = {
  userRouter,
};
