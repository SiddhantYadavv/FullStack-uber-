import { validationResult } from "express-validator"
import { captainModel } from "../Models/captain.model.js"
import { blackListTokenModel } from "../Models/blackList.model.js"

const registerCaptain = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { firstName, lastName, email, password, vehicle } = req.body

        const existingCap = await captainModel.findOne({ email })
        if (existingCap) {
            return res.status(400).json({ message: "Captain already exist with this email, try logging in" })
        }
        const hashedPassword = await captainModel.hashPassword(password)
        const captain = await captainModel.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            vehicle: {
                color: vehicle.color,
                plate: vehicle.plate,
                capacity: vehicle.capacity,
                vehicleType: vehicle.vehicleType
            }
        })
        const token = await captain.generateAuthToken()

        res.status(201).json({ token, captain })
    } catch (error) {
        res.status(500).json({ message: "Error while registering in captain" })

    }
}

const loginCaptain = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { email, password } = req.body
        
        const existingCap = await captainModel.findOne({ email }).select("+password")
        if (!existingCap) {
            return res.status(400).json({ message: "Invalid email or password" })
        }
        const isMatch = await existingCap.comparePasswords(password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" })
        }
        const token = await existingCap.generateAuthToken()
        res.cookie("token", token)
        res.status(200).json({ token, existingCap })

    } catch (error) {
        res.status(500).json({ message: "Error while logging in captain" })
    }
}

const getUserProfile= async(req,res)=>{
try {
    if(req.user!==null){
        return res.status(200).json(req.user)
    }
    else{
        return res.status(400).json({message:"Invalid User"})
    }
} catch (error) {
    res.status(500).json({ message: "Error while fetching captain details" })

}
}

const logoutCaptain= async(req,res)=>{
   try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]
    if(!token){
        res.status(401).json({message:"Token does not exist"})
    }
    res.clearCookie("token")
    await blackListTokenModel.create({token})
    res.status(200).json({message:"User Logged out successfully"})

   } catch (error) {
    res.status(500).json({message:"Error logging out captain"})

   }
}

export default { registerCaptain, loginCaptain, getUserProfile, logoutCaptain };
