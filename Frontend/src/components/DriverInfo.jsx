import React from 'react'
import { useNavigate } from 'react-router-dom'

const DriverInfo = ({showDriverInfo,setShowDriverInfo,confirmRide}) => {

    const navigate = useNavigate()

  return (
    <>
        <div className='w-[40%] flex flex-col items-center justify-center'>
            {/* <h1 className='text-2xl font-bold mb-2'>{showDriverInfo? "Waiting for your ride ":"Confirm your Ride"}</h1> */}

            <div className='w-full flex justify-between items-center'>
                <img className='h-20 mb-4' src={confirmRide.image} />
                <div className='flex flex-col'>
                    <p className='text-xl text-right'>Driver Name</p>
                    <p className='text-2xl text-right'>Plate Number</p>
                    <p className='text-base text-right'>Car name</p>
                </div>
            </div>
            <p className='pb-3 text-xl'><b>Current Location: </b>{confirmRide.currentLocation}</p>
            <p className='pb-3 text-xl'><b>Destination: </b>{confirmRide.destination}</p>
            <p className='pb-3 text-xl'><b>Price: </b>{confirmRide.price}</p>
                <button onClick={() => navigate("/userRiding")} className='bg-green-700 px-10 py-3 rounded-2xl text-white font-bold cursor-pointer hover:bg-green-600'>Confirm Booking</button>

            <div onClick={() => {
                setShowDriverInfo(!showDriverInfo)
                }} className='absolute top-5 right-20'>
                <i className="ri-close-circle-line text-3xl"></i>
            </div>
        </div>
        </>
  )
}

export default DriverInfo