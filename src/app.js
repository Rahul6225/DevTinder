const express = require("express");
const app = express();
require("./configs/db.js");
const { ConnectDB } = require("./configs/db.js");
const User = require("./models/user");
const { validateSignUpdata } = require("./utils/validation");
const bcrypt = require("bcrypt");

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      console.log("data fetched succefully");

      res.send(users);
    }
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
});
app.use(express.json());

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
app.post('/login',async (req,res)=>{
  try{
    const {emailId,password} = req.body;
    const user =await User.findOne({emailId:emailId});
    if(!user){
      throw new Error("Invalid credentials ");
      // res.send("User not found,check your credentials");
    }
    const isPassword =await bcrypt.compare(password,user.password);

    if(isPassword){
      res.send("Login successful")
    }
    else{
      console.log("invalid password");
      
      throw new Error("Invalid password");
    }
  }catch(error){
    res.status(401).send("ERROR"+error)
  }
})

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User Deleted Succesfully");
  } catch (err) {
    res.status(400).send(err + "Something error");
  }
});

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, data);
    console.log(user);
    res.send("user Updated succesfully");
  } catch (err) {
    res.status(400).send("something went wrong");
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
