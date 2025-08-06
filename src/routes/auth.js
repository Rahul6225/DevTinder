const express = require("express");
const authRouter = express.Router();
const { validateSignUpdata } = require("../utils/validation.js");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

authRouter.post("/signup", async (req, res) => {
  // console.log(req.body);

  try {
    validateSignUpdata(req);

    //Encrypting the password
    const { firstName, lastName, emailId, password } = req.body;
    const passHash = await bcrypt.hash(password, 10);
    // res.send(passHash);
    console.log(passHash);

    // Crete new instance of new user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passHash,
    });
    await user.save();
    res.send("User added succefully");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials ");
      // res.send("User not found,check your credentials");
    }
    const isPassword = await user.validatePassword(password);

    if (isPassword) {
      //create JWT
      const token = await user.getJWT();
      console.log(token);

      //Add the token to the cookie and send the response
      res.cookie("token", token);
      res.send("Login successful");
    } else {
      console.log("invalid password");

      throw new Error("Invalid password");
    }
  } catch (error) {
    res.status(401).send("ERROR" + error);
  }
});

authRouter.post("/logout",async (req, res) => {
    res.cookie("token",null,{
      expires:new Date(Date.now())
    });
    res.send("You are logged Out");
});

module.exports = authRouter;
