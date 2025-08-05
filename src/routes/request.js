const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../Middlewares/auth.js");
const { validateSignUpdata } = require("../utils/validation.js");



requestRouter.post("/sendconnectionreq", userAuth, async (req, res) => {
  const user = req.user;
  //sending the connection request
  console.log("Sending the connection request");
  res.send(user.firstName + " sent Connection request!");
});

module.exports = requestRouter;