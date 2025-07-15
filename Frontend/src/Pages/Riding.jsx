import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import DriverInfo from '../components/DriverInfo'
import { SocketContext } from '../context/SocketContext'
import { useContext } from 'react'

const Riding = () => {

    const navigate = useNavigate()
    const location = useLocation();
    const rideData = location.state;

    const {socket} = useContext(SocketContext)

    socket.on("ride-ended",(data)=>{
        navigate("/home")
    })

    return (
        <div>
            <div className='absolute top-4 left-4'>
                <img className='h-10' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' />
            </div>
            <div onClick={() => navigate("/home")} className='absolute top-4 right-4 bg-white w-12 h-12 rounded-full flex justify-center items-center'>
                <i className="ri-home-2-line text-3xl font-bold"></i>
            </div>
            <div>
                <img className='h-[70vh] w-full object-cover' src='https://camo.githubusercontent.com/e0debd25d05c84be78d89bf7a2858c65e3cfecd72e95bd22ec50e85fa1f84cfb/68747470733a2f2f322e62702e626c6f6773706f742e636f6d2f2d574f70483738393364526b2f5733527372626f476678492f41414141414141414356552f767a6b39683975526262415777485633366a5455644b4f555552795946322d6167434c63424741732f73313630302f73637265656e73686f74362e706e67' />
            </div>

            <div
                className={`
          w-full bg-white absolute bottom-0 flex justify-center items-center min-h-[30vh]`}>
                <div className='w-[40%] flex flex-col items-center justify-center'>

                    <div className='w-full flex justify-between items-center'>
                        <img className='h-20 mb-4' src={rideData.confirmRide.image} />
                        <div className='flex flex-col'>
                            <p className='text-xl text-right'>{rideData.showDriverInfo.captain.firstName} {rideData.showDriverInfo.captain.lastName}</p>
                            <p className='text-2xl text-right'>{rideData.showDriverInfo.captain.vehicle.plate}</p>
                        </div>
                    </div>
                    <p className='pb-3 text-xl'><b>Destination: </b>{rideData.showDriverInfo.pickUpLocation}</p>
                    <p className='pb-3 text-xl'><b>Price: </b>{rideData.showDriverInfo.dropLocation}</p>
                    <button
                        // onClick={() => navigate("/userRiding")}
                        className='bg-green-700 px-10 py-3 rounded-2xl text-white font-bold cursor-pointer hover:bg-green-600'>
                        Make Payment
                    </button>


                </div>
            </div>

        </div>
    )
}

export default Riding