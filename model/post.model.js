const mongoose = require("mongoose")
const LinkdinpostSchema = mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    device:{type:String,required:true},
    no_if_comments :{type:Number,required:true},
    userID:String

})

const postModel = mongoose.model("post",LinkdinpostSchema)
module.exports={postModel}