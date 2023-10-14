'use client';

import React from "react";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import ServiceTable from "@/components/ServiceTable";
import ReportsTable from "@/components/ReportsTable";

const Reports = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Navbar />
            <div className="w-full px-8 py-12 lg:pl-80">
                <div className="h-full">
                    <div className="flex items-center w-full h-16 topBar">
                        <h1 className="font-bold uppercase">Reports</h1>
                    </div>
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 bottomSection">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            {/* Card 1: Total Farm Income */}
                            <Card label="Total Farm Income (KES)" details="10,000" />
                            {/* Card 2: Total Farm Losses */}
                            <Card label="Total Farm Losses (KES)" details="5,000" />
                            {/* Card 3: Total Farm Profits */}
                            <Card label="Total Farm Profits (KES)" details="5,000" />
                        </div>
                        <div className="w-full mt-4">
                            <h1 className="font-medium uppercase">Farm Incomes</h1>
                            <div className="grid grid-cols-1 gap-8 mt-4 md:grid-cols-1 lg:grid-cols-2">
                                <ReportsTable
                                    title="Crops Sales"
                                    columns={["Product", "Quantity", "Price (KES)", "Date"]}
                                    data={[
                                        ["Maize", "20 bags", "20,000", "12-12-2023"],
                                        // Add more rows as needed
                                    ]}
                                    totalLabel="Total Crops Sales (KES)"
                                    totalAmount="100,000"
                                />
                                <ReportsTable
                                    title="Livestock Sales"
                                    columns={["Product", "Quantity", "Price (KES)", "Date"]}
                                    data={[
                                        ["Meat", "20 kg", "20,000", "12-12-2023"],
                                        // Add more rows as needed
                                    ]}
                                    totalLabel="Total Livestock Sales (KES)"
                                    totalAmount="50,000"
                                />
                                <ReportsTable
                                    title="Farm Expenses"
                                    columns={["Service", "Quantity", "Cost (KES)", "Date Incurred"]}
                                    data={[
                                        ["Spraying", "1", "20,000", "12-12-2023"],
                                        // Add more rows as needed
                                    ]}
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
