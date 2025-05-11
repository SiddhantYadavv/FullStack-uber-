import mongoose from "mongoose";
import express, { json } from "express"
import { userModel } from "../Models/user.model.js";
import { validationResult } from "express-validator"
import bcrypt from "bcrypt"
import { blackListTokenModel } from "../Models/blackList.model.js";


const registerUser = async (req, res, next) => {
   try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() })
      }
      const { firstName, lastName, email, password } = req.body
   
      const existingUser = await userModel.findOne({ email })
      if (existingUser) {
         return res.status(400).json({ message: "User already exist with this email, try logging in" })
      }
   
      const hashedPassword = await userModel.hashPassword(password)
      const user = await userModel.create({ firstName, lastName, email, password: hashedPassword })
      const token = await user.generateAuthToken()
   
      res.status(201).json({ token, user })
   } catch (error) {
      res.status(500).json({message:"Error while registering in user"})

   }
}

const loginUser = async(req,res) =>{
   try {
      const errors =validationResult(req)
      if(!errors.isEmpty()){
         return res.status(400).json({errors:errors.array()})
      }
      const {email,password} = req.body
      const existingUser = await userModel.findOne({email}).select("+password")
      if(!existingUser){
         return res.status(400).json({message:"Invalid email or password"})
      } 
      const isMatch = await existingUser.comparePasswords(password)
      if(!isMatch){
         return res.status(400).json({message:"Invalid email or password"})
      }
      const token = await existingUser.generateAuthToken()
      res.cookie("token",token)
      res.status(200).json({token,existingUser})

   } catch (error) {
      res.status(500).json({message:"Error while logging in user"})
   }
}

const getUserProfile = async(req,res) =>{
   try {
      if(req.user!==null){
        return res.status(200).json(req.user)
    }
    else{
        return res.status(400).json({message:"Invalid User"})
    }
   } catch (error) {
      res.status(500).json({message:"Error while fetching user profile"})

   }
}

const logoutUser = async(req,res) => {
   try {
      const token = req.cookies.token || req.headers.authorization?.split(" ")[1]

      if(!token){
         return res.json({message:"NO TOKEN"})
      }
      res.clearCookie("token")
      // const token = req.cookies.token || req.headers.authorization?.split(" ")[1]
      await blackListTokenModel.create({token})
      res.status(200).json({message:"User Logged out successfully"})
      
   } catch (error) {
      
   }
}

export default { registerUser,loginUser,getUserProfile,logoutUser };