'use client';

import Navbar from "@/components/Navbar";
import "./services.css";
import NumberedListTable from "@/components/ServiceTable";

const Services = () => {
    const service = "Ploughing"
    const provider = "Winass Ltd"
    const date = "18-06-2023"
    return (
        <div className='flex w-full min-h-screen bg-gray-100'>
            <div className="flex"><Navbar /></div>
            <div className="min-h-screen pl-8 lg:pl-80">
                <div className="">
                    <div className="flex items-center h-16 topBar">
                        <h1 className="font-bold uppercase">Services</h1>
                    </div>
                    <div className="fixed grid mainContainerServices">
                        <div className="topContainer">
                            <div className="services">
                                <h1 className="font-medium uppercase">Services Requested</h1>
                                <div className="mt-4 overflow-x-auto">
                                    <div className="tableDiv">
                                        <div className="mt-4 ">
                                            <table class="exTable shadow-lg bg-white overflow-x-auto">
                                                <tr>
                                                    <th class="bg-blue-100 border text-left px-8 py-4 ">#</th>
                                                    <th class="bg-blue-100  text-left px-8 py-4">Service</th>
                                                    <th class="bg-blue-100  text-left px-8 py-4">Provider</th>
                                                    <th class="bg-blue-100  text-left px-8 py-4">Cost</th>
                                                    <th class="bg-blue-100 text-left px-8 py-4 sm:px-2"></th>
                                                </tr>
                                                <tr className="hover:bg-green-100">
                                                    <td class=" px-8 py-4">1</td>
                                                    <td class=" px-8 py-4">Plumbing</td>
                                                    <td class=" px-8 py-4">Dante Sparks</td>
                                                    <td class=" px-8 py-4">10,000</td>
                                                </tr>
                                                <tr className="hover:bg-green-100">
                                                    <td class=" px-8 py-4 ">2</td>
                                                    <td class=" px-8 py-4">Centro comercial Moctezuma</td>
                                                    <td class=" px-8 py-4">Neal Garrison</td>
                                                    <td class=" px-8 py-4">Spain</td>
                                                </tr>
                                                <tr className="hover:bg-green-100">
                                                    <td class=" px-8 py-4">3</td>
                                                    <td class=" px-8 py-4">Ernst Handel</td>
                                                    <td class=" px-8 py-4">Maggie O'Neill</td>
                                                    <td class=" px-8 py-4">Austria</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 bottomContainer">
                            <div className="servicesAvailable">
                                <h1 className="font-medium uppercase">Services Available</h1>
                                <div className="tableDiv">
                                    <div className="mt-4 ">
                                        <table class="exTable shadow-lg bg-white overflow-x-auto">
                                            <tr>
                                                <th class="bg-blue-100 border text-left px-8 py-4 ">#</th>
                                                <th class="bg-blue-100  text-left px-8 py-4">Service</th>
                                                <th class="bg-blue-100  text-left px-8 py-4">Provider</th>
                                                <th class="bg-blue-100  text-left px-8 py-4">Cost</th>
                                                <th class="bg-blue-100 text-left px-8 py-4 sm:px-2"></th>
                                            </tr>
                                            <tr className="hover:bg-green-100">
                                                <td class=" px-8 py-4">1</td>
                                                <td class=" px-8 py-4">Plumbing</td>
                                                <td class=" px-8 py-4">Dante Sparks</td>
                                                <td class=" px-8 py-4">10,000</td>
                                            </tr>
                                            <tr className="hover:bg-green-100">
                                                <td class=" px-8 py-4 ">2</td>
                                                <td class=" px-8 py-4">Centro comercial Moctezuma</td>
                                                <td class=" px-8 py-4">Neal Garrison</td>
                                                <td class=" px-8 py-4">Spain</td>
                                            </tr>
                                            <tr className="hover:bg-green-100">
                                                <td class=" px-8 py-4">3</td>
                                                <td class=" px-8 py-4">Ernst Handel</td>
                                                <td class=" px-8 py-4">Maggie O'Neill</td>
                                                <td class=" px-8 py-4">Austria</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Services;
