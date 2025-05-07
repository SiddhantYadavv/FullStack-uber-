import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import {UserDataContext } from "../context/UserContext"

const UserSignup = () => {

  const navigate = useNavigate()
  const {setUser,user} = useContext(UserDataContext )


  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isEmpty = [userData.firstName, userData.email, userData.password].some(
        (val) => val.trim() === ""
      );
      if (isEmpty) {
        alert("All fields are mandatory");
        return
      }
  
  
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/register`, userData)

      
      if (response.data?.token) {
        setUser(response.data?.user)
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      }
     
  
    } catch (error) {
      console.log("Error registering", error);
    }
  };
  

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-xl w-80">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">User Signup</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              placeholder="John"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              value={userData.firstName}
              onChange={(e) => setUserData((prev) => ({ ...prev, firstName: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              placeholder="Doe"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              value={userData.lastName}
              onChange={(e) => setUserData((prev) => ({ ...prev, lastName: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              value={userData.email}
              onChange={(e) => setUserData((prev) => ({ ...prev, email: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              value={userData.password}
              onChange={(e) => setUserData((prev) => ({ ...prev, password: e.target.value }))}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-400 cursor-pointer transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account? <Link to={"/userLogin"} className="text-black font-medium">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default UserSignup