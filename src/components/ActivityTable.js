"use client";

import { useEffect, useState } from "react";
import api from '../utils/api';

// components/ActivityTable.js

const ActivityTable = ({ activity, date }) => {
    const [activityData, setActivityData] = useState([]);
    useEffect(() => {

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
        fetchData(`farm/farm-activities/`, setActivityData);
    }, []);

    console.log(activityData);
    return (
        <div className="overflow-x-auto rounded-sm shadow-md">
            <table className="w-full border-collapse border-gray-300">
                <thead>
                    <tr>
                        <th className="w-1/12 py-4 text-gray-800 bg-gray-200 sm:w-1/6 md:w-1/4 lg:w-1/6"> #</th>
                        <th className="w-2/12 py-4 text-gray-800 bg-gray-200 sm:w-2/3 md:w-1/2 lg:w-3/5">Activity</th>
                        <th className="w-1/3 py-4 text-gray-800 bg-gray-200 sm:w-1/2 md:w-1/4 lg:w-1/2">Date</th>
                        <th className="w-2/12 py-4 text-gray-800 bg-gray-200 sm:w-2/3 md:w-1/2 lg:w-3/5">Time</th>
                        <th className="w-1/3 py-4 text-gray-800 bg-gray-200 sm:w-1/2 md:w-1/4 lg:w-1/2">Status</th>
                    </tr>
                </thead>
                <tbody>
                {activityData.map((item, index) => (
                        <tr className="transition duration-150 hover:bg-green-200" key={index}>
                            <td className="px-2 py-4 sm:px-4 md:px-8">{index + 1}</td>
                            <td className="px-2 py-4 sm:px-4 md:px-8">{item.activity_type}</td>
                            <td className="px-2 py-4 sm:px-4 md:px-8">{item.date}</td>
                            <td className="px-2 py-4 sm:px-4 md:px-8">{item.time}</td>
                            <td className="px-2 py-4 sm:px-4 md:px-8">{item.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ActivityTable;
