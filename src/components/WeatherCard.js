'use client';


// WeatherCard.js

import React from "react";

function WeatherCard({ day, temperature, condition, colorClass }) {
  return (
    <div className={`p-4 rounded-md ${colorClass}`}>
      <h2 className="font-medium">{day}</h2>
      <p className="text-lg">{temperature}</p>
      <p>{condition}</p>
    </div>
  );
}

export default WeatherCard;
