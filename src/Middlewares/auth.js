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

module.exports = {adminAuth};