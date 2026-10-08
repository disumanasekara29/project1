import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter.js";
import jwt from "jsonwebtoken";
import productRouter from "./routers/productRouter.js";
let app=express()
let connectionString="mongodb+srv://diproductionyt_db_user:diproduction123@cluster0.rh3urw2.mongodb.net/?appName=Cluster0"


//req handle
app.use(bodyParser.json())

app.use(
    (req,res,next)=>{
        const value=req.header("Authorization")
        if(value!=null){
            const token=value.replace("Bearer ","")
            jwt.verify(
                token,
                "cbc-6503",
                (err,decoded)=>{
                    if(decoded==null){
                        res.status(403).json({
                            message:"Unauthorized"
                        })
                    }else{
                        req.user=decoded
                        next()
                    }
                }
            )
        }else{
            next()
        }
    }
)

app.use("/users",userRouter)
app.use("/products",productRouter)
app.listen(5000,()=>{console.log("Server started")})


app.delete("/",()=>{console.log("this is a delete request")})


//mongodb connectioncheck
mongoose.connect(connectionString).then(
    ()=>{
        console.log("Connected to database")
    }
).catch(
    ()=>{
        console.log("Faild to connect database")
    }
)

