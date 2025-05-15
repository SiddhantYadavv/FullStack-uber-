import React from 'react'
import CaptainInfo from '../components/CaptainComponents/CaptainInfo'
import NewRides from '../components/CaptainComponents/NewRides'

const CaptainHome = () => {
  return (
    <div>
      <div className='absolute top-4 left-4'>
        <img className='h-10' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' />
      </div>

      <div>
        <img className='h-[70vh] w-full object-cover' src='https://camo.githubusercontent.com/e0debd25d05c84be78d89bf7a2858c65e3cfecd72e95bd22ec50e85fa1f84cfb/68747470733a2f2f322e62702e626c6f6773706f742e636f6d2f2d574f70483738393364526b2f5733527372626f476678492f41414141414141414356552f767a6b39683975526262415777485633366a5455644b4f555552795946322d6167434c63424741732f73313630302f73637265656e73686f74362e706e67' />
      </div>

    <div className='h-[30vh] w-full flex justify-center pt-4' >
      <CaptainInfo/>
    </div>

    {/* <div className='h-[50vh] absolute bottom-0 bg-white w-full flex justify-center items-center pt-4' >
      <NewRides/>
    </div> */}

    </div>
  )
}

export default CaptainHome