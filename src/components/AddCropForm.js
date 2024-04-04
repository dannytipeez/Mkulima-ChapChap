import React, { useState } from "react";
import api from "../utils/api";

const AddCropForm = () => {
  // State to track form input values
  const [cropData, setCropData] = useState({
    crop_type: "",
    number: "",
    frequency: "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCropData({
      ...cropData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleCropSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to add new crop
      const response = await api.post("farm/crop/", cropData);

      if (response.status === 201) {
        // Crop added successfully, you can handle success as needed
        console.log("Crop added successfully:", response.data);
        // Optionally, reset the form fields
        setCropData({
          crop_type: "",
          number: "",
          frequency: "",
        });
      } else {
        // Handle other response statuses if needed
        console.error("Failed to add new crop");
      }
    } catch (error) {
      // Handle network errors or request failure
      console.error("Error adding new crop:", error);
    }
  };

  return (
    <div className="w-full p-4">
      <h1 className="font-medium uppercase mb-4">Add New Crop</h1>
      {/* Form for adding new crops */}
      <form onSubmit={handleCropSubmit}>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Crop Type
          </label>
          <input
            type="text"
            name="crop_type"
            value={cropData.crop_type}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Number
          </label>
          <input
            type="text"
            name="number"
            value={cropData.number}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Frequency
          </label>
          <input
            type="text"
            name="frequency"
            value={cropData.frequency}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
        >
          Add Crop
        </button>
      </form>
    </div>
  );
};

export default AddCropForm;
