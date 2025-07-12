import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { toast } from 'sonner'
import { showToastError } from '../Toast/ToastFunction'

const ConfirmRide = ({ closeAll, rideData }) => {

    const navigate = useNavigate()

    const [OTP, setOTP] = useState("")

    const formHandler = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem("token")
            if (!token) {
                return showToastError("Token does not exist")
            }
            if (OTP.length !== 4 && rideData.otp !== OTP) {
                return showToastError("Enter a valid OTP")
            }
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/rides/startRide`,
                {
                    rideId: rideData._id,
                    otp: OTP
                },
                { headers: { Authorization: `bearer ${token}` } })
            if (response.status === 200) {
                navigate("/captainRiding", { state: rideData })
            }

        } catch (error) {
            showToastError(error?.response.data.message || error.message)

        }
        // navigate("/captainRiding")
    }


    return (
        <div className='w-[30%]'>
            <h1 className='text-2xl my-2 font-bold'>Confirm this ride to start</h1>
            <div className='flex flex-row justify-between bg-amber-200 rounded-xl px-6'>
                <div className='flex flex-row items-center'>
                    <img className='h-20 w-20 rounded-full object-contain'
                        src='https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D' />
                    <p className='text-xl ml-4 font-bold'>{rideData?.user.firstName} {rideData?.user.lastName}</p>
                </div>
                <div className='flex items-center'>
                    <p className='text-xl font-bold'>2.9 KM</p>
                </div>
            </div>

            <div className='flex flex-col justify-center items-center py-6 gap-2'>
                <p className='text-xl'><b>Current location:</b> {rideData?.pickUpLocation}</p>
                <p className='text-xl'><b>Destination:</b>{rideData?.dropLocation}</p>
                <p className='text-xl'><b>Amount:</b> ₹ {rideData?.fare}</p>
            </div>

            <form onSubmit={formHandler} className='flex flex-col gap-3 justify-evenly px-6'>
                <input type="text" value={OTP} onChange={(e) => setOTP(e.target.value)} placeholder='Enter OTP' className='border border-gray-300 py-3 px-6 rounded-2xl' />
                <button type='submit' onSubmit={() => formHandler()} className='bg-green-700 text-white text-center text-xl font-bold px-10 py-3 rounded-xl cursor-pointer hover:bg-green-600'>Confirm</button>
                <button type='button' onClick={() => closeAll()} className='bg-red-700 text-white text-xl font-bold px-10 py-3 rounded-xl cursor-pointer hover:bg-red-600'>Reject</button>
            </form>


        </div>
    )
}

export default ConfirmRide