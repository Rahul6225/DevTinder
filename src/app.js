const express = require("express");
const app = express();

//Orders of the routes matters a lot 

// app.use("/", (req, res) => {
//   res.send("slash");
// });
app.use("/hello", (req, res,next) => {
  next();
  res.send("slash hello");
},
(req,res)=>{
  console.log("hello this is next");
  res.send("this is next")
}
);


app.get('/users',(req,res)=>{
    res.send({firstname:"Rahul",lastname:"Singh"});
})

app.listen(3000, () => {
  console.log("Server is Running");
});
