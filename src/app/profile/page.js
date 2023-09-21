'use client';

import Navbar from "@/components/Navbar";

const Profile = () => {
    return (
        <div className='flex w-full min-h-screen bg-gray-100'>
            <div className="flex"><Navbar /></div>
            <div className="min-h-screen pl-8 lg:pl-80">Profile
            </div>
        </div>
    );
}

export default Profile;