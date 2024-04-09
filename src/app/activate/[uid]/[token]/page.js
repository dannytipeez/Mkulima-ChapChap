'use client';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { verifyUser } from '@/redux/features/auth-Slice';
import { useRouter, useParams } from 'next/navigation';

export default function Activate() {
    const [verified, setVerified] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const params = useParams();

    useEffect(() => {
        if (verified) {
            router.push("/activation-success");
        }
    }, [verified, router]);

    const verifyAccount = () => {
        const uid = params.uid;
        const token = params.token;

        console.log(uid,token);
        try{
            dispatch(verifyUser({uid, token})).unwrap();
            setVerified(true);
        } catch(err) {
            console.log(err);
        }

    };

    return (
        <div>
            <div className='flex flex-col justify-center min-h-screen bg-gray-100'>
                <div className='py-4 text-3xl font-medium text-center text-green-500'>Welcome Back to Mkulima Chapchap</div>

                <div className="flex items-center justify-center bg-gray-100">
                    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                        <h1 className="mb-4 text-xl font-bold text-center text-green-500">
                            Account Verification: Please Click Link Below to Activate Your Account
                        </h1>
                        <button className='px-16 py-4 text-white bg-green-500 align-center' onClick={verifyAccount} type='button'>Verify Account</button>

                    </div>
                </div>
            </div>
        </div>
    );
}
