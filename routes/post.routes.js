const express = require("express")
const postRouter = express.Router()
const {postModel}= require("../model/post.model")
const jwt= require("jsonwebtoken")
require("dotenv").config()

postRouter.get("/",async(req,res)=>{
    if(req.query && req.query.device){
        req.body.device= req.query.device
    }else if(req.query && req.query.device1 && req.query.device2){
        req.body.device ={$and :[req.query.device1,req.query.device2]}
    }
    try{
        const posts = await postModel.find(req.body)
        res.send(posts)
    }catch(err){
        console.log(err);
    }
})
postRouter.get("/user",async(req,res)=>{
    const token = req.headers.authorization
    const decoded =jwt.verify(token,"eve")
    try{
        const data = await postModel.find({userID : decoded.userID})
        res.send(data)
    }catch(err){
        console.log(err);
    }
})

postRouter.get("/users",async(req,res)=>{
   
    try{
        const data = await postModel.find()
        res.send(data)
    }catch(err){
        console.log(err);
    }
})

postRouter.post("/create",async(req,res)=>{
    const payload = req.body
    const postdata= new postModel(payload)
    await postdata.save()
    res.send("post added")
})

postRouter.patch("/update/:id",async(req,res)=>{
    const payload = req.body
    const postid = req.params.id
    const post = await postModel.findOne({"_id":postid})
    const user_id_post = post.userID
    const userid_mak_req = req.body.userID

    try{
        if(user_id_post !== userid_mak_req){
            res.send("not authorized")
        }else{
            await postModel.findByIdAndUpdate({_id:postid},payload)
            res.send("updated")
        }
    }catch(err){
        console.log(err);
    }
})

postRouter.delete("/delete/:id",async(req,res)=>{
    
    const postid = req.params.id
    const post = await postModel.findOne({"_id":postid})
    const user_id_post = post.userID
    const userid_mak_req = req.body.userID

    try{
        if(user_id_post !== userid_mak_req){
            res.send("not authorized")
        }else{
            await postModel.findByIdAndDelete({_id:postid})
            res.send("deleted")
        }
    }catch(err){
        console.log(err);
    }
})

module.exports={postRouter}