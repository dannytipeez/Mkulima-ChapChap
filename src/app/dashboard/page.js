'use client';

import Navbar from "@/components/Navbar";

export default function Dashboard() {
    return (
        <div className='flex w-full min-h-screen bg-gray-100'>

            <div className="flex"><Navbar /></div>
            <div className="min-h-screen pl-8 lg:pl-80">
                <div className="flex items-center justify-center w-full h-16 topBar">
                    <h1 className="font-bold uppercase">Welcome Back, John</h1>
                </div>
            </div>

        </div>
    )
};
