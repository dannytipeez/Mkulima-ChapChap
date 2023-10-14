'use client';

import React from "react";

const ReportsTable = ({ title, columns, data, totalLabel, totalAmount }) => {
    return (
        <div className="overflow-x-auto rounded-sm shadow-md">
            <h4 className="uppercase">{title}</h4>
            <table className="w-full border-collapse border-gray-300">
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                className={`w-1/4 py-4 bg-gray-200 sm:w-1/6 md:w-1/4 lg:w-2/6 ${index === 0 ? "w-1/12" : ""
                                    }`}
                            >
                                {column}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className="transition duration-150 hover:bg-green-200"
                        >
                            {row.map((cell, cellIndex) => (
                                <td
                                    key={cellIndex}
                                    className={`px-2 py-4 sm:px-4 md:px-8 ${cellIndex === 0 ? "w-1/12" : ""
                                        }`}
                                >
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={columns.length - 1} className="font-semibold text-right">
                            {totalLabel}
                        </td>
                        <td className="font-semibold">{totalAmount}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default ReportsTable;
