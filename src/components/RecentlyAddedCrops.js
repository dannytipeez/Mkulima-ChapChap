import React, { useEffect, useState } from "react";
import api from "../utils/api";

const RecentlyAddedCrops = () => {
  const [recentCrops, setRecentCrops] = useState([]);

  useEffect(() => {
    // Fetch recently added crops data from the API
    const fetchRecentCrops = async () => {
      try {
        const response = await api.get("farm/crop/");
        if (response.status === 200) {
          setRecentCrops(response.data);
        } else {
          // Handle other response statuses if needed
          console.error("Failed to fetch recently added crops");
        }
      } catch (error) {
        // Handle network errors or request failure
        console.error("Error fetching recently added crops:", error);
      }
    };

    // Call the fetch function
    fetchRecentCrops();
  }, []);

  return (
    <div className="w-full p-4 border">
      <h1 className="mb-4 font-medium uppercase">Recently Added Crops</h1>
      <div className="mt-4">
        {/* Display recently added crops */}
        <ul className="space-y-4">
          {recentCrops.map((crop) => (
            <li
              key={crop.id}
              className="p-4 transition duration-300 ease-in-out border rounded-md hover:bg-green-500"
            >
              <p className="text-lg font-semibold">{crop.crop_type}</p>
              <p className="text-gray-600">Quantity: {crop.number}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecentlyAddedCrops;
