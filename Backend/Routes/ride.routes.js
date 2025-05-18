import express from "express"
import { body } from "express-validator"
import { authUser } from "../Middlewares/auth.middleware.js"
import { createRideController } from "../Controllers/ride.controller.js"

const router = express.Router()

router.post("/createRide", authUser,
    [
        body("pickUpLocation").isString().isLength({ min: 3 }).withMessage("Pickup location needs to be atleast 3 characters long"),
        body("dropLocation").isString().isLength({ min: 3 }).withMessage("Drop location needs to be atleast 3 characters long"),
        body('vehicleType').isString().isIn(['auto', 'car', 'bike']).withMessage('Invalid vehicle type'),
    ]
    , createRideController)

export { router as rideRouter }