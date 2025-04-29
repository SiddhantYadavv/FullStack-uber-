import dotenv from 'dotenv';
dotenv.config();
import express from "express"
import cors from "cors"
import { connectToDb } from './DB/db.js';
import { UserRouter } from './Routes/user.routes.js';
import cookieParser from 'cookie-parser';

const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded())

app.use("/user",UserRouter)

connectToDb()

app.listen(process.env.PORT,()=>{
    console.log("Server is running on port:",process.env.PORT)
})