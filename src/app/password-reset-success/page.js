import React from 'react'

function PasswordResetSuccess() {
    return (
        <div className='flex flex-col justify-center min-h-screen bg-gray-100'>
            <div className='py-4 text-3xl font-medium text-center text-green-500'>Password Reset Successful!</div>
            <p className='p-24 text-center'>You have successfully changed your password.</p>
            <div className="mt-4 text-center text-gray-500">
                Use your new password to login here,&nbsp;
                <a href="/login" className="text-green-500 hover:underline ">
                    sign in here
                </a>
            </div>

        </div>

    )
}

export default PasswordResetSuccess
