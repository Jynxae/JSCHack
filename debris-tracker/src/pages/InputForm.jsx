import React, { useState } from "react";
import axios from "axios";
import axios from "axios";
import stars from "../assets/stars.jpg";

function InputForm() {
  const [formData, setFormData] = useState({
    ObservationDateTime: "",
    RightAscensionHours: "",
    RightAscensionMinutes: "",
    RightAscensionSeconds: "",
    DeclinationDegrees: "",
    DeclinationMinutes: "",
    DeclinationSeconds: "",
    DeclinationDirection: "",
    AngleAboveHorizon: "",
    Azimuth: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]:
        name !== "ObservationDateTime" &&
        name !== "DeclinationDirection" &&
        value !== ""
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const formattedData = {
        ...formData,
        ObservationDateTime: formData.ObservationDateTime
          ? new Date(formData.ObservationDateTime)
              .toISOString()
              .slice(0, 19)
              .replace("T", " ")
          : null,
      };

      await axios.post(
        "http://localhost:5171/api/observations/insert",
        formattedData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setSuccess(true);
      setFormData({
        ObservationDateTime: "",
        RightAscensionHours: "",
        RightAscensionMinutes: "",
        RightAscensionSeconds: "",
        DeclinationDegrees: "",
        DeclinationMinutes: "",
        DeclinationSeconds: "",
        DeclinationDirection: "",
        AngleAboveHorizon: "",
        Azimuth: "",
      });
    } catch (err) {
      setError(err.response?.data?.error || "Error submitting form");
    }
  };

  const inputClassName =
    "w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900";

  const StarField = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(200)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full animate-twinkle"
          style={{
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            top: `${Math.random() * 300}vh`,
            left: `${Math.random() * 100}vw`,
            animationDelay: `${Math.random() * 3}s`,
            opacity: `${Math.random() * 0.7 + 0.3}`,
          }}
        ></div>
      ))}
    </div>
  );

  return (
    <div
      className="min-h-screen w-screen text-white relative overflow-hidden flex items-center justify-center p-6"
      style={{
        background: "linear-gradient(to bottom, #070F2B, #1B1A55, #535C91)",
      }}
    >
      <StarField />

      <div className="max-w-4xl w-full bg-gradient-to-r from-white via-gray-50 to-white bg-opacity-90 shadow-xl rounded-lg p-8 relative z-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
          Observation Form
        </h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            Form submitted successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium text-gray-900 mb-2">
              Observation Date and Time: <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              name="ObservationDateTime"
              value={formData.ObservationDateTime}
              onChange={handleChange}
              required
              className={inputClassName}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block font-medium text-gray-900 mb-2">
                Right Ascension Hours:
              </label>
              <input
                type="number"
                step="any"
                name="RightAscensionHours"
                value={formData.RightAscensionHours}
                onChange={handleChange}
                className={inputClassName}
                placeholder="Hours"
                min="0"
                max="24"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-900 mb-2">
                Right Ascension Minutes:
              </label>
              <input
                type="number"
                step="any"
                name="RightAscensionMinutes"
                value={formData.RightAscensionMinutes}
                onChange={handleChange}
                className={inputClassName}
                placeholder="Minutes"
                min="0"
                max="60"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-900 mb-2">
                Right Ascension Seconds:
              </label>
              <input
                type="number"
                step="any"
                name="RightAscensionSeconds"
                value={formData.RightAscensionSeconds}
                onChange={handleChange}
                className={inputClassName}
                placeholder="Seconds"
                min="0"
                max="60"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block font-medium text-gray-900 mb-2">
                Declination Degrees:
              </label>
              <input
                type="number"
                step="any"
                name="DeclinationDegrees"
                value={formData.DeclinationDegrees}
                onChange={handleChange}
                className={inputClassName}
                placeholder="Degrees"
                min="-90"
                max="90"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-900 mb-2">
                Declination Minutes:
              </label>
              <input
                type="number"
                step="any"
                name="DeclinationMinutes"
                value={formData.DeclinationMinutes}
                onChange={handleChange}
                className={inputClassName}
                placeholder="Minutes"
                min="0"
                max="60"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-900 mb-2">
                Declination Seconds:
              </label>
              <input
                type="number"
                step="any"
                name="DeclinationSeconds"
                value={formData.DeclinationSeconds}
                onChange={handleChange}
                className={inputClassName}
                placeholder="Seconds"
                min="0"
                max="60"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-900 mb-2">
                Declination Direction:
              </label>
              <select
                name="DeclinationDirection"
                value={formData.DeclinationDirection}
                onChange={handleChange}
                className={inputClassName}
              >
                <option value="">Select direction</option>
                <option value="N">North</option>
                <option value="S">South</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-gray-900 mb-2">
                Angle Above Horizon:
              </label>
              <input
                type="number"
                step="any"
                name="AngleAboveHorizon"
                value={formData.AngleAboveHorizon}
                onChange={handleChange}
                className={inputClassName}
                placeholder="Enter angle"
                min="0"
                max="90"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-900 mb-2">
                Azimuth:
              </label>
              <input
                type="number"
                step="any"
                name="Azimuth"
                value={formData.Azimuth}
                onChange={handleChange}
                className={inputClassName}
                placeholder="Enter azimuth"
                min="0"
                max="360"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200 font-medium"
          >
            Submit Observation
          </button>
        </form>
      </div>
    </div>
  );
}

export default InputForm;
