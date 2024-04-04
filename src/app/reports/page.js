'use client';

import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import ServiceTable from "@/components/ServiceTable";
import ReportsTable from "@/components/ReportsTable";
import api from '../../utils/api';
import { toast } from "react-toastify"; // Import the toast library
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import React, { useState, useEffect } from 'react';


const Reports = () => {
    const [livestockProduceData, setLivestockProduceData] = useState([]);
    const [cropProduceData, setCropProduceData] = useState([]);
    const [selectedTimePeriod, setSelectedTimePeriod] = useState(30);
    const [serviceData, setServiceData] = useState([]);


    useEffect(() => {
        const fetchData = async (endpoint, stateSetter) => {
            try {
                const res = await api.get(endpoint);
                // Access data from response
                const data = res.data;
                stateSetter(data);
            } catch (err) {
                console.log('Error fetching data:', err);
            };
        };

        fetchData(`farm/produce/?last_days=${selectedTimePeriod}&content_type=13`, setLivestockProduceData);
        fetchData(`farm/produce/?last_days=${selectedTimePeriod}&content_type=14`, setCropProduceData);
        fetchData('farm/services/', setServiceData);
    }, [selectedTimePeriod]);

    console.log(cropProduceData);
    console.log(livestockProduceData);
    console.log(serviceData);

    const cropTransformedData = cropProduceData.map((item) => [
        item.name, // Product
        `${item.quantity}`, // Quantity
        (item.quantity * parseFloat(item.unit_price)).toFixed(2), // Price (KES)
        new Date(item.date).toLocaleDateString(), // Date
    ]);

    const livestockTransformedData = livestockProduceData.map((item) => [
        item.name, // Product
        `${item.quantity}`, // Quantity
        (item.quantity * parseFloat(item.unit_price)).toFixed(2), // Price (KES)
        new Date(item.date).toLocaleDateString(), // Date
    ]);

    const serviceTransformedData = serviceData.map((item) => [
        item.name, // Product
        item.cost, // Price (KES)
        new Date(item.date).toLocaleDateString(), // Date
    ]);

    const getTotalService = serviceTransformedData.reduce((total, row) => total + parseFloat(row[1]), 0).toFixed(2);
    const getTotalCrop = cropTransformedData.reduce((total, row) => total + parseFloat(row[2]), 0).toFixed(2);
    const getTotalLivestock = livestockTransformedData.reduce((total, row) => total + parseFloat(row[2]), 0).toFixed(2);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Navbar />
            <div className="w-full px-8 py-12 lg:pl-80">
                <div className="h-full">
                    <div className="flex items-center w-full h-16 topBar">
                        <h1 className="font-bold uppercase">Reports</h1>
                    </div>
                    <section className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 bottomSection">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            {/* Card 1: Total Farm Income */}
                            <Card label="Total Farm Income (KES)" details={(parseFloat(getTotalCrop) + parseFloat(getTotalLivestock)).toFixed(2)} />
                            {/* Card 2: Total Farm Losses */}
                            <Card label="Total Farm Expenditures (KES)" details={getTotalService} />
                            {/* Card 3: Total Farm Profits */}
                            <Card label="Total Farm Profits (KES)" details={(parseFloat(getTotalCrop) + parseFloat(getTotalLivestock) - parseFloat(getTotalService)).toFixed(2)} />
                        </div>
                        <div className="w-full mt-4">
                            <h1 className="font-medium uppercase">Farm Incomes</h1>
                            <div className="grid grid-cols-1 gap-8 mt-4 md:grid-cols-1 lg:grid-cols-2">
                                <ReportsTable
                                    title="Crops Sales"
                                    columns={["Product", "Quantity", "Price (KES)", "Date"]}
                                    data={cropTransformedData}
                                    totalLabel="Total Crops Sales (KES)"
                                    totalAmount={getTotalCrop}
                                />
                                <ReportsTable
                                    title="Livestock Sales"
                                    columns={["Product", "Quantity", "Price (KES)", "Date"]}
                                    data={livestockTransformedData}
                                    totalLabel="Total Livestock Sales (KES)"
                                    totalAmount={getTotalLivestock}
                                />
                                <ReportsTable
                                    title="Farm Expenses"
                                    columns={["Service", "Cost (KES)", "Date Incurred"]}
                                    data={serviceTransformedData}
                                    totalLabel="Total Farm Expenses (KES)"
                                    totalAmount={getTotalService}
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Reports;
