import React, { useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import { showToastError, showToastInfo, showToastSuccess } from './Toast/ToastFunction'
import axios from 'axios'

const ConfirmRide = ({ confirmRide, setConfirmRide, setShowDriverInfo }) => {
    const [isWaiting, setIsWaiting] = useState(false)

    const handlePress = () => {
        setIsWaiting(true)
        createRide()
        // setTimeout(() => {
            // setShowDriverInfo(true)
            // setIsWaiting(false)
        // }, 2000);
    }

    const createRide = async (e) => {

        const token = localStorage.getItem("token")
        if (!token) {
            showToastError("Token does not exist")
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/rides/createRide`,
                {
                    pickUpLocation: confirmRide.pickUpLocation,
                    dropLocation: confirmRide.dropLocation,
                    vehicleType: confirmRide.vehicleType
                },
                { headers: { Authorization: `bearer ${token}` } })

        } catch (error) {
            showToastError("Could not create ride")

        }
    }

    return (
        <>
            <div className='w-[40%] flex flex-col items-center justify-center'>
                <h1 className='text-2xl font-bold mb-2'>{isWaiting ? "Waiting for your ride " : "Confirm your Ride"}</h1>

                <div>
                    <img className='h-20 mb-4' src={confirmRide.image} />
                </div>
                <p className='pb-3 text-xl'><b>Current Location: </b>{confirmRide.pickUpLocation}</p>
                <p className='pb-3 text-xl'><b>Destination: </b>{confirmRide.dropLocation}</p>
                <p className='pb-3 text-xl'><b>Price: </b>₹ {confirmRide.price}</p>
                <button onClick={() => isWaiting ? showToastInfo("Cancel Functionality is still in work") : handlePress()}
                    className='bg-green-700 px-10 py-3 rounded-2xl text-white font-bold cursor-pointer hover:bg-green-600'>
                    {isWaiting ? "Cancel" : "Confirm Booking"}
                </button>

                <div onClick={() => {
                    setConfirmRide(!confirmRide)
                    setIsWaiting(false)
                }} className='absolute top-5 right-20'>
                    <i className="ri-close-circle-line text-3xl"></i>
                </div>
            </div>
        </>
    )
}

export default ConfirmRide