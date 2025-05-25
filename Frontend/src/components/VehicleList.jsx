import axios from 'axios';
import React, { useEffect } from 'react'
import 'remixicon/fonts/remixicon.css'
import { showToastError } from './Toast/ToastFunction';

const VehicleList = ({ showVehicles, setShowVehicles, setConfirmRide, pickUpLocation, dropLocation, setFare, fare }) => {

    const rideOptions = [
        {
            heading: "UberGo",
            capacity: 4,
            price: "₹120",
            remainingTime: "5 mins away",
            description: "Affordable rides for everyday travel",
            image: "https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png",
            pickUpLocation: pickUpLocation,
            dropLocation: dropLocation,
            vehicleType: "car"
        },
        {
            heading: "Moto",
            capacity: 1,
            price: "₹50",
            remainingTime: "3 mins away",
            description: "Affordable bike rides for quick trips",
            image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
            pickUpLocation: pickUpLocation,
            dropLocation: dropLocation,
            vehicleType: "bike"
        },
        {
            heading: "Auto",
            capacity: 4,
            price: "₹200",
            remainingTime: "7 mins away",
            description: "Affordable travel by auto rickshaw",
            image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png",
            pickUpLocation: pickUpLocation,
            dropLocation: dropLocation,
            vehicleType: "auto"
        }
    ];


    const getFare = async (e) => {

        const token = localStorage.getItem("token")
        if (!token) {
            showToastError("Token does not exist")
        }
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/rides/getFare?pickUpLocation=${pickUpLocation}&dropLocation=${dropLocation}`, { headers: { Authorization: `bearer ${token}` } })
            setFare(response.data.response)

        } catch (error) {
            showToastError("Could'nt get fare")

        }
    }

    useEffect(() => {

        getFare()

    }, [])


    return (
        <div className=' w-[500px] items-center justify-center'>
            <h1 onClick={() => getFare()} className='text-2xl font-bold mb-2'>Choose a Vehicle</h1>
            {
                rideOptions.map((item, index) => {
                    return (
                        <div onClick={() => setConfirmRide({ ...item, price: fare[item.vehicleType] })} key={index} className='border active:border-black rounded-2xl border-gray-300 flex flex-row gap-3 items-center p-3 justify-evenly mb-5'>

                            <div><img className='h-14' src={item.image} /></div>

                            <div>
                                <div className='flex flex-row items-center'>
                                    <h4 className='text-xl mr-2'>{item.heading}</h4>
                                    <div><i class="ri-user-fill"></i></div>
                                    <p>{item.capacity}</p>
                                </div>
                                <div className='flex flex-row items-center'>
                                    <p>{item.remainingTime}</p>
                                </div>
                                <div>
                                    {item.description}
                                </div>
                            </div>

                            <div>
                                <p>₹ {fare[item.vehicleType]}</p>
                            </div>
                        </div>
                    )
                })
            }
            <div onClick={() => setShowVehicles(!showVehicles)} className='absolute top-5 right-20'>
                <i className="ri-close-circle-line text-3xl"></i>
            </div>
        </div>
    )
}

export default VehicleList