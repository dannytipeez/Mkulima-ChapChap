'use client';


// WeatherCard.js

import React from "react";

function WeatherCard({ day, time, temperature, condition }) {
  // Determine the background color based on weather condition
  const getBackgroundColor = () => {
    console.log(temperature);
    if (temperature <=16) {
      return "bg-blue-400";
    } else if (temperature <=23) {
      return "bg-orange-400";
    } else {
      // Add more conditions as needed
      return "bg-red-400";
    }
  };

  return (
    <div className={`p-4 rounded-md ${getBackgroundColor()} text-white`}>
      <h2 className="font-medium">{day}</h2>
      <p>{time}</p>
      <p className="text-lg">{temperature}°C</p>
      <p>{condition}</p>
    </div>
  );
}

export default WeatherCard;
