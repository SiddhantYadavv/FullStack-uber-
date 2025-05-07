import React, { useContext } from 'react'
import { UserDataContext } from '../context/UserContext'

const Home = () => {
  const {user} = useContext(UserDataContext)
  console.log("///////",user)
  return (
    <div>Home</div>
  )
}

export default Home