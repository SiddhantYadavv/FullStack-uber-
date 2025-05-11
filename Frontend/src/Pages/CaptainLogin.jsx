import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainLogin = () => {
    const {setCaptain} = useContext(CaptainDataContext)
    const navigate = useNavigate()

    const [formData,setFormData]=useState({
        email:"",
        password:""
    })

    const onSubmit = async(e)=>{
        e.preventDefault()
        try {
            const isEmpty = [formData.email,formData.password].some((val)=>val.trim()==="")
            if(isEmpty){
                alert("All fields required")
                return
            }
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/captain/loginCaptain`,formData)
            if (response.data?.token) {
                setCaptain(response.data?.user)
                localStorage.setItem("token", response.data.token);
                navigate("/captainHome");
              }
        } catch (error) {
            console.log("Error logging in captain")
        }
    }
    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-xl w-80">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Captain Login</h2>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="captain@example.com"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            value={formData.email}
                            onChange={(e)=>setFormData((prev)=>({...prev,email:e.target.value}))}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            value={formData.password}
                            onChange={(e)=>setFormData((prev)=>({...prev,password:e.target.value}))}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
                    >
                        Login
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600 mt-4">
                    Don't have a captain account?{' '}
                    <Link to={"/captainSignup"} className="text-black font-medium">Sign up</Link>
                </p>

                <div className="mt-4">
                    <Link
                        to="/userLogin"
                        className="block w-full text-center bg-green-700 text-white py-2 rounded-lg hover:bg-gray-800 transition"
                    >
                        Sign in as User
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default CaptainLogin