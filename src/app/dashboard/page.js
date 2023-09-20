'use client';

import Navbar from "@/components/Navbar";

export default function Dashboard() {
    return (
        <div className='flex min-h-screen bg-gray-100'>
            <Navbar />
            <div className="w-full min-h-screen">Dashboard</div>
        </div>
    )
};

