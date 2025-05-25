import React, { useContext, useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehicleList from '../components/VehicleList'
import ConfirmRide from '../components/ConfirmRide'
import DriverInfo from '../components/DriverInfo'
import { showToastSuccess, showToastError } from "../components/Toast/ToastFunction"
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const { user } = useContext(UserDataContext)
  const navigate = useNavigate()

  const token = localStorage.getItem("token")

  const [showFull, setShowFull] = useState(false)
  const [showVehicles, setShowVehicles] = useState(false)
  const [confirmRide, setConfirmRide] = useState(null)
  const [showDriverInfo, setShowDriverInfo] = useState(null)

  // ----------------------------------States for search input-----------------------------------
  const [selectedInput, setSelectedInput] = useState("")
  const [pickUpLocation, setPickUpLocation] = useState("")
  const [dropLocation, setDropLocation] = useState("")
  const [autoSuggestData, setAutoSuggestData] = useState([])
  //---------------------------------------------------------------------------------
  const [distanceAndTime, setDistanceAndTime] = useState({
    "distance": {},
    "duration": {}
  })
  //---------------------------------------------------------------------------------
  const [fare, setFare] = useState({})
  //---------------------------------------------------------------------------------


  const handleLogout = async () => {
    if (!token) return showToastError("token does not exist")
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/user/logout`, { headers: { Authorization: `bearer ${token}` } })
      navigate("/userLogin")
    } catch (error) {
      showToastError("Error logging out, try again")
    }
  }

  const handleAutoSearch = async (e) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/maps/getSuggestions?input=${e.target.value}`, { headers: { Authorization: `bearer ${token}` } })
      setAutoSuggestData(response.data)
    } catch (error) {
      showToastError("Could'nt search ")

    }
  }

  return (
    <div>

      <div className='absolute top-4 left-4'>
        <img className='h-10' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' />
      </div>

      {!showFull && <div onClick={() => handleLogout()} className='z-10 absolute top-4 right-4 hover:cursor-pointer'>
        <i className="ri-logout-box-line text-3xl"></i>
      </div>}

      <div>
        <img className='h-[70vh] w-full object-cover' src='https://camo.githubusercontent.com/e0debd25d05c84be78d89bf7a2858c65e3cfecd72e95bd22ec50e85fa1f84cfb/68747470733a2f2f322e62702e626c6f6773706f742e636f6d2f2d574f70483738393364526b2f5733527372626f476678492f41414141414141414356552f767a6b39683975526262415777485633366a5455644b4f555552795946322d6167434c63424741732f73313630302f73637265656e73686f74362e706e67' />
      </div>

      <div className='h-screen flex flex-col justify-end items-center absolute top-0 w-full'>

        <div className='w-full h-[30%] bg-white py-3 px-20 flex flex-col gap-5' >
          <div className='w-full flex justify-between'>
            <h1 className='text-4xl font-bold'> Find a trip</h1>
            <div onClick={() => setShowFull(!showFull)}>
              {!showFull ? <p className='text-4xl cursor-pointer'><i className="ri-arrow-up-wide-line"></i></p> :
                <p className='text-4xl cursor-pointer'><i className="ri-arrow-down-wide-line"></i></p>}
            </div>
          </div>
          <input onClick={() => setSelectedInput("pickUpLocation")}
            onChange={(e) => {
              handleAutoSearch(e)
              setPickUpLocation(e.target.value)
              setShowFull(true)
            }}
            value={pickUpLocation}
            className='p-3 rounded-2xl border-gray-300 border '
            placeholder='Pickup Location'
            type='text' />

          <input onClick={() => setSelectedInput("dropLocation")}
            onChange={(e) => {
              handleAutoSearch(e)
              setDropLocation(e.target.value)
              setShowFull(true)
            }}
            value={dropLocation}
            className='p-3 rounded-2xl border-gray-300 border'
            placeholder='Drop Location'
            type='text' />
        </div>

        <div
          className={`
          w-full bg-white overflow-hidden transition-all duration-1000
          ${showFull ? 'min-h-[70vh]' : 'min-h-0'}`}>
          <div className={`${!showFull && "hidden"} w-full flex justify-center`}>
            <LocationSearchPanel
              showFull={showFull}
              setShowFull={setShowFull}
              showVehicles={showVehicles}
              setShowVehicles={setShowVehicles}
              autoSuggestData={autoSuggestData}
              selectedInput={selectedInput}
              setPickUpLocation={setPickUpLocation}
              setDropLocation={setDropLocation}
              setAutoSuggestData={setAutoSuggestData}
              pickUpLocation={pickUpLocation}
              dropLocation={dropLocation}
              distanceAndTime={distanceAndTime}
              setDistanceAndTime={setDistanceAndTime}
            />
          </div>
        </div>

        {showVehicles && <div
          className={`
          w-full bg-white absolute bottom-0 ${showVehicles ? 'min-h-[50vh]' : 'min-h-0'}`}>
          <div className={`${!showVehicles && "hidden"} w-full flex justify-center items-center h-[50vh]`}>
            <VehicleList
              showVehicles={showVehicles}
              setShowVehicles={setShowVehicles}
              setConfirmRide={setConfirmRide}
              pickUpLocation={pickUpLocation}
              dropLocation={dropLocation}
              setFare={setFare}
              fare={fare}
            />
          </div>
        </div>}

        {confirmRide && <div
          className={`
          w-full bg-white absolute bottom-0 ${confirmRide ? 'min-h-[50vh]' : 'min-h-0'}`}>
          <div className={`${!confirmRide && "hidden"} w-full flex justify-center items-center h-[50vh]`}>
            <ConfirmRide
              confirmRide={confirmRide}
              setConfirmRide={setConfirmRide}
              setShowDriverInfo={setShowDriverInfo}
            />
          </div>
        </div>}

        {showDriverInfo && <div
          className={`
          w-full bg-white absolute bottom-0 ${showDriverInfo ? 'min-h-[50vh]' : 'min-h-0'}`}>
          <div className={`${!showDriverInfo && "hidden"} w-full flex justify-center items-center h-[50vh]`}>
            <DriverInfo
              confirmRide={confirmRide}
              showDriverInfo={showDriverInfo}
              setShowDriverInfo={setShowDriverInfo}
            />
          </div>
        </div>}

      </div>

    </div>
  )
}

export default Home