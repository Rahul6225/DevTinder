const express = require("express");
const userRouter = express.Router();

const { userAuth } = require("../Middlewares/auth.js");
const ConnectionRequest = require("../models/ConnectionRequest");
const USER_SAFE_DATA = "firstName lastName age phtotUrl gender";

//Get all the pending connection request for logged in user

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInuser = req.user;
    //always remeber : db.find()==> return the array,db.findOne() ==>return object
    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInuser,
      status: "interested",
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    res.json({ Message: "Data fetched Successfully", connectionRequest });
  } catch (error) {
    res.status(400).json({ Message: error.Message });
  }
});
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInuser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInuser._id, status: "accepted" },
        { fromUserId: loggedInuser._id, status: "accepted" },
      ],
    })

      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);
    console.log(connectionRequest);
    const data = connectionRequest.map((row) => {
      if (row.fromUserId._id.toString() === loggedInuser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    res.json({ message: "Data fetched Succesfully", data });
  } catch (error) {
    res.status(400).json({ Message: error.Message });
  }
});

module.exports = userRouter;
