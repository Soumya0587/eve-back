const express = require("express")
const {connection}=require("./config/db")
const cors=require("cors")
const {userrouter}=require("./routes/user.routes")
const {postRouter}=require("./routes/post.routes")
const {authenticate}=require("./middileware/authenticate.middileware")
require("dotenv").config()
const app=express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("welcome home")
})
app.use("/users",userrouter)
app.use(authenticate)
app.use("/posts",postRouter)
app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connected to db")
    }catch(err){
        console.log(err);
    }
    console.log(`server is running at ${process.env.port}`)
})