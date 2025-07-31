const adminAuth = (req,res,next)=>{
    console.log("Admin auth is getting checked!");
    const token = "xyz";
    const IsAdminAutherized = token ==="xyz";
    if(!IsAdminAutherized){
        res.status(401).send("Unauthorized messsage")
    }else{
        next();
    }
}

const userAuth = (req,res,next)=>{
    console.log("Admin auth is checked");
    const token = "pdss";
    const userValid = token === "pass";
    if(!userValid){
        console.log(res.status(401).send("User is not authorized"));
        
    }else{
        next();
    }
    
}

module.exports = {adminAuth,userAuth};