import React, { useRef, useState, useEffect } from 'react'
import CaptainInfo from '../components/CaptainComponents/CaptainInfo'
import NewRides from '../components/CaptainComponents/NewRides'
import { useGSAP } from "@gsap/react"
import gsap from 'gsap'
import ConfirmRide from '../components/CaptainComponents/ConfirmRide'
import { SocketContext } from "../context/SocketContext"
import { useContext } from 'react'
import { CaptainDataContext } from "../context/CaptainContext"
import { showToastError, showToastSuccess } from '../components/Toast/ToastFunction'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

const CaptainHome = () => {

  const token = localStorage.getItem("token")
  const navigate = useNavigate()


  const newRideRef = useRef(null)
  const confirmRideRef = useRef(null)

  const [newRidePanelOpen, setNewRidePanelOpen] = useState(false)
  const [confirmRidePanelOpen, setConfirmRidePanelOpen] = useState(false)

  const { socket } = useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext)

  // -------------------------------------------------------------------
  const [rideData, setRideData] = useState(null)

  const closeAll = () => {
    setNewRidePanelOpen(false)
    setConfirmRidePanelOpen(false)
  }

  useEffect(() => {
    socket.emit("join", { userType: "captain", userId: captain._id })

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          socket.emit("update-location-captain", {
            userId: captain._id, location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        })
      }
    }

    socket.on("new-ride", (data) => {
      setRideData(data)
      setNewRidePanelOpen(true)
    });

    socket.on("ride-confirmed", ride => {

    })

    const locationInterval = setInterval(() => {
      updateLocation()
    }, 10000);

    return () => clearInterval(locationInterval)

  }, [])

  const handleLogout = async () => {
    if (!token) return showToastError("token does not exist")
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/captain/logout`, { headers: { Authorization: `bearer ${token}` } })
      localStorage.clear()
      showToastSuccess("Captain Logged out")
      navigate("/captainLogin")
    } catch (error) {
      showToastError("Error logging out, try again")
    }
  }

  const confirmRide = async () => {
    try {
      const response = axios.post(`${import.meta.env.VITE_API_URL}/rides/confirmRide`, {

        rideId: rideData._id,
        captainId: captain._id,


      }, {
        headers: {
          Authorization: `bearer ${localStorage.getItem('token')}`
        }
      })
      setNewRidePanelOpen(false)
      setConfirmRidePanelOpen(true)

    } catch (error) {
      console.log(error)
    }
  }

  useGSAP(() => {
    if (newRidePanelOpen) {
      gsap.to(newRideRef.current, {
        height: "50%",
      })
    } else {
      gsap.to(newRideRef.current, {
        height: "0%"
      })
    }
  }, [newRidePanelOpen])

  useGSAP(() => {
    if (confirmRidePanelOpen) {
      gsap.to(confirmRideRef.current, {
        height: "70%",
      })
    } else {
      gsap.to(confirmRideRef.current, {
        height: "0%"
      })
    }
  }, [confirmRidePanelOpen])



  return (
    <div>
      <div className='absolute top-4 left-4'>
        <img className='h-10' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' />
      </div>

      <div onClick={() => handleLogout()} className='z-10 absolute top-4 right-4 hover:cursor-pointer'>
        <i className="ri-logout-box-line text-3xl"></i>
      </div>

      <div>
        <img className='h-[70vh] w-full object-cover' src='https://camo.githubusercontent.com/e0debd25d05c84be78d89bf7a2858c65e3cfecd72e95bd22ec50e85fa1f84cfb/68747470733a2f2f322e62702e626c6f6773706f742e636f6d2f2d574f70483738393364526b2f5733527372626f476678492f41414141414141414356552f767a6b39683975526262415777485633366a5455644b4f555552795946322d6167434c63424741732f73313630302f73637265656e73686f74362e706e67' />
      </div>

      <div className='h-[30vh] w-full flex justify-center pt-4' >
        <CaptainInfo captain={captain} />
      </div>


      <div ref={newRideRef} className='h-0 bg-white w-full flex justify-center items-center absolute bottom-0 overflow-hidden'>
        <NewRides rideData={rideData} setConfirmRidePanelOpen={setConfirmRidePanelOpen} confirmRide={confirmRide} closeAll={() => closeAll()} />
      </div>

      <div ref={confirmRideRef} className='h-0 bg-white w-full flex justify-center items-center absolute bottom-0 overflow-hidden'>
        <ConfirmRide rideData={rideData} closeAll={() => closeAll()} />
      </div>

    </div>
  )
}

export default CaptainHome