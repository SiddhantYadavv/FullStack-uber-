import mongoose from "mongoose";

export const connectToDb=()=>{
  try {
      mongoose.connect(process.env.DB_CONNECT,{dbName:process.env.DB_NAME})
     console.log("DB Connected")
      
  } catch (error) {
    console.error("Error while connecting to DB",error)
  }
}