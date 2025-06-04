import { createRide, getFare } from "../services/ride.service.js"
import { validationResult } from "express-validator"
import {getCaptainInTheRadius,getAddressCoordinates} from "../services/maps.service.js"
import {sendMessageToSocketId} from "../socket.js"


const createRideController = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }
    const { pickUpLocation, dropLocation, vehicleType } = req.body
    try {
        const response = await createRide( req.user._id, pickUpLocation, dropLocation, vehicleType )
        res.status(200).json(response)
        
        const pickUpCoordinates = await getAddressCoordinates(pickUpLocation)
        const captainsInRadius = await getCaptainInTheRadius(pickUpCoordinates.ltd,pickUpCoordinates.lng,2)
        response.otp=""
        captainsInRadius.map((captain)=>{
            sendMessageToSocketId(captain._id,{
                event : "new-ride",
                data:response
            })
        })

    } catch (error) {
        res.status(500).json({ message: "Error while creating ride", error: error })

    }
}

const getFareController = async(req,res) => {
   try {
      const errors=validationResult(req)
      if(!errors.isEmpty()){
         return res.status(400).json({message:"Invalid Input",error:errors.array()})
      }
      const {pickUpLocation,dropLocation}=req.query
      const response = await getFare(pickUpLocation,dropLocation)
      return res.status(200).json({message:"Fare Created",response})
      
   } catch (error) {
      console.log("Could'nt get fare",error)
   }
}

export { createRideController,getFareController }