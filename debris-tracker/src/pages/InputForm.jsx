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

  const inputClassName = "w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white";

  return (
    <div className="min-h-screen w-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Debris Identification Form
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Date of Identification (Month/Day/Year):
              </label>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className={inputClassName}
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Time of Identification (Hours:Minutes):
              </label>
              <input
                type="text"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className={inputClassName}
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Location of Identification (City, Country):
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className={inputClassName}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Velocity of Debris (Optional):
              </label>
              <input
                type="text"
                name="velocity"
                value={formData.velocity}
                onChange={handleChange}
                className={inputClassName}
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Direction of Debris (Optional):
              </label>
              <input
                type="text"
                name="direction"
                value={formData.direction}
                onChange={handleChange}
                className={inputClassName}
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Doppler Effect (Optional):
              </label>
              <input
                type="text"
                name="doppler"
                value={formData.doppler}
                onChange={handleChange}
                className={inputClassName}
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Usage of Right Ascension and Declination:
            </label>
            <select
              name="method"
              value={formData.method}
              onChange={handleChange}
              className={inputClassName}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {formData.method === "Yes" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Longitude Coordinates (Degrees/Minutes/Seconds):
                </label>
                <input
                  type="text"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  required
                  className={inputClassName}
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Latitude (Degrees/Minutes/Seconds):
                </label>
                <input
                  type="text"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  required
                  className={inputClassName}
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Angle Above Horizon (0-Horizontal, 90-Directly Overhead):
                </label>
                <input
                  type="text"
                  name="angle"
                  value={formData.angle}
                  onChange={handleChange}
                  required
                  className={inputClassName}
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Azimuth Compass Direction in Degrees (0-N, 90-E, 180-S, 270-W):
                </label>
                <input
                  type="text"
                  name="azimuth"
                  value={formData.azimuth}
                  onChange={handleChange}
                  required
                  className={inputClassName}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Comments:
            </label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              className={`${inputClassName} h-32`}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200 font-medium"
          >
            Submit Form
          </button>
        </form>
      </div>
    </div>
  );
}

export default InputForm;