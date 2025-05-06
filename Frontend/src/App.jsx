import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from "./Pages/Start"
import UserLogin from './Pages/UserLogin'
import UserSignup from './Pages/UserSignup'
import CaptainLogin from './Pages/CaptainLogin'
import CaptainSignup from './Pages/CaptainSignup'
import Home from './Pages/Home'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start/>}/>
        <Route path='/userLogin' element={<UserLogin/>}/>
        <Route path='/userSignup' element={<UserSignup/>}/>
        <Route path='/captainLogin' element={<CaptainLogin/>}/>
        <Route path='/captainSignup' element={<CaptainSignup/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App