import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    pickUpLocation: {
        type: String,
        required: true
    },
    dropLocation: {
        type: String,
        required: true
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "captain"
    },
    fare: {
        type: Number
    },
    duration: {
        type: Number
    },
    distance: {
        type: Number
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', "ongoing", 'completed', 'cancelled'],
        default: 'pending',
    },
    paymentID: {
        type: String,
    },
    orderId: {
        type: String,
    },
    signature: {
        type: String,
    },

    otp: {
        type: String,
        select: false,
        required: true,
    },
})

export const rideModel = mongoose.model("ride",rideSchema)