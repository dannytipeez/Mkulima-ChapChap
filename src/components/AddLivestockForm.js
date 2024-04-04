import React, { useState } from "react";
import api from "../utils/api";

const AddLivestockForm = () => {
  // State to track form input values
  const [livestockData, setLivestockData] = useState({
    animal_type: "",
    number: "",
    image: null,
    frequency: "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLivestockData({
      ...livestockData,
      [name]: value,
    });
  };

  // Handle image file change
  const handleImageChange = (e) => {
    setLivestockData({
      ...livestockData,
      image: e.target.files[0],
    });
  };

  // Handle form submission
  const handleLivestockSubmit = async (e) => {
    e.preventDefault();

    // Create form data object to send as a multi-part request
    const formData = new FormData();
    formData.append("animal_type", livestockData.animal_type);
    formData.append("number", livestockData.number);
    formData.append("image", livestockData.image);
    formData.append("frequency", livestockData.frequency);

    try {
      // Make a POST request to add new livestock
      const response = await api.post("farm/livestock/", formData);

      if (response.status === 201) {
        // Livestock added successfully, you can handle success as needed
        console.log("Livestock added successfully:", response.data);
        // Optionally, reset the form fields
        setLivestockData({
          animal_type: "",
          number: "",
          image: null,
          frequency: "",
        });
      } else {
        // Handle other response statuses if needed
        console.error("Failed to add new livestock");
      }
    } catch (error) {
      // Handle network errors or request failure
      console.error("Error adding new livestock:", error);
    }
  };

  return (
    <div className="w-full p-4">
      <h1 className="font-medium uppercase mb-4">Add New Livestock</h1>
      {/* Form for adding new livestock */}
      <form onSubmit={handleLivestockSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Animal Type
          </label>
          <input
            type="text"
            name="animal_type"
            value={livestockData.animal_type}
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
            value={livestockData.number}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Image
          </label>
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Frequency
          </label>
          <input
            type="text"
            name="frequency"
            value={livestockData.frequency}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-700"
        >
          Add Livestock
        </button>
      </form>
    </div>
  );
};

export default AddLivestockForm;
