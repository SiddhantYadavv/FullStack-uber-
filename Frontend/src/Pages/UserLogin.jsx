import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';

const UserLogin = () => {
  const navigate = useNavigate()
  const {user,setUser} = useContext(UserDataContext)
  const [email,setEmail] =useState("")
  const [password,setPassword] =useState("")

  const handleLogin =async(e)=>{
    e.preventDefault()
    try {
      const isEmpty=[email,password].some((val)=>val.trim()=="")
      if (isEmpty) {
        alert("All fields are mandatory");
        return
      }
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, {email:email,password:password})
      if (response.data?.token) {
        setUser(response.data?.user)
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      }
     
    } catch (error) {
      console.log("Error Logging in : ",error)
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-xl w-80">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">User Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e)=>{
                setEmail(e.target.value)
              }}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
            value={password}
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition cursor-pointer"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{' '}
          <Link to="/userSignup" className="text-black font-medium">Sign up</Link>
        </p>

        <div className="mt-4">
          <Link
            to="/captainLogin"
            className="block w-full text-center bg-orange-700 text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Sign in as Captain
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
