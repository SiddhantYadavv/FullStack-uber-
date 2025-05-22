import React from 'react'
import 'remixicon/fonts/remixicon.css'

const LocationSearchPanel = ({ setShowFull, setShowVehicles, showFull, showVehicles, autoSuggestData, selectedInput, setPickUpLocation, setDropLocation, setAutoSuggestData, pickUpLocation, dropLocation }) => {

if(!pickUpLocation&&!dropLocation){
    return <div>Try searching ...</div>
}
    return (
        <div className='w-[40%] h-[70vh] overflow-x-scroll hide-scrollbar flex items-center flex-col'>
            {(pickUpLocation && dropLocation) && <button className='bg-black text-white py-3 px-10 rounded-2xl hover:cursor-pointer hover:bg-gray-800'> Find Ride</button>}

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
        </div>
    );

}

export default LocationSearchPanel