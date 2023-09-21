'use client';

import Navbar from "@/components/Navbar";

const Settings = () => {
    return (
        <div className='flex w-full min-h-screen bg-gray-100'>
            <div className="flex"><Navbar /></div>
            <div className="min-h-screen pl-8 lg:pl-80">
                <div className="flex justify-center h-80">
                    <h1 className="font-bold uppercase">Settings</h1>
                </div>


            </div>
        </div>
    );
}

export default Settings;