const express = require('express');
const { adminAuth, userAuth } = require('./Middlewares/auth');
const app = express();

const PORT=3000
app.use("/admin",adminAuth);
// app.use("/user",userAuth)
app.get("/admin/getalldata",(req,res)=>{
    res.send("All data sent");
});
app.get("/user/getalldata",userAuth, (req, res) => {
    console.log("User authenticated");
    
  res.send("User data");
});

app.get("/admin/deleteuser", (req, res) => {
  res.send("User deleted");
});


app.listen(PORT,()=>{
    console.log(`Server is Started at ${PORT}`);
    
})