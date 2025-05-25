import React from 'react'
import 'remixicon/fonts/remixicon.css'
import axios from "axios"
import { useState } from 'react'




const LocationSearchPanel = ({ setShowFull, setShowVehicles, showFull, showVehicles, autoSuggestData, selectedInput, setPickUpLocation, setDropLocation, setAutoSuggestData, pickUpLocation, dropLocation,distanceAndTime,setDistanceAndTime }) => {
    
    const token = localStorage.getItem("token")
    
    const getDistanceAndTime = async (e) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/maps/getDistanceTime?current=${pickUpLocation}&destination=${dropLocation}`, { headers: { Authorization: `bearer ${token}` } })
        // alert(response.data.distance.text)
       
    const { distance, duration } = response.data;

    setDistanceAndTime({ distance, duration});
    setShowFull(false)
    setShowVehicles(true)
    } catch (error) {
      showToastError("Could'nt search ")

    }
  }
if(!pickUpLocation&&!dropLocation){
    return <div>Try searching ...</div>
}
    return (
        <div className='w-[40%] h-[70vh] overflow-x-scroll hide-scrollbar flex items-center flex-col'>

            {autoSuggestData.length === 0 && !(pickUpLocation && dropLocation) && (
                <p>Try searching</p>
            )}
            {(autoSuggestData.map((item, index) => (
                <div onClick={() => {
                    selectedInput === "pickUpLocation"
                        ? setPickUpLocation(item)
                        : setDropLocation(item);
                    setAutoSuggestData([]);
                }}
                    className='my-1 active:border-black flex flex-row items-center border border-gray-300 p-2 rounded-2xl mb-3 cursor-pointer'
                    key={index}>
                    <div className='mr-2 text-2xl'>
                        <i className="ri-map-pin-line"></i>
                    </div>
                    <div>
                        <p className='text-2xl'>{item}</p>
                    </div>
                </div>
            ))
            )}

            {(pickUpLocation && dropLocation) && <button onClick={()=>getDistanceAndTime()} className='bg-black text-white py-3 px-10 rounded-2xl hover:cursor-pointer hover:bg-gray-800'> Find Ride</button>}


        </div>
    );

}

export default LocationSearchPanel