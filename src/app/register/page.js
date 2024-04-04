'use client';

// 'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, checkAuthenticated, loadUser, auth } from '@/redux/features/auth-Slice';
import { useRouter } from 'next/navigation';

export default function Register() {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        username: '',
        role: '',
        phone: '',
        email: '',
        password: '',
        re_password: '',
    });

    const { username, role, phone, email, password, re_password } = formData;

    const [errors, setErrors] = useState({});
    const router = useRouter();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

const handleSubmit = async (e) => {
    e.preventDefault();
    try {

        await dispatch(registerUser({ username, role, phone, email, password, re_password }))
            .unwrap();

        console.log("Check your email to confirm registration of the account");
        console.log(formData);
        router.push('/login');
    } catch (error) {
        console.error("Error occurred when registering user:", error);
        setErrors({ ...errors, registration: "Failed to register user. Please try again later." });
    }
};



    return (
        <div className='bg-gray-100 min-h-screen flex flex-col justify-center'>
            <div className='text-3xl font-medium text-green-500 text-center py-4'>Welcome to Mkulima Chapchap</div>
            <div className="flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center mb-4 text-green-600">Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                    {errors.registration && (
    <p className="text-red-500 mt-1 p-2">{errors.registration}</p>
)}

                        {/* Other form inputs... */}
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
                                <option value="1">Admin</option>
                                <option value="2">Farmer</option>
                                <option value="3">Agricultural Expert</option>
                                <option value="4">Service Provider</option>
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
                                required
                                value={phone}
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
                                required
                                value={email}
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
                                required
                                minLength='6'
                                value={password}
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
                            <label htmlFor="re_password" className="block mb-1 text-black">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="re_password"
                                name="re_password"
                                required
                                value={re_password}
                                onChange={handleInputChange}
                                className={`w-full border ${errors.re_password ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md p-2 text-gray-500`}
                            />
                            {errors.re_password && (
                                <p className="text-red-500 mt-1">{errors.re_password}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <button
                                type="submit"
                                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
                            >
                                Sign Up
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
