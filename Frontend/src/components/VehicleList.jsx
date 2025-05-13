import React from 'react'
import 'remixicon/fonts/remixicon.css'

const VehicleList = ({ showVehicles, setShowVehicles,setConfirmRide}) => {
    const rideOptions = [
    {
        heading: "UberGo",
        capacity: 4,
        price: "₹120",
        remainingTime: "5 mins away",
        description: "Affordable rides for everyday travel",
        image: "https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png",
        currentLocation: "Connaught Place, New Delhi",
        destination: "Cyber City, Gurgaon"
    },
    {
        heading: "Moto",
        capacity: 1,
        price: "₹50",
        remainingTime: "3 mins away",
        description: "Affordable bike rides for quick trips",
        image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
        currentLocation: "Sector 18, Noida",
        destination: "Akshardham Temple, Delhi"
    },
    {
        heading: "Premier",
        capacity: 4,
        price: "₹200",
        remainingTime: "7 mins away",
        description: "Premium rides with top-rated drivers",
        image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1682350114/assets/c2/296eac-574a-4a81-a787-8a0387970755/original/UberBlackXL.png",
        currentLocation: "Huda City Centre, Gurgaon",
        destination: "IGI Airport, New Delhi"
    }
];


    return (
        <div className=' w-[500px] items-center justify-center'>
            <h1 className='text-2xl font-bold mb-2'>Choose a Vehicle</h1>
            {
                rideOptions.map((item, index) => {
                    return (
                        <div onClick={()=>setConfirmRide(item)} key={index} className='border active:border-black rounded-2xl border-gray-300 flex flex-row gap-3 items-center p-3 justify-evenly mb-5'>

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
                                <p>{item.price}</p>
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