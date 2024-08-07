import express from "express";
import bcrypt from "bcrypt"
import { getUserByEmail } from "../controllers/user.js"
import { generateToken } from "../auth/auth.js";
import { User } from "../models/user.js";

const router=express.Router()

router.post("/login",async(req,res)=>{
    try {
       //user exist
       const user= await getUserByEmail(req);
       if(!user){
        return res.status(400).json({error:"invalid email"})
       }
       //validating password
       const vaildPassword=await bcrypt.compare(
        req.body.password,
        user.password
       );
       if(!vaildPassword){
        return res.status(400).json({error:"invalid password"})
       }
       const token=generateToken(user._id);
       res.status(200).json({data:"logged in successfully",token})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"interal server error"})
    }
})
router.post("/signup",async(req,res)=>{
    try {
        //already exist
        let user=await getUserByEmail(req)
        if(user){
            res.status(400).json({error:"User already exist"})
        }
        //generate hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(req.body.password,salt)
        user=await new User({
            ...req.body,
            password:hashedPassword,
    }).save();
    const token=generateToken(user._id)
    res.status(201).json({data:"successfully register",token})         
    } catch (error) {
        console.log("meena",error)
        res.status(500).json({error:"interal server error"})
        
    }
});

export const userRouter=router;