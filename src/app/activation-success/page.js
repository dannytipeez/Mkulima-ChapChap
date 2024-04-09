'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, checkAuthenticated, loadUser, auth, verify } from '@/redux/features/auth-Slice';
import { useRouter, useParams } from 'next/navigation';


export default function ActivateSuccess() {

    return (
        <div>
            <div className='flex flex-col justify-center min-h-screen bg-gray-100'>
                <div className='py-4 text-3xl font-medium text-center text-green-500'>Account activation Successful!</div>

                <div className='flex flex-col justify-center min-h-screen bg-gray-100'>
                    <div className='py-4 text-3xl font-medium text-center text-green-500'>You can now login using your new account:"</div>
                    <div className="mt-4 text-center text-gray-500">
                        Use your new password to login here,&nbsp;
                        <a href="/login" className="text-green-500 hover:underline ">
                            sign in here
                        </a>
                    </div>

                </div>
            </div>
            {/* )} */}
        </div>
    );
}


