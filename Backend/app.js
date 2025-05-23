import dotenv from 'dotenv';
dotenv.config();
import express from "express"
import cors from "cors"
import { connectToDb } from './DB/db.js';
import { UserRouter } from './Routes/user.routes.js';
import { captainRouter } from './Routes/captain.routes.js';
import  {mapRouter} from "./Routes/maps.routes.js"
import { rideRouter } from './Routes/ride.routes.js';
import cookieParser from 'cookie-parser';

const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded())

app.use("/user",UserRouter)
app.use("/captain",captainRouter)
app.use("/maps",mapRouter)
app.use("/rides",rideRouter)


connectToDb()
//remove "0.0.0.0" later
app.listen(process.env.PORT,'0.0.0.0',()=>{
    console.log("Server is running on port:",process.env.PORT)
})