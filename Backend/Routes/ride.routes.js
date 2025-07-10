import express from "express"
import { body, query } from "express-validator"
import { authCaptain, authUser } from "../Middlewares/auth.middleware.js"
import { createRideController, getFareController, confirmRide } from "../Controllers/ride.controller.js"

const router = express.Router()

router.post("/createRide", authUser,
    [
        body("pickUpLocation").isString().isLength({ min: 3 }).withMessage("Pickup location needs to be atleast 3 characters long"),
        body("dropLocation").isString().isLength({ min: 3 }).withMessage("Drop location needs to be atleast 3 characters long"),
        body('vehicleType').isString().isIn(['auto', 'car', 'bike']).withMessage('Invalid vehicle type'),
    ]
    , createRideController)


router.get("/getFare", [
    query("pickUpLocation").isLength({ min: 3 }).withMessage("Pickup location must be atleast 3 characters long"),
    query("dropLocation").isLength({ min: 3 }).withMessage("Drop location must be atleast 3 characters long")
], authUser, getFareController)


router.post("/confirmRide", authCaptain,
    [
    body("rideId").isMongoId().withMessage("Invalid ride ride")
    ], confirmRide)

export { router as rideRouter }