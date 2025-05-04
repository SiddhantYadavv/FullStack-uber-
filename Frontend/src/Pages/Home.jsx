import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">
          Get started with Uber
        </h1>
        <Link to={"/userLogin"} className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition">
          Continue
        </Link>
      </div>
    );
}

export default Home