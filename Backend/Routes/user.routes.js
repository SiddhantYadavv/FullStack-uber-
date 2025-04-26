import mongoose from "mongoose";
import express from "express"
import {body} from "express-validator"
import userController from "../Controllers/user.Controller.js"
import { authUser } from "../Middlewares/auth.middleware.js";

const router=express.Router()

router.post("/register", [
    body("email").isEmail().withMessage("Invalid Email").normalizeEmail(),
    body("firstName").isLength({ min: 3 }).withMessage("Firstname must be at least 3 characters long"),
    body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
], userController.registerUser);

router.post("/login", [
    body("email").isEmail().withMessage("Invalid Email").normalizeEmail(),
    body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
],userController.loginUser)

router.get("/profile", authUser ,userController.getUserProfile)

router.get("/logout", authUser ,userController.logoutUser)


export  {router as UserRouter}