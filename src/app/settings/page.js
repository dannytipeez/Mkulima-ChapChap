"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import api from '../../utils/api';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Settings = () => {
    const [storageCapacity, setStorageCapacity] = useState("");
    const [storeCapacity, setStoreCapacity] = useState("");

   const handleUpdateSettings = async () => {
        try {
            // Make a POST request to update capacities
            const response = await api.post("farm/update-capacity/", {
                storageCapacity,
                storeCapacity,
            });

            if (response.status === 200) {
                toast.success("Capacities updated successfully");
            }
        } catch (error) {
            console.error("Error updating capacities:", error);
            toast.error("An error occurred while updating capacities");
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Navbar />
            <div className="w-full px-8 py-12 lg:pl-80">
                <div className="h-full">
                    <div className="flex items-center w-full h-16 topBar">
                        <h1 className="font-bold uppercase">Settings</h1>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        {/* Storage Capacity */}
                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700">
                                Set Storage Capacity
                            </label>
                            <input
                                type="number"
                                className="w-full p-2 mt-2 border rounded-lg"
                                placeholder="Enter storage capacity"
                                value={storageCapacity}
                                onChange={(e) => setStorageCapacity(e.target.value)}
                            />
                        </div>

                        {/* Store Capacity */}
                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700">
                                Set Store Capacity
                            </label>
                            <input
                                type="number"
                                className="w-full p-2 mt-2 border rounded-lg"
                                placeholder="Enter store capacity"
                                value={storeCapacity}
                                onChange={(e) => setStoreCapacity(e.target.value)}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            className="w-full p-2 mt-4 text-white bg-green-500 rounded-lg hover:bg-green-600"
                            onClick={handleUpdateSettings}
                        >
                            Update Settings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
