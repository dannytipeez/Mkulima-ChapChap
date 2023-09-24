'use client';

import Navbar from "@/components/Navbar";
import NumberedListTable from "@/components/ServiceTable";

const Services = () => {
    const service = "Ploughing"
    const provider = "Winass Ltd"
    const date = "18-06-2023"
    return (
        <div className='flex w-full min-h-screen bg-gray-100'>
            <div className="flex"><Navbar /></div>
            <div className="min-h-screen pl-8 lg:pl-80">
                <div className="h-full">
                    <div className="flex items-center w-full h-16 topBar">
                        <h1 className="font-bold uppercase">Services</h1>
                    </div>
                    <div className="flex flex-col min-w-screen mainContainer">
                        <div className="topContainer">
                            <div className="services">
                                <h1 className="font-medium uppercase">Services Requested</h1>
                                <div className="mt-4 ">
                                    <NumberedListTable service="Ploughing" provider="Makiss Ltd" date="18-12-2023" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 bottomContainer">
                            <div className="servicesAvailable">
                                <h1 className="font-medium uppercase">Services Available</h1>
                                <div className="mt-4">


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