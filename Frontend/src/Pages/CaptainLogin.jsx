import React from 'react'
import { Link } from 'react-router-dom';

const CaptainLogin = () => {
    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-xl w-80">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Captain Login</h2>

                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="captain@example.com"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
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