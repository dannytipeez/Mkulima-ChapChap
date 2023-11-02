"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import api from '../utils/api';

ChartJS.register(ArcElement, Tooltip, Legend);

const MyChart = () => {
    const [selectedTimePeriod, setSelectedTimePeriod] = useState(1);
    const [livestockProduceData, setLivestockProduceData] = useState([]);
    const [cropProduceData, setCropProduceData] = useState([]);

    const timePeriods = {
        1: [12, 19],
        7: [50, 60],
        30: [10, 180],
        90: [600, 540],
        365: [180, 2160],
    };




    useEffect(() => {
        const updateChartData = (period) => {
            chartData.datasets[0].data = timePeriods[period];
        };

        const fetchData = async (endpoint, stateSetter) => {
            try {
                const res = await api.get(endpoint);
                // Access data from response
                const data = res.data;
                stateSetter(data);
            } catch (err) {
                console.log('Error fetching data:', err);
            };
        };

        updateChartData(selectedTimePeriod);
        fetchData(`farm/produce/?last_days=${selectedTimePeriod}&content_type=17`, setLivestockProduceData);
        fetchData(`farm/produce/?last_days=${selectedTimePeriod}&content_type=19`, setCropProduceData);
    }, [selectedTimePeriod]);

    console.log(cropProduceData);
    console.log(livestockProduceData);

    const totalOfLivestockProduce = livestockProduceData.reduce((total, item) => total + item.quantity, 0);

    console.log('livestock', totalOfLivestockProduce);

    const totalOfCropProduce = cropProduceData.reduce((total, item) => total + item.quantity, 0);

    console.log('crop', totalOfCropProduce);

    const chartData = {
        labels: ['Produce from Crops', 'Produce from Livestock'],
        datasets: [
            {
                label: 'Quantity Produced',
                data: [totalOfCropProduce, totalOfLivestockProduce],
                backgroundColor: ['rgba(64, 192, 87, 0.5)', 'rgba(165, 42, 42, 0.6)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(165, 42, 42, 1)'],
                borderWidth: 1,
            },
        ],
    };

    //get produce crop

    return (
        <div className="w-full">
            <div className="grid justify-center grid-cols-2 gap-2 py-2 mb-4 lg:grid-cols-5 md:grid-cols-3">
                <button
                    className={`px-4 py-2 mr-2 rounded-lg focus:outline-none ${selectedTimePeriod === 'Today' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                        }`}
                    onClick={() => setSelectedTimePeriod(1)}
                >
                    Today
                </button>
                <button
                    className={`px-4 py-2 md:px-3 sm:px-2 mr-2 rounded-lg focus:outline-none ${selectedTimePeriod === 'Last 7 Days' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                        }`}
                    onClick={() => setSelectedTimePeriod(7)}
                >
                    Last 7 Days
                </button>
                <button
                    className={`px-4 py-2 mr-2 rounded-lg focus:outline-none ${selectedTimePeriod === 'Last 1 Month' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                        }`}
                    onClick={() => setSelectedTimePeriod(30)}
                >
                    Last 1 Month
                </button>
                <button
                    className={`px-4 py-2 mr-2 rounded-lg focus:outline-none ${selectedTimePeriod === 'Last 3 Months' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                        }`}
                    onClick={() => setSelectedTimePeriod(90)}
                >
                    Last 3 Months
                </button>
                <button
                    className={`px-4 py-2 rounded-lg focus:outline-none ${selectedTimePeriod === 'Last 1 Year' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                        }`}
                    onClick={() => setSelectedTimePeriod(365)}
                >
                    Last 1 Year
                </button>
            </div>
            <Doughnut data={chartData} />
        </div>
    );
}

export default MyChart;
