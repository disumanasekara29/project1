import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export function createUser(req,res){
    const passwordHash=bcrypt.hashSync(req.body.password,10)

    const userData={
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:passwordHash,
    }

    const user=new User(userData)
    user.save().then(
        ()=>{
            res.json({
                message:"user created successfully"
            })
        }
    ).catch(
        ()=>{
            res.json({
                message:"Faild to create user"
            })
        }
    )
}
export function loginUser(req,res){
    const email=req.body.email
    const password=req.body.password

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    User.findOne(
        {
            email:email
        }
    ).then(
        (user)=>{
            console.log("Found User:", user);
            if(user==null){
                res.status(404).json({
                    message:"User not Found"
                })
            }else{
                const ispasswordCorrect=bcrypt.compareSync(password,user.password);

                if(ispasswordCorrect){
                    const token=jwt.sign(
                        {
                            email:user.email,
                            firstName:user.firstName,
                            lastName:user.lastName,
                            role:user.role,
                            isBlocked:user.isBlocked,
                            isEmailVerified:user.isEmailVerified,
                            image:user.image
                        }
                        ,"cbc-6503"
                    )
                    
                    res.json({
                        token:token,
                        message:"Login successfull"
                    })
                }else{
                    res.status(401).json({
                        message:"Incorrect password"
                    })
                }
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: "Internal server error",
                error: err.message
            });
        });
}
   