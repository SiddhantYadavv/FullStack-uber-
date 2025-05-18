import { getAddressCoordinates, getDistanceAndTime, getAutoCompleteSuggestions } from "../services/maps.service.js"
import { validationResult } from "express-validator"

const getCoords = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Address is not valid", error: errors.array() })
        }
        const { address } = req.query
        const response = await getAddressCoordinates(address)
        res.status(200).json( response )
    } catch (error) {
        res.status(500).json({ message: "Error getting the coordinates, try again later" })
    }
}

const getDistanceTime = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Current location and destination are required" })
        }
        const { current, destination } = req.query
        const response = await getDistanceAndTime(current, destination)
        res.status(200).json( response )

    } catch (error) {
        res.status(500).json({ message: "Error getting the distance and time, try again later" })
    }
}

const getSuggestions = async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({message:"Input is required", error:errors.array()})
        }
        const {input} = req.query
        const response = await getAutoCompleteSuggestions(input)
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({message:"Error getting suggestions for this input, try again later"})
    }
}

export { getCoords, getDistanceTime, getSuggestions }