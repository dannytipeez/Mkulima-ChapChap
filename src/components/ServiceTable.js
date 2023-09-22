"use client";


// components/NumberedListTable.js

const NumberedListTable = ({ service, provider, date }) => {
    return (
        <div className="w-full max-w-md mx-auto">
            <table className="w-full border border-collapse border-gray-300">
                <thead>
                    <tr>
                        <th className="p-3 bg-gray-200">#</th>
                        <th className="p-3 bg-gray-200">Service</th>
                        <th className="p-3 bg-gray-200">Provider</th>
                        <th className="p-3 bg-gray-200">Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-3"> 1</td>
                        <td className="p-3">{service}</td>
                        <td className="p-3">{provider}</td>
                        <td className="p-3">{date}</td>
                    </tr>
                    <tr>
                        <td className="p-3">2</td>
                        <td className="p-3">{service}</td>
                        <td className="p-3">{provider}</td>
                        <td className="p-3">{date}</td>
                    </tr>
                    <tr>
                        <td className="p-3">3</td>
                        <td className="p-3">{service}</td>
                        <td className="p-3">{provider}</td>
                        <td className="p-3">{date}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default NumberedListTable;
