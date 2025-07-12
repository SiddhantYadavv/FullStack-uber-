import { createRide, getFare } from "../services/ride.service.js"
import { validationResult } from "express-validator"
import { getCaptainInTheRadius, getAddressCoordinates } from "../services/maps.service.js"
import { sendMessageToSocketId } from "../socket.js"
import { rideModel } from "../Models/ride.model.js"


const createRideController = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }
    const { pickUpLocation, dropLocation, vehicleType } = req.body
    try {
        const response = await createRide(req.user._id, pickUpLocation, dropLocation, vehicleType)
        res.status(200).json(response)

        const pickUpCoordinates = await getAddressCoordinates(pickUpLocation)
        const captainsInRadius = await getCaptainInTheRadius(pickUpCoordinates.ltd, pickUpCoordinates.lng, 2)
        response.otp = ""
        const rideWithUser = await rideModel.findOne({ _id: response._id }).populate("user").select("+otp")

        captainsInRadius.map((captain) => {
            sendMessageToSocketId(captain.socketId, {
                event: "new-ride",
                data: rideWithUser
            })
        })

    } catch (error) {
        res.status(500).json({ message: "Error while creating ride", error: error })

    }
}

const getFareController = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Invalid Input", error: errors.array() })
        }
        const { pickUpLocation, dropLocation } = req.query
        const response = await getFare(pickUpLocation, dropLocation)
        return res.status(200).json({ message: "Fare Created", response })

    } catch (error) {
        console.log("Could'nt get fare", error)
    }
}

const confirmRide = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Invalid Input", error: errors.array() })
        }
        const { rideId } = req.body
        const captainId = req.user._id

        await rideModel.findOneAndUpdate({ _id: rideId }, { status: "accepted", captain: captainId })
        await rideModel.findOneAndUpdate({ _id: rideId }, { status: "accepted" })

        const ride = await rideModel.findById(rideId).populate("user").populate("captain").select("+otp")
        if (!ride) {
            throw new Error("Ride not found")
        }
        sendMessageToSocketId(ride.user.socketId,{
            event:"ride-confirmed",
            data:ride
        })
        return res.status(200).json({ message: "Ride details fetched", ride })
    } catch (error) {
        res.status(500).json({ message: "Error while confirming ride", error: error })

    }
}

const startRide = async (req,res)=> {
    try {
      const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Invalid Input", error: errors.array() })
        }
        const { rideId,otp } = req.body  
        const ride = await rideModel.findById(rideId).populate("user").populate("captain").select("+otp")
        if(!ride){
            throw new Error("Ride not found")
        }
        if(ride.otp!==otp){
             throw new Error("OTP does not found")
        }
         await rideModel.findOneAndUpdate({_id:rideId},{status:"ongoing"})
        sendMessageToSocketId(ride.user.socketId,{
            event:"ride-started",
            data:ride
        })
        return res.status(200).json({ message: "Ride Started", ride })
    } catch (error) {
         res.status(500).json({ message: "Error while starting ride", error: error.message })
    }
}

export { createRideController, getFareController, confirmRide,startRide }