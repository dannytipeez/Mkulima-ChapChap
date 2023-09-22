// components/LineChart.js
"use client";
// import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ data }) => {
    const options = {
        scales: {
            x: {
                type: 'category', // Use category scale for the X-axis
            },
        },
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow">
            <Line data={data} />
        </div>
    );
};

export default LineChart;
