import React, { useState, useEffect } from "react";
import api from "../utils/api";

const AddProduceForm = () => {
  const [produceData, setProduceData] = useState({
    name: "",
    quantity: "",
    date: "",
    unit_price: "",
    image: null,
    content_type: "", // Added content_type field
    object_id: "",   // Added object_id field
  });

  const [livestocks, setLivestocks] = useState([]);
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    // Fetch Livestocks
    const fetchLivestocks = async () => {
      try {
        const response = await api.get("farm/livestock/");
        if (response.status === 200) {
          setLivestocks(response.data);
        } else {
          console.error("Failed to fetch livestock");
        }
      } catch (error) {
        console.error("Error fetching livestock:", error);
      }
    };

    // Fetch Crops
    const fetchCrops = async () => {
      try {
        const response = await api.get("farm/crop/");
        if (response.status === 200) {
          setCrops(response.data);
        } else {
          console.error("Failed to fetch crops");
        }
      } catch (error) {
        console.error("Error fetching crops:", error);
      }
    };

    // Call the fetch functions
    fetchLivestocks();
    fetchCrops();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduceData({
      ...produceData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setProduceData({
      ...produceData,
      image: e.target.files[0],
    });
  };

  console.log(produceData);

  const handleProduceSubmit = async (e) => {
    e.preventDefault();
    console.log(produceData);

    const formData = new FormData();
    formData.append("name", produceData.name);
    formData.append("quantity", produceData.quantity);
    formData.append("date", produceData.date);
    formData.append("unit_price", produceData.unit_price);
    formData.append("image", produceData.image);
    formData.append("content_type", produceData.content_type);
    formData.append("object_id", produceData.object_id);

    console.log("FormData:", formData); // Log FormData for inspection

    try {
      const response = await api.post("farm/produce/", formData);

      if (response.status === 201) {
        console.log("Produce added successfully:", response.data);
        setProduceData({
          name: "",
          quantity: "",
          date: "",
          unit_price: "",
          image: null,
          content_type: "",
          object_id: "",
        });
      } else {
        console.error("Failed to add new produce");
      }
    } catch (error) {
      console.error("Error adding new produce:", error);
    }
  };

  console.log(produceData);

  return (
    <div className="w-full p-4">
      <h1 className="font-medium uppercase mb-4">Add New Produce</h1>
      {/* Form for adding new produce */}
 <form onSubmit={handleProduceSubmit} encType="multipart/form-data">
   <div className="mb-4">
    <label className="block mb-2 text-sm font-bold text-gray-700">
      Name
    </label>
    <input
      type="text"
      name="name"
      value={produceData.name}
      onChange={handleInputChange}
      className="w-full p-2 border rounded"
      required
    />
  </div>
  <div className="mb-4">
    <label className="block mb-2 text-sm font-bold text-gray-700">
      Quantity
    </label>
    <input
      type="text"
      name="quantity"
      value={produceData.quantity}
      onChange={handleInputChange}
      className="w-full p-2 border rounded"
      required
    />
  </div>

  <div className="mb-4">
    <label className="block mb-2 text-sm font-bold text-gray-700">
      Date
    </label>
    <input
      type="date"
      name="date"
      value={produceData.date}
      onChange={handleInputChange}
      className="w-full p-2 border rounded"
      required
    />
  </div>

  <div className="mb-4">
    <label className="block mb-2 text-sm font-bold text-gray-700">
      Unit Price
    </label>
    <input
      type="text"
      name="unit_price"
      value={produceData.unit_price}
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

  {/* Producer Type Dropdown */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Producer Type
          </label>
          <select
            name="content_type"
            value={produceData.content_type}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Producer Type</option>
            <option value="livestock">Livestock</option>
            <option value="crop">Crop</option>
          </select>
        </div>

        {/* Producer Dropdown (Based on Producer Type) */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Producer
          </label>
          <select
            name="object_id"
            value={produceData.object_id}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Producer</option>
            {produceData.content_type === "livestock" &&
              livestocks.map((livestock) => (
                <option key={livestock.id} value={livestock.id}>
                  {livestock.animal_type}
                </option>
              ))}
            {produceData.content_type === "crop" &&
              crops.map((crop) => (
                <option key={crop.id} value={crop.id}>
                  {crop.crop_type}
                </option>
              ))}
          </select>
        </div>

        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Add Produce
        </button>
      </form>
    </div>
  );
};

export default AddProduceForm;
