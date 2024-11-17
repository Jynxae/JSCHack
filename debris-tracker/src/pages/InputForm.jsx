import React, { useState } from "react";
import axios from "axios";

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
    Azimuth: ""
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('Field changed:', name, 'New value:', value);
    
    // Process numerical values
    let processedValue = value;
    if (name !== 'ObservationDateTime' && name !== 'DeclinationDirection') {
      processedValue = value === '' ? null : Number(value);
    }
    
    setFormData(prevState => {
      const newState = { ...prevState, [name]: processedValue };
      console.log('New form state:', newState);
      return newState;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      // Format date-time to match MySQL datetime format
      const formattedData = {
        ...formData,
        ObservationDateTime: formData.ObservationDateTime 
          ? new Date(formData.ObservationDateTime).toISOString().slice(0, 19).replace('T', ' ')
          : null
      };

      console.log('Submitting formatted data:', formattedData);

      const response = await axios.post(
        "http://localhost:5171/api/observations/insert", 
        formattedData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("Server response:", response.data);
      setSuccess(true);
      
      // Clear form after successful submission
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
        Azimuth: ""
      });
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(err.response?.data?.error || "Error submitting form");
    }
  };

  const inputClassName =
    "w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white";

  return (
    <div className="min-h-screen w-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
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
            <label className="block font-medium text-gray-700 mb-2">
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
              <label className="block font-medium text-gray-700 mb-2">
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
              <label className="block font-medium text-gray-700 mb-2">
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
              <label className="block font-medium text-gray-700 mb-2">
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
              <label className="block font-medium text-gray-700 mb-2">
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
              <label className="block font-medium text-gray-700 mb-2">
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
              <label className="block font-medium text-gray-700 mb-2">
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
              <label className="block font-medium text-gray-700 mb-2">
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
              <label className="block font-medium text-gray-700 mb-2">
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
              <label className="block font-medium text-gray-700 mb-2">
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