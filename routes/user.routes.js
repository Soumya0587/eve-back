const express = require("express")
const {userModel}=require("../model/user.model")
const bcrypt = require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config()

const userrouter = express.Router()

userrouter.post("/register",async(req,res)=>{
    const {name, email,gender,password,age,city}=req.body
    try{
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.send({"msg":"something went wrong",err:err.message})
            }
            const user = new userModel({name,email,gender,password:hash,age,city})
            await user.save()
            res.send("registered")
        })
    }catch(err){
        console.log(err);
    }
})

userrouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try{
        const user = await userModel.find({email})
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result){
                    const token = jwt.sign({userID:user[0]._id},"eve")
                    res.send({"msg":"succesfully login",token:token})
                }else{
                    res.send({"msg":"something went wrong",err:err.message})
                }
            })
        }else{
            res.send({"msg":"something went wrong"})
        }
    }catch(err){
        console.log(err);
    }
})

module.exports = {userrouter}