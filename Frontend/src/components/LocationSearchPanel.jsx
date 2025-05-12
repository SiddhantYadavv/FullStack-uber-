import React from 'react'
import 'remixicon/fonts/remixicon.css'

const LocationSearchPanel = () => {
    const addressData = [
        {
            name: "Cafe Coffee Day",
            location: "Connaught Place, New Delhi, Delhi 110001"
        },
        {
            name: "Saravana Bhavan",
            location: "T. Nagar, Chennai, Tamil Nadu 600017"
        },
        {
            name: "Taj Mahal",
            location: "Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001"
        },
        {
            name: "Phoenix Marketcity Mall",
            location: "Kurla West, Mumbai, Maharashtra 400070"
        },
        {
            name: "Bangalore Palace",
            location: "Vasanth Nagar, Bengaluru, Karnataka 560052"
        },
        {
            name: "The Park Hotel",
            location: "Park Street, Kolkata, West Bengal 700016"
        },
        {
            name: "City Centre Mall",
            location: "Banjara Hills, Hyderabad, Telangana 500034"
        },
        {
            name: "Marine Drive",
            location: "Netaji Subhash Chandra Bose Road, Mumbai, Maharashtra 400020"
        },
        {
            name: "Cafe Mocha",
            location: "Sector 18, Noida, Uttar Pradesh 201301"
        },
        {
            name: "Karim's",
            location: "Jama Masjid, Old Delhi, Delhi 110006"
        },
        {
            name: "Cafe Coffee Day",
            location: "Connaught Place, New Delhi, Delhi 110001"
        },
        {
            name: "Saravana Bhavan",
            location: "T. Nagar, Chennai, Tamil Nadu 600017"
        },
        {
            name: "Taj Mahal",
            location: "Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001"
        },
        {
            name: "Phoenix Marketcity Mall",
            location: "Kurla West, Mumbai, Maharashtra 400070"
        },
        {
            name: "Bangalore Palace",
            location: "Vasanth Nagar, Bengaluru, Karnataka 560052"
        },
        {
            name: "The Park Hotel",
            location: "Park Street, Kolkata, West Bengal 700016"
        },
        {
            name: "City Centre Mall",
            location: "Banjara Hills, Hyderabad, Telangana 500034"
        },
        {
            name: "Marine Drive",
            location: "Netaji Subhash Chandra Bose Road, Mumbai, Maharashtra 400020"
        },
        {
            name: "Cafe Mocha",
            location: "Sector 18, Noida, Uttar Pradesh 201301"
        },
        {
            name: "Karim's",
            location: "Jama Masjid, Old Delhi, Delhi 110006"
        }
    ];

    return (
        <div className='w-[40%] h-[70vh] overflow-x-scroll hide-scrollbar'>
            {addressData.map((item, index) => {
                return (
                    <div className='my-1 active:border-black flex flex-row items-center border border-gray-300 p-2 rounded-2xl mb-3 cursor-pointer' key={index}>
                        <div className='mr-2 text-2xl'> 
                            <i className="ri-map-pin-line"></i>
                        </div>
                        <div>
                            <p className='text-2xl'>{item.name}</p>
                            <p>{item.location}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default LocationSearchPanel