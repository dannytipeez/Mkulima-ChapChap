"use client";

// components/ProduceSection.js
import React from "react";
import RecentlyAddedProduce from "./RecentlyAddedProduce";
import AddProduceForm from "./AddProduceForm";

const ProduceSection = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Produce Section</h2>
      <RecentlyAddedProduce />
      <AddProduceForm />
    </div>
  );
};

export default ProduceSection;
