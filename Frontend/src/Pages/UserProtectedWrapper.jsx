import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserProtectedWrapper = ({ children }) => {
  const {user,setUser} = useContext(UserDataContext)
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  const [loading,setIsLoading] = useState(true)

    useEffect(() => {
        const verifyUser = async () => {
            if (!token) {
                navigate("/userLogin")
            } else {
                await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`, {
                    headers: {
                        Authorization: `bearer ${token}`
                    }
                }).then((response)=>{
                       if(response.status===200){
                        console.log("Verified User")
                        setUser(response.data)
                        setIsLoading(false)
                       } 
                }).catch((error)=>{
                  localStorage.removeItem("token")
                    navigate("/userLogin")
                })

                
            }
        }
        verifyUser()

    }, [token])

    if(loading){
        return <div>Loading ... </div>
    }

  return (
    <>
      {children}
    </>
  )
}

export default UserProtectedWrapper