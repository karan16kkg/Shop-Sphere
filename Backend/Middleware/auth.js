const express = require("express")
const signup = express();
const db = require("../connection.js")
const bcrypt = require("bcryptjs");
const generateToken = require("./generateToken.js");
const jwt = require("jsonwebtoken")

signup.get("/sellers",(req,res)=>{
    let role = "seller";

    db.query('SELECT * FROM users WHERE role = ?',[role],(error,results)=>{
        if(error){
            return res.send({message:"Database Error"});
        }

        res.send(results)
    })
})

signup.post("/signup",async (req,res)=>{
    let{name,email,password,role,pic} = req.body;

    if(!name || !email || !password){
        return res.send({Message:"All Fields Required"})
    }
    const newPass = await bcrypt.hash(password.toString(),10);
    
    db.query('SELECT email FROM users WHERE email = ?',[email],(error,results)=>{
        if(error){
            return res.send({message:"Database Error"})
        }

        if(results.length > 0){
            return res.send({message:"User Already Exists ❌"})
        }
        
        if(role){
            if(pic){
                db.query('INSERT INTO users (name,email,password,role,pic) VALUES (?,?,?,?,?)',[name,email,newPass,role,pic],(error)=>{
                    if(error){
                        return res.send({message:"Signup Failed ❌"})
                    }
        
                    res.status(201).send({message:"User Account Created Successfully  ✅"})
                })
            }
            else{
                db.query('INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)',[name,email,newPass,role],(error)=>{
                    if(error){
                        return res.send({message:"Signup Failed ❌"})
                    }
        
                    res.status(201).send({message:"User Account Created Successfully  ✅"})
                })
            }
        }
        else{
            db.query('INSERT INTO users (name,email,password) VALUES (?,?,?)',[name,email,newPass],(error)=>{
                if(error){
                    return res.send({message:"Signup Failed ❌",error})
                }
    
                res.status(201).send({message:"User Account Created Successfully  ✅"})
            })
        }
    })
})

signup.post("/login",async(req,res)=>{
    let{email,password} = req.body;

    if(!email || !password){
        return res.send({message:"All Fields Required"});

    }

    db.query('SELECT*FROM users WHERE email = ?',[email],async(error,results)=>{
        if(error){
            return res.status(500).send({message:"Database Error"})
        }

        if(results.length == 0){
            return res.send({message:"User Not Found ❌"})
        }

        const user = results[0];

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.send({ message: "Invalid Email or Password ❌" });
        }

        res.status(200).send({
            message:"Login Successful  ✅",
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            pic:user.pic,
            token:generateToken(user.id,user.email)
        })
    })
})

signup.post("/jwtverify",(req,res)=>{
    let {token} = req.body; 
    if(!token){
        return res.send({message:"Token is required"});
    }

    jwt.verify(token,"secret",(error,decode)=>{
        if(error){
            return res.send({message:"Invalid or expired token"})
        }

        else{
            const {id} = decode;
            return res.status(200).json({ 
                message: "Token is valid", 
                valid: true,
                id
            });
        }
    })
})




module.exports = signup