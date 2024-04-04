"use client"

// components/CropSection.js
import React from "react";
import RecentlyAddedCrops from "./RecentlyAddedCrops";
import AddCropForm from "./AddCropForm";

const CropSection = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Crop Section</h2>
      <RecentlyAddedCrops />
      <AddCropForm />
    </div>
  );
};

export default CropSection;
