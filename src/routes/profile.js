const express = require("express");
const profileRouter = express.Router();
const bcrypt = require("bcrypt");
// const User = require("./models/user");
const { ValidateProfileEdit } = require("../utils/validation.js");

const { userAuth } = require("../Middlewares/auth.js");
const user = require("../models/user.js");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
    // console.log(cookies);
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!ValidateProfileEdit(req)) {
      throw new Error("Invalid Edit request");
    }
    const loggedInUser = req.user; //req.user is save d in userAuth
    console.log(loggedInUser);

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    console.log(loggedInUser);
    res.send(`${loggedInUser.firstName},your profile is updated`);
  } catch (err) {
    res.status(401).send("ERROR " + err.message);
  }
});

profileRouter.patch("/profile/changepassword", userAuth, async (req, res) => {
  //three fields--->1.currentpassword----->new password--->confirm password
  const user = req.user;
  try {
    const { currentpassword, newpassword, confirmpassword } = req.body;
    const iscurrentPassword = await user.validatePassword(currentpassword);
    if (!iscurrentPassword) {
      throw new Error("Your current password is wrong!!");
    }
    //now set user passord as new password and confirm it
    if (newpassword !== confirmpassword) {
      throw new Error("New password and confirm password do not match!");
    }
    user.password = newpassword;
    await user.save();

    res.send("password changed successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});
module.exports = profileRouter;
