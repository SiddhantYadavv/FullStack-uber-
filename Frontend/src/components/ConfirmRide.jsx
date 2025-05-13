import React, { useState } from 'react'
import 'remixicon/fonts/remixicon.css'

const ConfirmRide = ({ confirmRide, setConfirmRide }) => {
    const [isWaiting,setIsWaiting]=useState(false)

    return (
        <>
        <div className='w-[40%] flex flex-col items-center justify-center'>
            <h1 className='text-2xl font-bold mb-2'>{isWaiting? "Waiting for your ride ":"Confirm your Ride"}</h1>

            <div>
                <img className='h-20 mb-4' src={confirmRide.image} />
            </div>
            <p className='pb-3 text-xl'><b>Current Location: </b>{confirmRide.currentLocation}</p>
            <p className='pb-3 text-xl'><b>Destination: </b>{confirmRide.destination}</p>
            <p className='pb-3 text-xl'><b>Price: </b>{confirmRide.price}</p>
            <button onClick={()=>setIsWaiting(!isWaiting)} className='bg-green-700 px-10 py-3 rounded-2xl text-white font-bold cursor-pointer hover:bg-green-600'>{isWaiting? "Cancel":"Confirm Booking"}</button>

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