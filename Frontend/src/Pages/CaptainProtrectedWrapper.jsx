import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {CaptainDataContext} from "../context/CaptainContext"

const CaptainProtrectedWrapper = ({ children }) => {

    const navigate = useNavigate()
    const {captain,setCaptain} = useContext(CaptainDataContext)
    const [loading,setIsLoading] = useState(true)
    const token = localStorage.getItem("token")

    useEffect(() => {
        const verifyCaptain = async () => {
            if (!token) {
                navigate("/captainLogin")
            } else {
                await axios.get(`${import.meta.env.VITE_API_URL}/captain/profile`, {
                    headers: {
                        Authorization: `bearer ${token}`
                    }
                }).then((response)=>{
                       if(response.status===200){
                        setCaptain(response.data)
                        setIsLoading(false)
                       } 
                }).catch((error)=>{
                    localStorage.removeItem("token")
                    navigate("/captainLogin")
                })

                
            }
        }
        verifyCaptain()

    }, [token])

    if(loading){
        return <div>Loading ... </div>
    }

    return (
        <>
            {children}
        </>)

}

export default CaptainProtrectedWrapper