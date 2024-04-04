'use client';

import Navbar from "@/components/Navbar";
import "./services.css";
import NumberedListTable from "@/components/ServiceTable";
import { useState, useEffect } from "react";
import api from '../../utils/api';
import { toast } from "react-toastify"; // Import the toast library
import "react-toastify/dist/ReactToastify.css";

const Services = () => {
    const [reloadNumberedList, setReloadNumberedList] = useState(false);
    const [service, setService] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [cost, setCost] = useState('');
    const [name, setName] = useState('');


    const handleServiceChange = (e) => {
        setService(e.target.value);
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleTimeChange = (e) => {
        setTime(e.target.value);
    };

    const handleCostChange = (e) => {
        setCost(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };



    const handleBookService = async () => {
        // Prepare the data to be sent to the API
        const data = {
            "service_type": service,
            "name": name,
            "cost": cost,
            "date": date,
            "time": time,
        };

        try {
            // Make a POST request to the API endpoint
            const response = await api.post(`farm/services/`, data);

            if (response.status === 201) {
                // The service was booked successfully
                toast.success(`Service ${name} booked successfully`); // Show a success toast
                // Reset the form by clearing the state
                setService("");
                setName("");
                setDate("");
                setTime("");
                setCost("");
                setReloadNumberedList(prevState => !prevState);
            } else {
                // Handle other response statuses if needed
                toast.error("Failed to book the service"); // Show an error toast
            }
        } catch (error) {
            // Handle network errors or request failure
            console.error("Error booking the service:", error);
            toast.error("An error occurred while booking the service"); // Show an error toast
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <div className="fixed"><Navbar /></div>

            <div className="w-full px-8 py-12 lg:pl-80">
                <div className="h-full">
                    <div className="flex items-center w-full h-16 topBar">
                        <h1 className="font-bold uppercase">Services</h1>
                    </div>
                    <div className="w-full p-6 overflow-y-auto bg-white rounded-lg shadow-md">
                        <div className="grid mainContainerServices">
                            <div className="topContainer">
                                <div className="services">
                                    <h1 className="font-medium uppercase">Services</h1>
                                    <div className="mt-4">
                                        <NumberedListTable reload={reloadNumberedList}/>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 overflow-x-auto bottomContainer">
                                <div className="orderService">
                                    <h1 className="font-medium uppercase">Order a Service</h1>
                                    <div className="tableDiv">
                                        <div className="mt-4 ">
                                            <div className="tableDiv">
                                                <div className="mt-4 ">
                                                    <div className="p-4 sm:p-8">
                                                        <div className="mb-4">
                                                            <label className="block mb-2 text-sm font-bold text-gray-700">Service</label>
                                                            <select
                                                                className="w-full p-2 border rounded"
                                                                value={service}
                                                                onChange={handleServiceChange}
                                                            >
                                                                <option value="">Select a service</option>
                                                                <option value="Planting">Planting</option>
                                                                <option value="Ploughing">Ploughing</option>
                                                                <option value="Weeding">Weeding</option>
                                                            </select>
                                                        </div>

                                                        <div className="mb-4">
                                                            <label className="block mb-2 text-sm font-bold text-gray-700">Name</label>
                                                            <input
                                                                type="text"
                                                                className="w-full p-2 border rounded"
                                                                value={name}
                                                                onChange={handleNameChange}
                                                            />
                                                        </div>
                                                        <div className="mb-4">
                                                            <label className="block mb-2 text-sm font-bold text-gray-700">Cost</label>
                                                            <input
                                                                type="number"
                                                                className="w-full p-2 border rounded"
                                                                value={cost}
                                                                onChange={handleCostChange}
                                                            />
                                                        </div>

                                                        <div className="mb-4">
                                                            <label className="block mb-2 text-sm font-bold text-gray-700">Date</label>
                                                            <input
                                                                type="date"
                                                                className="w-full p-2 border rounded"
                                                                value={date}
                                                                onChange={handleDateChange}
                                                            />
                                                        </div>

                                                        <div className="mb-4">
                                                            <label className="block mb-2 text-sm font-bold text-gray-700">Time</label>
                                                            <input
                                                                type="time"
                                                                className="w-full p-2 border rounded"
                                                                value={time}
                                                                onChange={handleTimeChange}
                                                            />
                                                        </div>

                                                        <button
                                                            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                                                            onClick={handleBookService}
                                                        >
                                                            Book
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Services;
