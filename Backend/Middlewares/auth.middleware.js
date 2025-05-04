import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { userModel } from "../Models/user.model.js"
import { blackListTokenModel } from "../Models/blackList.model.js"
import { captainModel } from "../Models/captain.model.js"


 const authUser = async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]
    if (!token){
        return res.status(400).json({message:"Unauthorized access"})
    }
    const isBlackListed = await blackListTokenModel.findOne({token})
    if(isBlackListed){
        return res.status(400).json({message:"Unauthorized access B"})
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await userModel.findById(decoded._id)
        req.user=user
        return next()
    }
    catch(err){
        return res.status(500).json({message:"Unauthorized access"})
    }
}

const authCaptain = async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]
    if (!token){
        return res.status(400).json({message:"Unauthorized access"})
    }
    const isBlackListed = await blackListTokenModel.findOne({token})
    if(isBlackListed){
        return res.status(400).json({message:"Unauthorized access B"})
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await captainModel.findById(decoded._id)
        req.user=user
        return next()
    }
    catch(err){
        return res.status(500).json({message:"Unauthorized access"})
    }
}

export {authUser,authCaptain}