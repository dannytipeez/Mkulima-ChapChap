"use client";


// components/ActivityTable.js

const ActivityTable = ({ activity, date }) => {
    return (
        <div className="overflow-x-auto rounded-sm shadow-md">
            <table className="w-full border-collapse border-gray-300">
                <thead>
                    <tr>
                        <th className="w-1/12 py-4 text-gray-800 bg-gray-200 sm:w-1/6 md:w-1/4 lg:w-1/6"> #</th>
                        <th className="w-2/12 py-4 text-gray-800 bg-gray-200 sm:w-2/3 md:w-1/2 lg:w-3/5">Activity</th>
                        <th className="w-1/3 py-4 text-gray-800 bg-gray-200 sm:w-1/2 md:w-1/4 lg:w-1/2">Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="px-12 py-4 align-middle sm:w-1/6 md:w-1/4 lg:w-1/6">1</td>
                        <td className="py-4 align-middle md:px-32 lg:px-56 sm:w-2/3 lg:w-3/5 md:pl-16">{activity}</td>
                        <td className="px-2 py-4 align-middle sm:px-4 md:px-8">{date}</td>
                    </tr>
                    <tr>
                        <td className="px-12 py-4 align-middle sm:w-1/6 md:w-1/4 lg:w-1/6">2</td>
                        <td className="py-4 align-middle md:px-32 lg:px-56 sm:w-2/3 lg:w-3/5 md:pl-16">{activity}</td>
                        <td className="px-2 py-4 align-middle sm:px-4 md:px-8">{date}</td>
                    </tr>
                    <tr>
                        <td className="px-12 py-4 align-middle sm:w-1/6 md:w-1/4 lg:w-1/6">3</td>
                        <td className="py-4 align-middle md:px-32 lg:px-56 sm:w-2/3 lg:w-3/5 md:pl-16">{activity}</td>
                        <td className="px-2 py-4 align-middle sm:px-4 md:px-8">{date}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ActivityTable;
