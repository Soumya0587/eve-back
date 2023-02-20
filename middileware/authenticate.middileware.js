const jwt = require("jsonwebtoken")
const authenticate=(req,res,next)=>{
    const token = req.headers.authorization
    if(token){
        jwt.verify(token,"eve",(err,decoded)=>{
            if(decoded){
                req.body.userID = decoded.userID
                next()
            }else{
                res.send({"msg":"please login first"})
            }
        })
    }else{
        res.send({"msg":"please login first"})
    }
}

module.exports={authenticate}