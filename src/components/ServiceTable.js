"use client";4
// components/NumberedListTable.js

const NumberedListTable = ({ service, provider, date }) => {
    return (
        <div className="overflow-x-auto rounded-sm shadow-md">
            <table className="w-full border-collapse border-gray-300">
                <thead>
                    <tr>
                        <th className="w-1/12 py-4 bg-gray-200 sm:w-1/6 md:w-1/4 lg:w-1/6"> #</th>
                        <th className="w-2/12 py-4 bg-gray-200 sm:w-2/6 md:w-1/4 lg:w-2/6">Service</th>
                        <th className="w-2/12 py-4 bg-gray-200 sm:w-2/6 md:w-1/4 lg:w-2/6">Provider</th>
                        <th className="w-2/12 py-4 bg-gray-200 sm:w-2/6 md:w-1/4 lg:w-2/6">Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="px-2 py-4 sm:px-4 md:px-8">1</td>
                        <td className="px-2 py-4 sm:px-4 md:px-8">{service}</td>
                        <td className="px-2 py-4 sm:px-4 md:px-8">{provider}</td>
                        <td className="px-2 py-4 sm:px-4 md:px-8">{date}</td>
                    </tr>
                    <tr>
                        <td className="px-2 py-4 sm:px-4 md:px-8">2</td>
                        <td className="px-2 py-4 sm:px-4 md:px-8">{service}</td>
                        <td className="px-2 py-4 sm:px-4 md:px-8">{provider}</td>
                        <td className="px-2 py-4 sm:px-4 md:px-8">{date}</td>
                    </tr>
                    <tr>
                        <td className="px-2 py-4 sm:px-4 md:px-8">3</td>
                        <td className="px-2 py-4 sm:px-4 md:px-8">{service}</td>
                        <td className="px-2 py-4 sm:px-4 md:px-8">{provider}</td>
                        <td className="px-2 py-4 sm:px-4 md:px-8">{date}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default NumberedListTable;
