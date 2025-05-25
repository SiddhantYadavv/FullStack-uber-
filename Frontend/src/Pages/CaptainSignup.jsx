import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CaptainSignup = () => {
  const {captain,setCaptain} = useContext(CaptainDataContext)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    vehicle: {
      color: '',
      plate: '',
      capacity: '',
      vehicleType: ''
    }
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('vehicle.')) {
      const key = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        vehicle: {
          ...prev.vehicle,
          [key]: value
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
   try {
    const isEmpty = [formData.email,formData.firstName,formData.lastName,formData.password,formData.vehicle.capacity,formData.vehicle.color,formData.vehicle.plate,formData.vehicle.vehicleType].some((val)=>val.trim()==="")
    if(isEmpty){
      alert("All fields are required")
      return
    }
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/captain/registerCaptain`, formData)  
    if (response.data.token) {
      setCaptain(response.data.captain)
      localStorage.setItem("token", response.data.token);
      navigate("/captainHome");
    }
  }
     catch (error) {
      console.log("Error signin captain")
   }
  };

  return (
    <div className="p-10 flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-xl w-[22rem] flex-row">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Captain Signup</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div>
                <label className="block text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="John"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="captain@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Create a password"
                  required
                />
              </div>
            </div>

            <div>
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Vehicle Information</h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-gray-700 mb-1">Vehicle Color</label>
                    <input
                      type="text"
                      name="vehicle.color"
                      value={formData.vehicle.color}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="Red"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1">Plate Number</label>
                    <input
                      type="text"
                      name="vehicle.plate"
                      value={formData.vehicle.plate}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="ABC1234"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1">Capacity</label>
                    <input
                      type="number"
                      name="vehicle.capacity"
                      value={formData.vehicle.capacity}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="4"
                      min="1"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1">Vehicle Type</label>
                    <select
                      name="vehicle.vehicleType"
                      value={formData.vehicle.vehicleType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg"
                      required
                    >
                      <option value="">Select type</option>
                      <option value="car">Car</option>
                      <option value="bike">Bike</option>
                      <option value="van">Van</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>


          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already a captain?{' '}
          <Link to="/captainLogin" className="text-black font-medium">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
