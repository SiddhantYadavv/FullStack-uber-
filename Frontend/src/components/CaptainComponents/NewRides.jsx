import React from 'react'

const NewRides = ({closeAll,setConfirmRidePanelOpen,rideData}) => {
  return (
     <div className='w-[30%]'>
        <h1 className='text-2xl my-2 font-bold'>New Ride Available</h1>
        <div className='flex flex-row justify-between bg-amber-200 rounded-xl px-6'>
            <div className='flex flex-row items-center'>
                <img className='h-20 w-20 rounded-full object-contain' 
                src='https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D'/>
                <p className='text-xl ml-4 font-bold'>{rideData?.user?.firstName+" "+rideData?.user?.lastName}</p>
            </div>
            <div className='flex items-center'>
                <p className='text-xl font-bold'>2.9 KM</p>
            </div>
        </div>

        <div className='flex flex-col justify-center items-center py-6 gap-2'>
            <p className='text-xl'><b>Pickup location:</b> {rideData?.pickUpLocation}</p>
            <p className='text-xl'><b>Destination:</b> {rideData?.dropLocation}</p>
            <p className='text-xl'><b>Amount:</b>{rideData?.fare}</p>
        </div>

        <div className='flex flex-row justify-evenly px-6'>
            <button onClick={()=>setConfirmRidePanelOpen(true)} className='bg-green-700 text-white text-xl font-bold px-10 py-3 rounded-xl cursor-pointer hover:bg-green-600'>Accept</button>
            <button onClick={()=>closeAll()} className='bg-red-700 text-white text-xl font-bold px-10 py-3 rounded-xl cursor-pointer hover:bg-red-600'>Reject</button>
             
        </div>


    </div>
  )
}

export default NewRides