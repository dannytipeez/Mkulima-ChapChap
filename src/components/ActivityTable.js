"use client";


// components/NumberedListTable.js

const ActivityTable = ({ activity, date }) => {
    return (
        <div className="w-full max-w-md mx-auto overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="p-3 text-gray-800 bg-gray-200">#</th>
                        <th className="p-3 text-gray-800 bg-gray-200">Activity</th>
                        <th className="p-3 text-gray-800 bg-gray-200">Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-3">1</td>
                        <td className="p-3">{activity}</td>
                        <td className="p-3">{date}</td>
                    </tr>
                    <tr>
                        <td className="p-3">2</td>
                        <td className="p-3">{activity}</td>
                        <td className="p-3">{date}</td>
                    </tr>
                    <tr>
                        <td className="p-3">3</td>
                        <td className="p-3">{activity}</td>
                        <td className="p-3">{date}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ActivityTable;