"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import api from '../../utils/api';
import { toast } from "react-toastify"; // Import the toast library
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';


const Enquiry = () => {
    // Define state variables for form input and output
    const [expertQuestion, setExpertQuestion] = useState("");
    const [chatGPTQuestion, setChatGPTQuestion] = useState("");
    const [expertResult, setExpertResult] = useState("");
    const [chatGPTResult, setChatGPTResult] = useState("");

    // Function to submit a question to the expert
    const submitToExpert = () => {
        const result = "Expert's answer goes here";
        setExpertResult(result);
    };

    const submitToChatGPT = async () => {
        const data = {
            "question": chatGPTQuestion,
        };
        console.log(chatGPTQuestion);

        axios({
            method: 'post',
            url: "http://localhost:8000/api/v1/farm/questions/ask/chatgpt/",
            data: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then((response) => {
                console.log(response.data);
                setChatGPTResult(response.data.answer);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className='flex w-full min-h-screen bg-gray-100'>
            <div className="flex"><Navbar /></div>
            <div className="min-h-screen pl-8 lg:pl-80">
                <div className="flex flex-col justify-center pt-12 pr-8 lg:flex-row lg:w-full">
                    {/* Card 1: Ask an Expert */}
                    <div className="w-full p-4 lg:w-1/2">
                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <h2 className="mb-4 text-xl font-semibold">Ask an Expert</h2>
                            <textarea
                                className="w-full h-24 p-2 mb-4 border rounded-lg"
                                placeholder="Ask your question to an Agricultural Expert"
                                value={expertQuestion}
                                onChange={(e) => setExpertQuestion(e.target.value)}
                            ></textarea>
                            <button
                                className="w-full p-2 text-white bg-orange-500 rounded-lg"
                                onClick={submitToExpert}
                            >
                                Ask Expert
                            </button>
                            {expertResult && (
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold">Expert's Answer:</h3>
                                    <p>{expertResult}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Card 2: Ask ChatGPT */}
                    <div className="w-full p-4 lg:w-1/2">
                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <h2 className="mb-4 text-xl font-semibold">Ask ChatGPT</h2>
                            <textarea
                                className="w-full h-24 p-2 mb-4 border rounded-lg"
                                placeholder="Ask your question to ChatGPT"
                                value={chatGPTQuestion}
                                onChange={(e) => setChatGPTQuestion(e.target.value)}
                            ></textarea>
                            <button
                                className="w-full p-2 text-white bg-green-500 rounded-lg"
                                onClick={submitToChatGPT}
                            >
                                Ask ChatGPT
                            </button>
                            {chatGPTResult && (
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold">ChatGPT's Answer:</h3>
                                    <p>{chatGPTResult}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Enquiry;