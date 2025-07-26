const express = require("express");
const app = express();

//Orders of the routes matters a lot 

// app.use("/", (req, res) => {
//   res.send("slash");
// });
app.use("/hello", (req, res) => {
  res.send("slash hello");
});

app.get('/users',(req,res)=>{
    res.send({firstname:"Rahul",lastname:"Singh"});
})

app.listen(3000, () => {
  console.log("Server is Running");
});
