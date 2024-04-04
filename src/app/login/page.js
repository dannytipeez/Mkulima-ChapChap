'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, checkAuthenticated, loadUser, auth } from '@/redux/features/auth-Slice';
import { useRouter } from 'next/navigation';


export default function Login() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => auth);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const { username, email, password } = formData;
    const [errors, setErrors] = useState({});
    const router = useRouter();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ username, email, password }))
        .unwrap()
        .then(() => {
            dispatch(checkAuthenticated())
                .unwrap()
                .then((authenticated) => {
                    if (isAuthenticated) {
                        router.push('/dashboard');
                    } else {
                        console.log("Authentication failed");
                    }
                });
        });
    };

    return (
        <div>
                <div className='flex flex-col justify-center min-h-screen bg-gray-100'>
                    <div className='py-4 text-3xl font-medium text-center text-green-500'>Welcome Back to Mkulima Chapchap</div>

                    <div className="flex items-center justify-center bg-gray-100">
                        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                            <h1 className="mb-4 text-3xl font-bold text-center text-green-500">
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
                                        placeholder='username'
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        className="w-full p-2 text-gray-400 border border-gray-500 rounded-md"
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
                                        placeholder='email'
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full p-2 text-gray-400 border border-gray-500 rounded-md"
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
                                        placeholder='password'
                                        onChange={handleInputChange}
                                        className="w-full p-2 text-gray-400 border border-gray-500 rounded-md"
                                    />
                                </div>

                                <div className="mb-4">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-white transition duration-300 bg-green-500 rounded-md hover:bg-green-600"
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="mt-4 text-center text-gray-500">
                        Don't have an account?&nbsp;
                        <a href="/register" className="text-green-500 hover:underline ">
                            Sign Up
                        </a>
                    </div>
                    <div className="mt-4 text-center text-gray-500">
                        Forgot your password?&nbsp;
                        <a href="/reset" className="text-green-500 hover:underline ">
                            Reset Password
                        </a>
                    </div>
                </div>
            {/* )} */}
        </div>
    );
}


