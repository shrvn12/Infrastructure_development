const express = require("express");
const { validate } = require("../middlewares/validator");
const { accessModel } = require("../models/accessModel");
const { errorHandler } = require("../middlewares/errorHandler");

const accessRouter = express.Router();

accessRouter.post("/access", validate("accessLevel"), async (req, res) => {
  const { accessLevel, permissions } = req.body;
  try {
    const levelExists = await accessModel.findOne({ accessLevel });
    if (levelExists) {
      return res.status(409).json({ message: "access level already exists" });
    }
    const level = new accessModel({
      accessLevel,
      permissions,
    });

    await level.save();

    return res.status(200).json({ message: "New access level created" });
  } catch (error) {
    console.error("Error during creating access level:", error);
    return errorHandler(res, 500, "Internal Server Error");
  }
});

module.exports = {
  accessRouter,
};
