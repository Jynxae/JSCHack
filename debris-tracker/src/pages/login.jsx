import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Star = ({ style }) => (
  <div
    className="absolute rounded-full bg-white animate-twinkle"
    style={{
      width: Math.random() * 2 + 1 + "px",
      height: Math.random() * 2 + 1 + "px",
      ...style,
    }}
  />
);

const StarField = () => {
  const stars = Array(200)
    .fill(null)
    .map((_, i) => ({
      top: `${Math.random() * 100}vh`,
      left: `${Math.random() * 100}vw`,
      animationDelay: `${Math.random() * 3}s`,
      opacity: Math.random() * 0.7 + 0.3,
    }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {stars.map((style, i) => (
        <Star key={i} style={style} />
      ))}
    </div>
  );
};

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      tempErrors.password = "Password is required";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      try {
        // Here you would normally make an API call to your backend
        console.log("Form submitted:", formData);

        // Simulate successful login
        // Reset form after successful submission
        setFormData({
          email: "",
          password: "",
        });

        // Redirect to home page after successful login
        navigate("/");
      } catch (error) {
        console.error("Login error:", error);
        setErrors((prev) => ({
          ...prev,
          submit: "Failed to login. Please try again.",
        }));
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div
      className="flex items-center justify-center h-screen w-screen relative"
      style={{
        background:
          "linear-gradient(to bottom right, #070F2B, #1B1A55, #535C91, #9290C3)",
      }}
    >
      <StarField />

      <div className="bg-white p-10 rounded-lg shadow-2xl max-w-md w-full z-10">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-600 text-center mb-8">
          Log in to continue tracking space debris
        </p>

        {errors.submit && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`w-full px-4 py-3 border rounded-lg text-gray-700 focus:ring-2 focus:outline-none focus:border-indigo-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={`w-full px-4 py-3 border rounded-lg text-gray-700 focus:ring-2 focus:outline-none focus:border-indigo-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-indigo-600 text-white font-bold py-3 px-6 w-full rounded-lg shadow-md transition duration-300 
              ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-indigo-700"
              }`}
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 mt-3">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
