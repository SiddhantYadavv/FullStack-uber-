import React from 'react'

const CaptainInfo = () => {
  return (
    <div className='w-[30%]'>

        <div className='flex flex-row justify-between items-center'>
            <div className='flex flex-row items-center'>
                <img className='h-20 w-20 rounded-full object-contain' src='https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D'/>
                <p className='text-xl ml-4 font-bold'>Driver Name</p>
            </div>
            <div>
                <p className='text-xl font-bold'>295.50</p>
                <p>Earned</p>
            </div>
        </div>

        <div className='mt-4 bg-gray-200 rounded-2xl w-[100%] flex flex-row justify-evenly py-6'>
            <div className='flex flex-col items-center'>
                <div><i className="ri-time-line"></i></div>
                <p className='text-xl font-bold'>10.2</p>
                <p>Hours Online</p>
            </div>
            <div className='flex flex-col items-center'>
                <div><i className="ri-time-line"></i></div>
                <p className='text-xl font-bold'>10.2</p>
                <p>Hours Online</p>
            </div>
            <div className='flex flex-col items-center'>
                <div><i class="ri-time-line"></i></div>
                <p className='text-xl font-bold'>10.2</p>
                <p>Hours Online</p>
            </div>
        </div>


    </div>
  )
}

export default CaptainInfo