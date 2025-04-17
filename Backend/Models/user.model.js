import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt  from "jsonwebtoken";



const UserSchema= new mongoose.Schema({
    
        firstName:{
            type:String,
            required:true,
            minLength:[3,"First name should be atleast 3 letters"]
        },
        lastName:{
            type:String,
            minLength:[3,"Last name should be atleast 3 letters" ]
        },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    socketID:{
        type:String
    }
})

 UserSchema.methods.generateAuthToken= function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET)
    return token
}

UserSchema.methods.comparePasswords = async function (password) {
    const isTrue = await bcrypt.compare(password,this.password)
    return isTrue
}

UserSchema.statics.hashPassword = async function (password) {
    const hashedPassword = await bcrypt.hash(password,10)
    return hashedPassword
}

export const userModel = mongoose.model("user",UserSchema)