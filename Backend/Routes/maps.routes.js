import express from "express"
import { authUser } from "../Middlewares/auth.middleware.js";
import { getCoords, getDistanceTime, getSuggestions } from "../Controllers/maps.controller.js"
import { query } from "express-validator"

const router = express.Router()

router.get("/getCoord",
    query("address").isLength({ min: 3 }).withMessage("Address needs to be atleast 3 characters long")
    , authUser, getCoords)

router.get("/getDistanceTime", [
    query("current").isLength({ min: 3 }).withMessage("Current location needs to be atleast 3 characters long"),
    query("destination").isLength({ min: 3 }).withMessage("Destination needs to be atleast 3 characters long")
], authUser, getDistanceTime)

router.get("/getSuggestions",
    query("input").isLength({ min: 3 }).withMessage("Input needs to be atleast 3 characters long")
    , authUser, getSuggestions)

export { router as mapRouter }