import { createRide } from "../services/ride.service.js"
import { validationResult } from "express-validator"

const createRideController = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }
    const { pickUpLocation, dropLocation, vehicleType } = req.body
    try {
        const response = await createRide( req.user._id, pickUpLocation, dropLocation, vehicleType )
        return res.status(200).json(response)

    } catch (error) {
        res.status(500).json({ message: "Error while creating ride", error: error })

    }
}

export { createRideController }