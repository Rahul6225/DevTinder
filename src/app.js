const express = require("express");
const app = express();
require("./configs/db.js");
const { ConnectDB } = require("./configs/db.js");
const User = require("./models/user");
app.use(express.json());

//most of the Api getting data or posting data return a  promise then we have to put into async await
app.post("/signup", async (req, res) => {
  console.log(req.body);
  // Crete new instance of new user model
  const user = new User(req.body)
  try{
    await user.save();
    res.send("User added succefully")
  }catch(err){
    res.status(400).send("Error saving the user:"+err.message);
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
