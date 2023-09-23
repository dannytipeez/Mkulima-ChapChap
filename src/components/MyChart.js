"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useState, useEffect } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

const MyChart = () => {
    const [selectedTimePeriod, setSelectedTimePeriod] = useState('Today');

    const timePeriods = {
        'Today': [12, 19],
        'Last 7 Days': [50, 60],
        'Last 1 Month': [10, 180],
        'Last 3 Months': [600, 540],
        'Last 1 Year': [180, 2160],
    };

    const chartData = {
        labels: ['Produce from Crops', 'Produce from Livestock'],
        datasets: [
            {
                label: 'Quantity Produced',
                data: timePeriods[selectedTimePeriod],
                backgroundColor: ['rgba(64, 192, 87, 0.5)', 'rgba(165, 42, 42, 0.6)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(165, 42, 42, 1)'],
                borderWidth: 1,
            },
        ],
    };

    useEffect(() => {
        const updateChartData = (period) => {
            chartData.datasets[0].data = timePeriods[period];
        };

        updateChartData(selectedTimePeriod);
    }, [selectedTimePeriod]);

    return (
        <div className="w-full">
            <div className="grid justify-center grid-cols-2 gap-2 py-2 mb-4 lg:grid-cols-5 md:grid-cols-3">
                <button
                    className={`px-4 py-2 mr-2 rounded-lg focus:outline-none ${
                        selectedTimePeriod === 'Today' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                    onClick={() => setSelectedTimePeriod('Today')}
                >
                    Today
                </button>
                <button
                    className={`px-4 py-2 md:px-3 sm:px-2 mr-2 rounded-lg focus:outline-none ${
                        selectedTimePeriod === 'Last 7 Days' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                    onClick={() => setSelectedTimePeriod('Last 7 Days')}
                >
                    Last 7 Days
                </button>
                <button
                    className={`px-4 py-2 mr-2 rounded-lg focus:outline-none ${
                        selectedTimePeriod === 'Last 1 Month' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                    onClick={() => setSelectedTimePeriod('Last 1 Month')}
                >
                    Last 1 Month
                </button>
                <button
                    className={`px-4 py-2 mr-2 rounded-lg focus:outline-none ${
                        selectedTimePeriod === 'Last 3 Months' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                    onClick={() => setSelectedTimePeriod('Last 3 Months')}
                >
                    Last 3 Months
                </button>
                <button
                    className={`px-4 py-2 rounded-lg focus:outline-none ${
                        selectedTimePeriod === 'Last 1 Year' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                    onClick={() => setSelectedTimePeriod('Last 1 Year')}
                >
                    Last 1 Year
                </button>
            </div>
            <Doughnut data={chartData} />
        </div>
    );
}

export default MyChart;
