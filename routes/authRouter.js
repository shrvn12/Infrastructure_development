const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();

const { userModel } = require("../models/userModel");

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
    const {firstName, lastName, email, password, contact} = req.body;
    
})