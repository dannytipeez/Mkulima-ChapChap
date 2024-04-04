import React, { useEffect, useState } from "react";
import api from "../utils/api";

const RecentlyAddedLivestock = () => {
  const [recentLivestock, setRecentLivestock] = useState([]);

  useEffect(() => {
    // Fetch recently added livestock data from the API
    const fetchRecentLivestock = async () => {
      try {
        const response = await api.get("farm/livestock/");
        if (response.status === 200) {
          setRecentLivestock(response.data);
        } else {
          // Handle other response statuses if needed
          console.error("Failed to fetch recently added livestock");
        }
      } catch (error) {
        // Handle network errors or request failure
        console.error("Error fetching recently added livestock:", error);
      }
    };

    // Call the fetch function
    fetchRecentLivestock();
  }, []);

  return (
    <div className="w-full p-4 border">
      <h1 className="mb-4 font-medium uppercase">Recently Added Livestock</h1>
      <div className="mt-4">
        {/* Display recently added livestock */}
        <ul className="space-y-4">
          {recentLivestock.map((livestock) => (
            <li
              key={livestock.id}
              className="p-4 text-gray-600 transition duration-300 ease-in-out border rounded-md hover:bg-red-500 hover:text-white"
            >
              <p className="text-lg font-semibold">{livestock.animal_type}</p>
              <p className="">Quantity: {livestock.number}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecentlyAddedLivestock;
