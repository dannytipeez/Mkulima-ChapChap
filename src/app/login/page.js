'use client';
import { useDispatch } from 'react-redux';

import { useState } from 'react';

export default function Login() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();  

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement form validation and login logic here
    };

    //is user auth -> home


    return (

        <div className='bg-gray-100 min-h-screen flex flex-col justify-center'>
            <div className='text-3xl font-medium text-green-500 text-center py-4'>Welcome Back to Mkulima Chapchap</div>

            <div className="flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h1 className="text-3xl font-bold text-center mb-4 text-green-500">
                        Login
                    </h1>
                    <form onSubmit={handleSubmit}>
                        {/* Username Input */}
                        <div className="mb-4">
                            <label htmlFor="username" className="block mb-1 text-black">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                required
                                value={formData.username}
                                onChange={handleInputChange}
                                className="w-full border border-gray-500 rounded-md p-2 text-gray-400"
                            />
                        </div>

                        {/* Email Input */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-1 text-black">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full border border-gray-500 rounded-md p-2 text-gray-400"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="mb-4">
                            <label htmlFor="password" className="block mb-1 text-black">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                minLength='6'
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full border border-gray-500 rounded-md p-2 text-gray-400"
                            />
                        </div>

                        <div className="mb-4">
                            <button
                                type="submit"
                                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="text-center mt-4 text-gray-500">
                Don't have an account?&nbsp;
                <a href="/register" className="text-green-500 hover:underline ">
                    Sign Up
                </a>
            </div>
            <div className="text-center mt-4 text-gray-500">
                Forgot your password?&nbsp;
                <a href="/resetpassword" className="text-green-500 hover:underline ">
                    Reset Password
                </a>
            </div>
        </div>
    );
};


//state handling
const mapStateToProps = state => {
    //isauthenticated?
}