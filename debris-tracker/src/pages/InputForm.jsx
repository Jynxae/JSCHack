import React, { useState } from "react";

function InputForm() {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    location: "",
    velocity: "",
    direction: "",
    doppler: "",
    method: "Yes",
    longitude: "",
    latitude: "",
    angle: "",
    azimuth: "",
    comments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Form submitted! Check the console for details.");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Debris Identification Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="date" className="block font-medium mb-1">
            Date of Identification (Month/Day/Year):
          </label>
          <input
            type="text"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="time" className="block font-medium mb-1">
            Time of Identificationn (Hours:Minutes):
          </label>
          <input
            type="text"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="location" className="block font-medium mb-1">
            Location of Identificationn (City, Country):
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="velocity" className="block font-medium mb-1">
            Velocity of Debris (Optional):
          </label>
          <input
            type="text"
            id="velocity"
            name="velocity"
            value={formData.velocity}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="direction" className="block font-medium mb-1">
            Direction of Debris (Optional):
          </label>
          <input
            type="text"
            id="direction"
            name="direction"
            value={formData.direction}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="doppler" className="block font-medium mb-1">
            Doppler Effect (Optional):
          </label>
          <input
            type="text"
            id="doppler"
            name="doppler"
            value={formData.doppler}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="method" className="block font-medium mb-1">
            Usage of Right Ascension and Declination:
          </label>
          <select
            id="method"
            name="method"
            value={formData.method}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        {formData.method === "Yes" && (
        <div>
          <label htmlFor="longitude" className="block font-medium mb-1">
            Longitude Coordinates (Degrees/Minutes/Seconds):
          </label>
          <input
            type="text"
            id="longitude"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        )}
        {formData.method === "Yes" && (
        <div>
          <label htmlFor="latitude" className="block font-medium mb-1">
            Latitude (Degrees/Minutes/Seconds):
          </label>
          <input
            type="text"
            id="latitude"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        )}
        {formData.method === "No" && (
        <div>
          <label htmlFor="angle" className="block font-medium mb-1">
            Angle Above Horizon (0-Horizontal, 90-Directly Overhead):
          </label>
          <input
            type="text"
            id="angle"
            name="angle"
            value={formData.angle}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        )}
        {formData.method === "No" && (
        <div>
          <label htmlFor="azimuth" className="block font-medium mb-1">
            Azimuth Compass Direction in Degrees (0-N, 90-E, 180S, 270W):
          </label>
          <input
            type="text"
            id="azimuth"
            name="azimuth"
            value={formData.azimuth}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        )}
        <div>
          <label htmlFor="comments" className="block font-medium mb-1">
            Comments:
          </label>
          <textarea
            id="comments"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default InputForm;
