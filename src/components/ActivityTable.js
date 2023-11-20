"use client";

import { useEffect, useState } from "react";
import api from '../utils/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// components/ActivityTable.js

const ActivityTable = ({ reload, numberOfItems }) => {
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
    }, [reload]);

    const slicedActivityData = numberOfItems !== null ? activityData.slice(0, numberOfItems) : activityData;



    const handleDelete = async (id, name) => {
        try {
            await api.delete(`farm/farm-activities/${id}/`);
            setActivityData(prevData => prevData.filter(item => item.id !== id));
            toast.success(`${name} deleted successfully!`);
        } catch (error) {
            console.error('Error deleting item:', error);
            toast.error('Error deleting item. Please try again.');
        }
    };
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
                        {!numberOfItems && <th className="w-1/12 py-4 text-gray-800 bg-gray-200 sm:w-1/6 md:w-1/4 lg:w-1/6">Actions</th>}
                    </tr>
                </thead>
                <tbody>
                {slicedActivityData.map((item, index) => (
                        <tr className="transition duration-150 hover:bg-green-200" key={index}>
                            <td className="px-2 py-4 sm:px-4 md:px-8">{index + 1}</td>
                            <td className="px-2 py-4 sm:px-4 md:px-8">{item.activity_type}</td>
                            <td className="px-2 py-4 sm:px-4 md:px-8">{item.date}</td>
                            <td className="px-2 py-4 sm:px-4 md:px-8">{item.time}</td>
                            <td className="px-2 py-4 sm:px-4 md:px-8">{item.status}</td>
                            {!numberOfItems && (
                                <td className="px-2 py-4 sm:px-4 md:px-8">
                                    <button
                                        onClick={() => handleDelete(item.id, item.activity_type)}
                                        className="px-2 py-1 text-white bg-red-500 rounded-md hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ActivityTable;
