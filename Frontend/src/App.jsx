import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from "./Pages/Start"
import UserLogin from './Pages/UserLogin'
import UserSignup from './Pages/UserSignup'
import CaptainLogin from './Pages/CaptainLogin'
import CaptainSignup from './Pages/CaptainSignup'
import Home from './Pages/Home'
import UserProtectedWrapper from './Pages/UserProtectedWrapper'
import CaptainProtrectedWrapper from './Pages/CaptainProtrectedWrapper'
import CaptainHome from './Pages/CaptainHome'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/userLogin' element={<UserLogin />} />
        <Route path='/userSignup' element={<UserSignup />} />
        <Route path='/captainLogin' element={<CaptainLogin />} />
        <Route path='/captainSignup' element={<CaptainSignup />} />
        <Route path='/home' element={
          <UserProtectedWrapper>
            <Home />
          </UserProtectedWrapper>
        } />
        <Route path='/captainHome' element={
          <CaptainProtrectedWrapper>
            <CaptainHome/>
          </CaptainProtrectedWrapper>
        }/>
      </Routes>
    </div>
  )
}

export default App