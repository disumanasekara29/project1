import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import Student from "./models/student.js";
import studentRouter from "./routers/studentRouter.js";
import userRouter from "./routers/userRouter.js";
import jwt from "jsonwebtoken";
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

app.use("/Students",studentRouter)
app.use("/users",userRouter)
app.post("/",
    (req,res)=>{
        console.log(req.body)
        const student=new Student(
            {
                name:req.body.name,
                age:req.body.age,
                email:req.body.email
            }
        )
        student.save().then(
            ()=>{
                res.json(
                    {
                        message:"student saved successfully"
                    }
                )
            }
        ).catch(
            ()=>{
                console.log("Faild to save student")
            }
        )
    }
)
app.listen(5000,()=>{console.log("Server started")})


app.get("/",
    (req,res)=>{
        Student.find().then(
            (students)=>{
                res.json(students)
            }
        ).catch(
            ()=>{
                res.json({
                    message:"Faild to fetch students"
                })
            }
        )
    }
)

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

