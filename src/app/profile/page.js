'use client';

import React, { useState } from "react";
import Navbar from "@/components/Navbar";

const Profile = () => {
    // Define user details
    const [userDetails, setUserDetails] = useState({
        fullName: "John Doe",
        username: "johndoe123",
        county: "Example County",
        farmLocation: "Farm Location Details",
    });

    // Function to update user details
    const updateUserDetails = (field, value) => {
        setUserDetails({
            ...userDetails,
            [field]: value,
        });
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Navbar />
            <div className="w-full px-8 py-12 lg:pl-80">
                <div className="h-full">
                    <div className="flex items-center w-full h-16 topBar">
                        <h1 className="font-bold uppercase">Profile</h1>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <div className="flex flex-col items-center">
                            {/* User Image */}
                            <div className="w-24 h-24 bg-gray-200 rounded-full">
                                {/* You can add an image here */}
                            </div>
                            <h3 className="mt-4 text-lg">{userDetails.fullName}</h3>
                            <p className="text-gray-600">@{userDetails.username}</p>
                        </div>
                        {/* User Details */}
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold">User Details</h3>
                            <div className="mt-2">
                                <p className="text-gray-600">County: {userDetails.county}</p>
                                <p className="text-gray-600">Farm Location: {userDetails.farmLocation}</p>
                            </div>
                        </div>
                        {/* Edit User Details */}
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold">Edit User Details</h3>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-lg"
                                    placeholder="Full Name"
                                    value={userDetails.fullName}
                                    onChange={(e) => updateUserDetails("fullName", e.target.value)}
                                />
                                <input
                                    type="text"
                                    className="w-full p-2 mt-2 border rounded-lg"
                                    placeholder="Username"
                                    value={userDetails.username}
                                    onChange={(e) => updateUserDetails("username", e.target.value)}
                                />
                                <input
                                    type="text"
                                    className="w-full p-2 mt-2 border rounded-lg"
                                    placeholder="County"
                                    value={userDetails.county}
                                    onChange={(e) => updateUserDetails("county", e.target.value)}
                                />
                                <input
                                    type="text"
                                    className="w-full p-2 mt-2 border rounded-lg"
                                    placeholder="Farm Location"
                                    value={userDetails.farmLocation}
                                    onChange={(e) => updateUserDetails("farmLocation", e.target.value)}
                                />
                            </div>
                        </div>
                        {/* Update Details Button */}
                        <button
                            className="w-full p-2 mt-4 text-white bg-green-500 rounded-lg hover:bg-green-600"
                            onClick={() => alert("Details Updated")}
                        >
                            Update Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
