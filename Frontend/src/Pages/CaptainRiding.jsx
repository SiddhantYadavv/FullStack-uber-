import React, { useRef, useState } from 'react'
import { FinishRide } from '../components/CaptainComponents/FinishRide'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useLocation, useNavigate } from 'react-router-dom'

const CaptainRiding = () => {
    const navigate = useNavigate()
     const location = useLocation();
        const rideData = location.state;

    const [isPanelOpen,setIsPanelOpen] = useState(false)
    const finishRideRef = useRef(null)

    useGSAP(()=>{
        if(isPanelOpen){
            gsap.to(finishRideRef.current,{
                height:"50%"
            })
        }else{
            gsap.to(finishRideRef.current,{
                height:"0%"
            })
        }

    },[isPanelOpen])

    return (
        <div>
            <div onClick={()=>navigate("/captainHome")} className='absolute top-4 left-4 cursor-pointer'>
                <img className='h-10' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' />
            </div>

            <div>
                <img className='h-[100vh] w-full object-cover' src='https://camo.githubusercontent.com/e0debd25d05c84be78d89bf7a2858c65e3cfecd72e95bd22ec50e85fa1f84cfb/68747470733a2f2f322e62702e626c6f6773706f742e636f6d2f2d574f70483738393364526b2f5733527372626f476678492f41414141414141414356552f767a6b39683975526262415777485633366a5455644b4f555552795946322d6167434c63424741732f73313630302f73637265656e73686f74362e706e67' />
            </div>

            <div className='h-[20vh] absolute bottom-0 w-full flex justify-center pt-4' >
                {/* <CaptainInfo /> */}
                <div className='w-[50%] bg-amber-300 rounded-t-2xl p-6'>
                    <div className='absolute top-6 left-[50%]'><i onClick={()=>setIsPanelOpen(true)} className="ri-arrow-up-wide-line text-2xl cursor-pointer"></i></div>
                    <div className='flex flex-row justify-evenly w-full h-full items-center'>
                        <p className='text-xl font-semibold'>4 Kms away</p>
                        <button className='bg-green-700 text-white font-bold rounded-2xl px-6 py-3 cursor-pointer hover:bg-green-600'>Complete Ride</button>
                    </div>
                </div>
            </div>

            <div ref={finishRideRef} className='h-[0vh] absolute bottom-0 w-full flex justify-center overflow-hidden' >
                <FinishRide rideData={rideData} setIsPanelOpen={setIsPanelOpen}/>
            </div>



        </div>
    )
}

export default CaptainRiding