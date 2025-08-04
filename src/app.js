const express = require("express");
const app = express();
require("./configs/db.js");
const { ConnectDB } = require("./configs/db.js");
const User = require("./models/user");
const { validateSignUpdata } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./Middlewares/auth.js");

app.use(express.json());
app.use(cookieParser());

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
    // console.log(cookies);
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});
app.post("/sendconnectionreq", userAuth, async (req, res) => {
  const user = req.user;
  //sending the connection request
  console.log("Sending the connection request");
  res.send(user.firstName + " sent Connection request!");
});
//most of the Api getting data or posting data return a  promise then we have to put into async await
app.post("/signup", async (req, res) => {
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
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials ");
      // res.send("User not found,check your credentials");
    }
    const isPassword = await bcrypt.compare(password, user.password);

    if (isPassword) {
      //create JWT
      const token = await jwt.sign({ _id: user._id }, "redmi@6225", {
        expiresIn: "7d",
      });
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

ConnectDB()
  .then(() => {
    console.log("DataBase connected Succesfully");
    app.listen(3000, () => {
      console.log("Server is Running");
    });
  })
  .catch((err) => {
    console.log("Database failed to connect");
  });

//Orders of the routes matters a lot

// app.use("/", (req, res) => {
//   res.send("slash");
// });
// app.use("/hello", (req, res,next) => {
//   next();
//   res.send("slash hello");
// },
// (req,res)=>{
//   console.log("hello this is next");
//   res.send("this is next")
// }
// );

// app.get('/users',(req,res)=>{
//     res.send({firstname:"Rahul",lastname:"Singh"});
// })
