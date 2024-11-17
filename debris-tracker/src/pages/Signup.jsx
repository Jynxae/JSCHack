import React, { useState } from "react";

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

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const tempErrors = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      tempErrors.firstName = "First name is required";
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      tempErrors.lastName = "Last name is required";
    }

    // Email validation
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }

    // Password validation
    if (!formData.password) {
      tempErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters";
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      tempErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
    }

    // Terms acceptance validation
    if (!formData.termsAccepted) {
      tempErrors.termsAccepted = "You must accept the terms and conditions";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
        // Reset form after successful submission
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          termsAccepted: false,
        });
      } catch (error) {
        console.error("Signup error:", error);
        setErrors((prev) => ({
          ...prev,
          submit: "Failed to create account. Please try again.",
        }));
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen w-screen relative py-8"
      style={{
        background:
          "linear-gradient(to bottom right, #070F2B, #1B1A55, #535C91, #9290C3)",
      }}
    >
      <StarField />

      <div className="bg-white p-10 rounded-lg shadow-2xl max-w-md w-full z-10 mx-4 mt-16">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          Join Our Community
        </h2>
        <p className="text-sm text-gray-600 text-center mb-8">
          Create an account to start tracking space debris
        </p>

        {errors.submit && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-gray-700 font-medium mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                className={`w-full px-4 py-3 border rounded-lg text-gray-700 focus:ring-2 focus:outline-none focus:border-indigo-500 ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-gray-700 font-medium mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                className={`w-full px-4 py-3 border rounded-lg text-gray-700 focus:ring-2 focus:outline-none focus:border-indigo-500 ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>

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
              placeholder="Create a password"
              className={`w-full px-4 py-3 border rounded-lg text-gray-700 focus:ring-2 focus:outline-none focus:border-indigo-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-medium mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className={`w-full px-4 py-3 border rounded-lg text-gray-700 focus:ring-2 focus:outline-none focus:border-indigo-500 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div className="flex items-start mb-6">
            <input
              type="checkbox"
              id="termsAccepted"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="h-5 w-5 text-indigo-600 focus:ring-2 focus:ring-indigo-500 rounded border-gray-300"
            />
            <label
              htmlFor="termsAccepted"
              className="ml-2 text-gray-700 font-medium"
            >
              I accept the{" "}
              <a
                href="/terms"
                className="text-indigo-600 font-semibold hover:underline"
              >
                terms and conditions
              </a>
            </label>
          </div>
          {errors.termsAccepted && (
            <p className="text-sm text-red-500">{errors.termsAccepted}</p>
          )}

          <button
            type="submit"
            className="bg-indigo-600 text-white font-bold py-3 px-6 w-full rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
