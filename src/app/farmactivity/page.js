
'use client';

// FarmActivityPage.js

import React, { useState } from "react";
import { FiCalendar } from "react-icons/fi";
import WeatherCard from "@/components/WeatherCard"; // Import the WeatherCard component
import ActivityTable from "@/components/ActivityTable";
import Navbar from "@/components/Navbar";
import { toast } from "react-toastify"; // Import the toast library
import "react-toastify/dist/ReactToastify.css";
import api from '../../utils/api';

export default function FarmActivityPage() {
  const [farmActivityName, setFarmActivityName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // const handleFarmActivitySubmit = () => {
  //   console.log("Farm Activity:", farmActivityName);
  //   console.log("Selected Date:", selectedDate);
  //   console.log("Selected Time:", selectedTime);
  // };

  const handleFarmActivitySubmit = async () => {
    // Prepare the data to be sent to the API
    const data = {
      "activity_type": farmActivityName,
      "date": selectedDate,
      "time": selectedTime,
    };

    try {
      // Make a POST request to the API endpoint
      const response = await api.post(`farm/farm-activities/`, data);

      if (response.status === 201) {
        // The service was booked successfully
        toast.success(`Farm activity ${farmActivityName} planned successfully`); // Show a success toast
        // Reset the form by clearing the state
        setFarmActivityName("");
        setSelectedDate("");
        setSelectedTime("");
      } else {
        // Handle other response statuses if needed
        toast.error("Failed to plan farm activity"); // Show an error toast
      }
    } catch (error) {
      // Handle network errors or request failure
      console.error("Error planning farm activity:", error);
      toast.error("An error occurred while planning farm activity"); // Show an error toast
    }
  };


  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="w-full px-8 py-12 lg:pl-80">
        <div className="h-full">
          <div className="flex items-center w-full h-16 topBar">
            <h1 className="font-bold uppercase">Farm Activity</h1>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-2">
            {/* Top Section */}
            <div className="w-full p-4">
              <h1 className="font-medium uppercase">Upcoming Farm Activities</h1>
              <div className="mt-4">
                <ActivityTable activity="Weeding" date="12-05-2023" />
              </div>
            </div>

            {/* Weather Updates */}
            <div className="w-full p-4">
              <h1 className="font-medium uppercase">Weather Updates</h1>
              <div className="mt-4">
                {/* Weather Cards */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <WeatherCard
                    day="Monday"
                    temperature="25°C"
                    condition="Sunny"
                    colorClass="bg-orange-400 text-white"
                  />
                  <WeatherCard
                    day="Tuesday"
                    temperature="22°C"
                    condition="Cloudy"
                    colorClass="bg-blue-400 text-white"
                  />
                  <WeatherCard
                    day="Wednesday"
                    temperature="18°C"
                    condition="Rainy"
                    colorClass="bg-gray-400 text-white"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Bottom Section */}
          <section className="mt-8">
            <h1 className="font-medium uppercase">Enter Farm Activity</h1>
            <div className="flex flex-col w-full p-4 mt-4">
              {/* Activity Name */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">Farm Activity</label>
                <select
                  className="w-full p-2 border rounded"
                  value={farmActivityName}
                  onChange={(e) => setFarmActivityName(e.target.value)}
                >
                  <option value="">Select a Farm Activity</option>
                  <option value="Planting">Planting</option>
                  <option value="Ploughing">Ploughing</option>
                  <option value="Weeding">Weeding</option>
                  {/* Add more service options as needed */}
                </select>
              </div>

              {/* Select Date */}


              <div className="mt-4">
                <label>Select Date</label>
                <div className="flex items-center">
                  <FiCalendar className="text-gray-500" />
                  <input
                    type="date"
                    placeholder="Select Date (e.g., 31-12-2023)"
                    className="w-full px-3 py-2 ml-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
              </div>

              {/* Choose Your Time */}
              <div className="mt-4 ">
                <label>Select Time</label>
                <div className="flex items-center">
                  <FiCalendar className="text-gray-500" />
                  <input
                    type="time"
                    placeholder="Choose Your Time (hh:mm)"
                    className="w-full px-3 py-2 ml-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                  />
                </div>
              </div>

              {/* Plan Activity Button */}
              <button
                className="px-4 py-2 mt-4 text-white bg-green-500 rounded-md hover:bg-green-600"
                onClick={handleFarmActivitySubmit}
              >
                Plan Activity
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
