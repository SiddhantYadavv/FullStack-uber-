import { rideModel } from "../Models/ride.model.js"
import { getDistanceAndTime } from "./maps.service.js"


const getFare = async (pickUpLocation, dropLocation) => {
    const baseFare = {
        car: 50,
        auto: 30,
        bike: 20
    }
    const perKmPrice = {
        car: 15,
        auto: 10,
        bike: 8
    }
    const perMinRate = {
        car: 6,
        auto: 4,
        bike: 2
    }
    try {
        const distanceAndTime = await getDistanceAndTime(pickUpLocation, dropLocation)
        const distanceInKms = Number((distanceAndTime.distance.value / 1000).toFixed(3))
        const timeInMins = Number((distanceAndTime.duration.value / 60).toFixed(3))

        const fare = {
            car: Math.ceil(baseFare.car + (perKmPrice.car * distanceInKms) + (perMinRate.car * timeInMins)),
            auto: Math.ceil(baseFare.auto + (perKmPrice.auto * distanceInKms) + (perMinRate.auto * timeInMins)),
            bike: Math.ceil(baseFare.bike + (perKmPrice.bike * distanceInKms) + (perMinRate.bike * timeInMins)),
        }
        return fare

    } catch (error) {
        console.log("Error generating fare", error)
    }
}

const generateOTP = async () => {
  const numbers = "0123456789";
  let generatedOTP = "";
  for (let i = 0; i < 4; i++) {
    generatedOTP += numbers[Math.floor(Math.random() * numbers.length)];
  }
  return generatedOTP;
};

const createRide = async (user, pickUpLocation, dropLocation, vehicleType) => {
    if (!user || !pickUpLocation || !dropLocation || !vehicleType) {
        throw new Error("All fields are required for creating rides")
    }
    try {

        const OTP= await generateOTP()
        const fareResult = await getFare(pickUpLocation, dropLocation)
        const fare = Number(fareResult[vehicleType].toFixed(2))

        const ride = await rideModel.create({
            user,
            pickUpLocation,
            dropLocation,
            fare,
            otp:OTP
        })

        return ride

    } catch (error) {
        console.log("Error at ride service",error)
    }
}

export { createRide,getFare}