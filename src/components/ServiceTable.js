"use client";


// components/NumberedListTable.js
import React, { useEffect, useState } from "react";
import api from '../utils/api';
import { toast } from 'react-toastify';

const NumberedListTable = ({ reload, numberOfItems }) => {
    const [serviceData, setServiceData] = useState([]);

    useEffect(() => {
        const fetchData = async (endpoint, stateSetter) => {
            try {
                const res = await api.get(endpoint);
                const data = res.data;
                stateSetter(data);
            } catch (err) {
                console.log('Error fetching data:', err);
            };
        };

        fetchData(`farm/services/`, setServiceData);
    }, [reload]);

    const slicedServiceData = numberOfItems !== null ? serviceData.slice(0, numberOfItems) : serviceData;

    const handleDelete = async (id, name) => {
        try {
            await api.delete(`farm/services/${id}/`);
            setServiceData(prevData => prevData.filter(item => item.id !== id));
            toast.success(`Service "${name}" deleted successfully!`);
        } catch (error) {
            console.error('Error deleting service:', error);
            toast.error('Error deleting service. Please try again.');
        }
    };

    return (
        <div className="overflow-x-auto rounded-sm shadow-md">
            <table className="w-full border-collapse border-gray-300">
                <thead>
                    <tr>
                        <th className="w-1/12 py-4 bg-gray-200 sm:w-1/6 md:w-1/4 lg:w-1/6"> #</th>
                        <th className="w-2/12 py-4 bg-gray-200 sm:w-2/6 md:w-1/4 lg:w-2/6">Service</th>
                        <th className="w-2/12 py-4 bg-gray-200 sm:w-2/6 md:w-1/4 lg:w-2/6">Cost</th>
                        <th className="w-2/12 py-4 bg-gray-200 sm:w-2/6 md:w-1/4 lg:w-2/6">Date</th>
                        <th className="w-2/12 py-4 bg-gray-200 sm:w-2/6 md:w-1/4 lg:w-2/6">Status</th>
                        {!numberOfItems && <th className="w-1/12 py-4 bg-gray-200 sm:w-1/6 md:w-1/4 lg:w-1/6">Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {slicedServiceData.map((item, index) => (
                        <tr className="transition duration-150 hover:bg-green-200" key={index}>
                            <td className="px-2 py-4 sm:px-4 md:px-8">{index + 1}</td>
                            <td className="px-2 py-4 sm:px-4 md:px-8">{item.name}</td>
                            <td className="px-2 py-4 sm:px-4 md:px-8">{item.cost}</td>
                            <td className="px-2 py-4 sm:px-4 md:px-8">{item.date}</td>
                            <td className="px-2 py-4 sm:px-4 md:px-8">{item.status}</td>
                            {!numberOfItems && (
                                <td className="px-2 py-4 sm:px-4 md:px-8">
                                    <button
                                        onClick={() => handleDelete(item.id, item.name)}
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

export default NumberedListTable;
