"use client";

import React, { useState, useEffect } from 'react';
import ActivityTable from "@/components/ActivityTable";
import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import NumberedListTable from "@/components/ServiceTable";
import MyChart from "@/components/MyChart";
import api from '../../utils/api';

export default function Dashboard() {
    const [livestockData, setLivestockData] = useState([]);
    const [cropData, setCropData] = useState([]);
    const [storageData, setStorageData] = useState([]);
    const [storeData, setStoreData] = useState([]);

    // Get current user details
    const email = localStorage.getItem("email");
    const username = localStorage.getItem("username");

    // Fetch data when the component mounts
    useEffect(() => {
        const fetchData = async (endpoint, stateSetter) => {
            try {
                const res = await api.get(endpoint);
                // Access data from response
                const data = res.data;
                stateSetter(data);
            } catch (err) {
                console.log('Error fetching data:', err);
            }
        };

        // Fetch livestock data
        fetchData('farm/livestock/', setLivestockData);
        // Fetch crop data
        fetchData('farm/crop/', setCropData);
        fetchData('farm/stores/', setStoreData);
        fetchData('farm/storages/', setStorageData);
    }, []);

    //set store and storage data
    const store = storeData[0] ? storeData[0] : null;
    const storage = storeData[0] ? storeData[0] : null;

    //get produce of crops and livestock
    

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Navbar />
            <div className="w-full px-4 py-12 lg:pl-80">
                <div className="h-full">
                    <div className="flex items-center w-full h-16 topBar">
                        <h1 className="font-bold uppercase">Welcome Back, {username}</h1>
                    </div>
                    <section className="grid grid-cols-1 gap-4 mainSection">
                        <section className="topSection">
                            <div className="flex flex-col">
                                <h3 className="font-medium uppercase">Overview</h3>
                                <div className="grid gap-4 md:grid-cols-4 sm:grid-cols-2 cardsContainer">
                                    <Card label="Number of Livestock" details={livestockData.length} />
                                    <Card label="Number of crops" details={cropData.length} />
                                    {store && (
                                        <Card label="Store Capacity" details={`${store.used_capacity}/${store.capacity}`} />
                                    )}

                                    {storage && (
                                        <Card label="Storage Capacity" details={`${storage.used_capacity}/${storage.capacity}`} />

                                    )}


                                </div>
                            </div>
                        </section>
                        <section className="grid grid-cols-1 md:grid-cols-2 bottomSection">
                            <div className="w-full p-4 chartDiv">
                                <h1 className="font-medium uppercase">Produce over time</h1>
                                {/* Replace with your chart component */}
                                <MyChart />
                            </div>
                            <div className="w-full p-4 detailsContainer">
                                <div className="services">
                                    <h1 className="font-medium uppercase">Services Requested</h1>
                                    <div className="mt-4">
                                        <NumberedListTable service="Ploughing" provider="Makiss Ltd" date="18-12-2023" />
                                    </div>
                                </div>
                                <div className="w-full p-4 farmActivities">
                                    <h1 className="font-medium uppercase">Upcoming Farm Activities</h1>
                                    <div className="mt-4">
                                        <ActivityTable activity="Weeding" date="12-05-2023" />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </section>
                </div>
            </div>
        </div>
    );
}
