'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetPassword } from '@/redux/features/auth-Slice';
import { useRouter } from 'next/navigation';

export default function PasswordResetRequest() {
    const dispatch = useDispatch();
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: '',
    });

    const { email } = formData;

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(resetPassword({ email })).unwrap();

            console.log("Password reset email sent. Check your email for instructions.");
            console.log(formData);
            // Redirect to a page indicating that an email has been sent for password reset
            router.push('/login');
        } catch (error) {
            console.error("Error occurred when requesting password reset:", error);
            setErrors({ ...errors, passwordReset: "Failed to request password reset. Please try again later." });
        }
    };

    return (
        <div className='bg-gray-100 min-h-screen flex flex-col justify-center'>
            <div className='text-3xl font-medium text-green-500 text-center py-4'>Mkulima Chapchap Password Reset Form</div>
            <div className="flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="font-bold text-center mb-4 text-green-600">Enter Your Email to Request Password Reset:</h2>
                    <form onSubmit={handleSubmit}>
                        {errors.passwordReset && (
                            <p className="text-red-500 mt-1 p-2">{errors.passwordReset}</p>
                        )}

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

                        <div className="mb-4">
                            <button
                                type="submit"
                                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                            >
                                Request Password Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="text-center mt-4 text-gray-500">
                If you remember your password,&nbsp;
                <a href="/login" className="text-green-500 hover:underline ">
                    sign in here
                </a>
            </div>
        </div>
    );
}
