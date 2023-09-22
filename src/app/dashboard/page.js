'use client';

import { useState } from "react";

import ActivityTable from "@/components/ActivityTable";
import Card from "@/components/Card";
import LineChart from "@/components/LineChart";
import Navbar from "@/components/Navbar";
import NumberedListTable from "@/components/ServiceTable";






export default function Dashboard() {
    const [selectedTimePeriod, setSelectedTimePeriod] = useState('7days');

    // Handle time period selection
    const handleTimePeriodChange = (period) => {
        setSelectedTimePeriod(period);
        // Implement logic to update chart data based on the selected time period here
    };

    const data = {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
        datasets: [
            {
                label: 'Produce of Crops',
                data: [50, 55, 60, 70, 65, 75, 80],
                borderColor: 'green',
                backgroundColor: 'transparent',
            },
            {
                label: 'Produce of Livestock',
                data: [30, 35, 40, 45, 50, 55, 60],
                borderColor: 'brown',
                backgroundColor: 'transparent',
            },
        ],
    };
    return (
        <div className='flex w-full min-h-screen bg-gray-100'>

            <div className="flex"><Navbar /></div>
            <div className="w-full min-h-screen px-8 lg:pl-80">
                <div className="h-full">
                    <div className="flex items-center w-full h-16 topBar">
                        <h1 className="font-bold uppercase">Welcome Back, John</h1>
                    </div>
                    <section className="flex flex-col w-full mainSection">
                        <section className="h-1/3 topSection">
                            <div className="flex flex-col h-full ">
                                <h3 className="font-medium uppercase">Overview</h3>
                                <div className="flex justify-center space-x-16 cardsContainer">
                                    <Card label="Number of cows" details="23" />
                                    <Card label="Number of crops" details="2,334" />
                                    <Card label="Store Capacity" details="10/100" />
                                    <Card label="Storage Capacity" details="12/50" />
                                </div>
                            </div>
                        </section>
                        <section className="flex-1 w-full bottomSection">
                            <div className="flex bottomSectionContainer">
                                <div className="w-1/2 py-4 chartDiv">
                                    <h1 className="font-medium uppercase">Produce over time</h1>
                                    <div className="">
                                    my chart
                                    </div>
                                </div>
                                <div className="flex flex-col w-1/2 p-4 detailsContainer">
                                    <div className="services h-1/2">
                                        <h1 className="font-medium uppercase">Services Requested</h1>
                                        <div className="p-8">  <NumberedListTable service="Ploughing" provider="Makiss Ltd" date="18-12-2023" /></div>
                                    </div>
                                    <div className="flex-1 farmActivities">
                                        <h1 className="font-medium uppercase">upcoming Farm activities</h1>
                                        <div className="p-8">
                                            <ActivityTable activity="Weeding" date="12-05-2023" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </section>
                </div>
            </div>

        </div>
    )
};
