const express = require('express');
const app = express();

app.use((req,res)=>{
    res.send("Server is running ,hello there");
});

app.listen(3000,()=>{
    console.log("Server is Running");
    
});