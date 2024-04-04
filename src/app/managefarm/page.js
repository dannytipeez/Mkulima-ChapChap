"use client";

// pages/manage-farm.js
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import LivestockSection from "@/components/LivestockSection";
import CropSection from "@/components/CropSection";
import ProduceSection from "@/components/ProduceSection";

const ManageFarm = () => {
  const [activeTab, setActiveTab] = useState("livestock");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="w-full px-8 py-12 lg:pl-80">
        <div className="h-full">
          <div className="flex items-center w-full h-16 topBar">
            <h1 className="font-bold uppercase">Manage Farm</h1>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            {/* Tabs */}
            <div className="flex justify-between mb-4">
              <TabButton
                label="Livestock"
                isActive={activeTab === "livestock"}
                onClick={() => handleTabChange("livestock")}
              />
              <TabButton
                label="Crop"
                isActive={activeTab === "crop"}
                onClick={() => handleTabChange("crop")}
              />
              <TabButton
                label="Produce"
                isActive={activeTab === "produce"}
                onClick={() => handleTabChange("produce")}
              />
            </div>
            {/* Content based on active tab */}
            {activeTab === "livestock" && <LivestockSection />}
            {activeTab === "crop" && <CropSection />}
            {activeTab === "produce" && <ProduceSection />}
          </div>
        </div>
      </div>
    </div>
  );
};

const TabButton = ({ label, isActive, onClick }) => {
  const activeClass = isActive ? "text-green-500 border-b-2 border-green-500" : "";

  return (
    <button
      className={`text-sm font-medium text-gray-500 focus:outline-none ${activeClass}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default ManageFarm;
