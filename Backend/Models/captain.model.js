import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const captainSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,"First name should me atleast 3 characters long"]
    },
    lastName:{
        type:String,
        required:false,
        minLength:[3,"Last Name should be atleast 3 characters long"]
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        // match:[]
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    socketId:{
        type:String
    },
    status:{
        type:String,
        enum:["active","inActive"],
        default:"inActive"
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minLength:[3,"Color must me atleast 3 characters long"]
        },
        plate:{
            type:String,
            required:true,
            minLength:[3,"Plate must be 3 character long"]
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,"Capacity must me atleast 1"]
        },
        vehicleType:{
            type:String,
            required:true,
            enum:["car","bike","auto"]
        }

    },
    location:{
        lat:{
            type:Number
        },
        long:{
            type:Number
        }
    }
})

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:"24h"})
    return token
}

captainSchema.methods.comparePasswords = async function (password){
    return await bcrypt.compare(password,this.password)
}

captainSchema.statics.hashPassword = async function(val){
    return await bcrypt.hash(val,10)
}

export const captainModel = mongoose.model("captain",captainSchema)