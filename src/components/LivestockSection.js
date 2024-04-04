"use client";

// components/LivestockSection.js
import React from "react";
import RecentlyAddedLivestock from "./RecentlyAddedLivestock";
import AddLivestockForm from "./AddLivestockForm";

const LivestockSection = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Livestock Section</h2>
      <RecentlyAddedLivestock />
      <AddLivestockForm />
    </div>
  );
};

export default LivestockSection;