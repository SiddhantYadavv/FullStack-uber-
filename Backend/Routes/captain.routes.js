import express from "express"
import {body} from "express-validator"
import captainController from "../Controllers/captain.controller.js"

const router=express.Router()

router.post("/registerCaptain",[
    body("email").isEmail().withMessage("Invalid Email").normalizeEmail(),
    body("firstName").isLength({ min: 3 }).withMessage("Firstname must be at least 3 characters long"),
    body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
    body("vehicle.color").isLength({min:3}).withMessage("Vehicle color must be at least 3 characters long"),
    body("vehicle.plate").isLength({min:3}).withMessage("Vehicle plate must be at least 3 characters long"),
    body("vehicle.capacity").isInt({min:1}).withMessage("Vehicle capacity must me atleast 1"),
    body("vehicle.vehicleType").isIn(["car","bike","auto"]).withMessage("Invalid vehicle type")
],captainController.registerCaptain)

router.post("/loginCaptain",[
    body("email").isEmail().withMessage("Invalid Email").normalizeEmail(),
    body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
],captainController.loginCaptain)

export  {router as captainRouter}