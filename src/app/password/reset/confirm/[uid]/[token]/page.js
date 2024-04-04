'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetPasswordConfirm } from '@/redux/features/auth-Slice';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation'

export default function PasswordResetConfirm() {
    const dispatch = useDispatch();
    const router = useRouter();
    const params = useParams()

    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: '',
    });

    const { new_password, re_new_password } = formData;

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const uid = params.uid;
        const token = params.token;
        try {
            // Check if passwords match
            if (new_password !== re_new_password) {
                setErrors({ ...errors, passwordMatch: "Passwords do not match." });
                return;
            }

            await dispatch(resetPasswordConfirm({ uid, token, new_password, re_new_password })).unwrap();

            console.log("Password reset successful");
            console.log(formData);
            // Redirect to a page indicating that the password reset was successful
            router.push('/password-reset-success');
        } catch (error) {
            console.error("Error occurred when confirming password reset:", error);
            setErrors({ ...errors, passwordResetConfirm: "Failed to confirm password reset. Please try again later." });
        }
    };

    return (
        <div className='flex flex-col justify-center min-h-screen bg-gray-100'>
            <div className='py-4 text-3xl font-medium text-center text-green-500'>Mkulima Chapchap Password Reset Confirmation</div>
            <div className="flex items-center justify-center">
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                    <h2 className="mb-4 font-bold text-center text-green-600">Fill form below to reset your password</h2>
                    <form onSubmit={handleSubmit}>
                        {errors.passwordMatch && (
                            <p className="p-2 mt-1 text-red-500">{errors.passwordMatch}</p>
                        )}
                        {errors.passwordResetConfirm && (
                            <p className="p-2 mt-1 text-red-500">{errors.passwordResetConfirm}</p>
                        )}

                        {/* New Password Input */}
                        <div className="mb-4">
                            <label htmlFor="new_password" className="block mb-1 text-black">
                                New Password
                            </label>
                            <input
                                type="password"
                                id="new_password"
                                name="new_password"
                                required
                                value={new_password}
                                onChange={handleInputChange}
                                className={`w-full border ${errors.new_password ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md p-2 text-gray-500`}
                            />
                            {errors.new_password && (
                                <p className="mt-1 text-red-500">{errors.new_password}</p>
                            )}
                        </div>

                        {/* Confirm New Password Input */}
                        <div className="mb-4">
                            <label htmlFor="re_new_password" className="block mb-1 text-black">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                id="re_new_password"
                                name="re_new_password"
                                required
                                value={re_new_password}
                                onChange={handleInputChange}
                                className={`w-full border ${errors.re_new_password ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md p-2 text-gray-500`}
                            />
                            {errors.re_new_password && (
                                <p className="mt-1 text-red-500">{errors.re_new_password}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <button
                                type="submit"
                                className="px-4 py-2 text-white transition duration-300 bg-green-500 rounded-md hover:bg-green-600"
                            >
                                Confirm Password Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="mt-4 text-center text-gray-500">
                If you remember your password,&nbsp;
                <a href="/login" className="text-green-500 hover:underline ">
                    sign in here
                </a>
            </div>
        </div>
    );
}
