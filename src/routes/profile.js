const express = require("express");
const profileRouter = express.Router();
// const User = require("./models/user");
const { validateSignUpdata } = require("../utils/validation.js");

const { userAuth } = require("../Middlewares/auth.js");

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
    // console.log(cookies);
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

module.exports = profileRouter;