const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
  //Read the token from the cookies
  try {
    const { token } = req.cookies;
    if (!token) {
        throw new Error("Token is not valid");
    }
    //validate the token
    const decodeObj = await jwt.verify(token, "redmi@6225");
    const { _id } = decodeObj;
    // console.log(_id);
    

    //find the user
    const user = await User.findById(_id);
    
    if (!user) {
      throw new Error("User not Found");
    }
    req.user = user;
    next();

  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }

};

module.exports = { userAuth };

