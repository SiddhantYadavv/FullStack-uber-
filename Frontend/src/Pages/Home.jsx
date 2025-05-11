import React, { useContext } from 'react'
import { UserDataContext } from '../context/UserContext'

const Home = () => {
  const {user} = useContext(UserDataContext)
  return (
    <div> User Home</div>
  )
}

export default Home