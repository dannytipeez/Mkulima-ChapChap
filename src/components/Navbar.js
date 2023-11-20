"use client";


// components/Sidebar.js
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import {
    MdOutlineSpaceDashboard,
    MdOutlineAnalytics,
    MdOutlineAgriculture,
    MdOutlineMoreHoriz,
    MdOutlineSettings,
    MdOutlineLogout,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaRegComments } from "react-icons/fa";
import { BiMessageSquareDots, BiCalendarEdit } from "react-icons/bi";

import { useDispatch, useSelector } from 'react-redux';
import { logOut, auth } from '@/redux/features/auth-Slice';
import { useRouter } from 'next/navigation';


function Sidebar() {
    const dispatch = useDispatch();
    const router = useRouter();



    const handleLogout = () => {
        dispatch(logOut())
            .unwrap()
            .then(() => {
                router.push('/login'); // Redirect to login page after logout
            });
    };

    return (
        <div>
            <Disclosure as="nav">
                <Disclosure.Button   className="absolute inline-flex items-center justify-center p-2 text-green-500 rounded-md top-4 left-4 peer hover:bg-green-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
                    <GiHamburgerMenu className="block w-6 h-6 lg:hidden" aria-hidden="true" />
                </Disclosure.Button>
                <div className="fixed top-0 z-20 h-screen p-6 duration-200 ease-out delay-150 bg-white -left-96 lg:left-0 lg:w-72 peer-focus:left-0 peer:transition md:w-64">
                    <div className="flex flex-col justify-start item-center">
                        <h1 className="w-full pb-4 text-base font-bold text-center text-green-600 border-b border-gray-100 cursor-pointer">
                            Mkulima ChapChap
                        </h1>
                        <div className="pb-4 my-4 border-b border-gray-100">
                            {/* Dashboard */}
                            <NavItem icon={<MdOutlineSpaceDashboard />} label="Dashboard" href="/dashboard" />
                            {/* Integration */}
                            <NavItem icon={<MdOutlineAgriculture />} label="Services" href="/services" />
                            {/* Comments */}
                            <NavItem icon={<FaRegComments />} label="Ask Experts" href="/enquire" />
                            {/* Analytics */}
                            <NavItem icon={<MdOutlineAnalytics />} label="Reports" href="/reports" />
                            {/* Messages */}
                            <NavItem icon={<BiCalendarEdit />} label="Plan Farm Activity" href="/farmactivity" />


                        </div>
                        {/* Settings */}
                        <div className="pb-4 my-4 border-b border-gray-100">
                            <NavItem icon={<MdOutlineSettings />} label="Settings" href="/settings"/>
                            <NavItem icon={<CgProfile />} label="Profile" href="/profile" />
                            {/* <NavItem icon={<MdOutlineMoreHoriz />} label="More" /> */}
                        </div>
                        {/* Logout */}
                        <div className="my-6">
                            <div onClick={handleLogout} className="flex items-center justify-start gap-4 p-2 pl-5 m-auto mb-2 text-white bg-green-600 rounded-md cursor-pointer hover:bg-green-900 group hover:shadow-lg hover:text-white">
                            <MdOutlineLogout />
                                <button className="text-base font-semibold text-white group-hover:text-white">Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Disclosure>
        </div>
    );
}

function NavItem({ icon, label, href }) {
    return (
        <div className="flex items-center justify-start gap-4 p-2 pl-5 m-auto mb-2 text-black rounded-md cursor-pointer hover:bg-green-600 group hover:shadow-lg hover:text-white">
            {icon}
            <a className="text-base font-semibold text-black group-hover:text-white" href={href}>{label}</a>
        </div>
    );
}

export default Sidebar;
