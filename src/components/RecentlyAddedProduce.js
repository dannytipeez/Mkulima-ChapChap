import React, { useEffect, useState } from "react";
import api from "../utils/api";

const RecentlyAddedProduce = () => {
  const [recentProduce, setRecentProduce] = useState([]);

  useEffect(() => {
    // Fetch recently added produce data from the API
    const fetchRecentProduce = async () => {
      try {
        const response = await api.get("farm/produce/");
        if (response.status === 200) {
          // Set the recently added produce data in the state
          setRecentProduce(response.data);
        } else {
          // Handle other response statuses if needed
          console.error("Failed to fetch recently added produce");
        }
      } catch (error) {
        // Handle network errors or request failure
        console.error("Error fetching recently added produce:", error);
      }
    };

    // Call the fetch function
    fetchRecentProduce();
  }, []); // Empty dependency array to run the effect only once

  return (
    <div className="w-full p-4 border">
      <h1 className="font-medium uppercase mb-4">Recently Added Produce</h1>
      <div className="mt-4 ">
        {/* Display recently added produce */}
        <ul className="space-y-4">
          {recentProduce.map((produce) => (
            <li
              key={produce.id}
              className="hover:bg-blue-500 text-gray-600 hover:text-white transition duration-300 ease-in-out p-4 rounded-md border"
            >
              {/* Customize the display based on your produce data structure */}
              <p className="text-lg font-semibold">{produce.name}</p>
              <p className="">Quantity: {produce.quantity}</p>
              <p className="">Date: {produce.date}</p>
              {/* Add more details as needed */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecentlyAddedProduce;
