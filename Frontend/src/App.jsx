import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from "./Pages/Home"
import UserLogin from './Pages/UserLogin'
import UserSignup from './Pages/UserSignup'
import CaptainLogin from './Pages/CaptainLogin'
import CaptainSignup from './Pages/CaptainSignup'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/userLogin' element={<UserLogin/>}/>
        <Route path='/userSignup' element={<UserSignup/>}/>
        <Route path='/captainLogin' element={<CaptainLogin/>}/>
        <Route path='/captainSignup' element={<CaptainSignup/>}/>
      </Routes>
    </div>
  )
}

export default App