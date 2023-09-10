'use client';

import { useState } from 'react';

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        role: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement form validation and login logic here
    };

    return (
        <div className='bg-gray-100 min-h-screen flex flex-col justify-center'>
            <div className='text-3xl font-medium text-green-500 text-center py-4'>Welcome to Mkulima Chapchap</div>
            <div className="flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center mb-4 text-green-600">Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block mb-1 text-black">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-md p-2 text-gray-500"
                            />
                        </div>
                        {/* Role Input */}
                        <div className="mb-4">
                            <label htmlFor="role" className="block mb-1 text-black">
                                Role
                            </label>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleInputChange}
                                className={`w-full border ${errors.role ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md p-2 text-gray-500`}
                            >
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="farmer">Farmer</option>
                                <option value="agricultural-expert">Agricultural Expert</option>
                                <option value="service-provider">Service Provider</option>
                            </select>
                            {errors.role && (
                                <p className="text-red-500 mt-1">{errors.role}</p>
                            )}
                        </div>

                        {/* Phone Input */}
                        <div className="mb-4">
                            <label htmlFor="phone" className="block mb-1 text-black">
                                Phone
                            </label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className={`w-full border ${errors.phone ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md p-2 text-gray-500`}
                            />
                            {errors.phone && (
                                <p className="text-red-500 mt-1">{errors.phone}</p>
                            )}
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
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md p-2 text-gray-500`}
                            />
                            {errors.email && (
                                <p className="text-red-500 mt-1">{errors.email}</p>
                            )}
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
                                value={formData.password}
                                onChange={handleInputChange}
                                className={`w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md p-2 text-gray-500`}
                            />
                            {errors.password && (
                                <p className="text-red-500 mt-1">{errors.password}</p>
                            )}
                        </div>

                        {/* Confirm Password Input */}
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block mb-1 text-black">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className={`w-full border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md p-2 text-gray-500`}
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 mt-1">{errors.confirmPassword}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <button
                                type="submit"
                                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
                            >
                                Sign
                            </button>
                        </div>
                    </form>
                </div>

            </div>
            <div className="text-center mt-4 text-gray-500">
                If already have an account,&nbsp;
                <a href="/login" className="text-green-500 hover:underline ">
                    sign in here
                </a>
            </div>
        </div>

    );
}
