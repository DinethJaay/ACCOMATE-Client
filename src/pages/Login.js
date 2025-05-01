import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import img from "../assets/login/img.png";
import backgroundImage from "../assets/backgrounds/background.png";

const apiUrl = process.env.REACT_APP_API_URL;

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "At least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.username, password: formData.password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      toast.success('Login successful!');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = 'user/search-ads'; // Redirect to user dashboard
    } catch (err) {
      toast.error(err.message);
      setErrors(e => ({ ...e, form: err.message }));
    } finally {
      setLoading(false);
    }
  };

  return (
      <div
          className="min-h-screen flex bg-gray-100"
          style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}
      >
        {/* LeftIllustration */}
        <div className="hidden lg:flex w-1/2 bg-gray-50 items-center justify-center">
          <img src={img} alt="Login illustration" className="w-3/4" />
        </div>

        {/* Form Card */}
        <div className="flex flex-col justify-center w-full lg:w-1/2 p-8">
          <div className="w-full sm:w-3/4 md:w-1/2 lg:w-2/5 mx-auto bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Sign in</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                    id="username"
                    name="username"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
                />
                {errors.username && (
                    <p className="mt-1 text-sm text-red-500">{errors.username}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
                  />
                  <button
                      type="button"
                      onClick={() => setShowPassword(v => !v)}
                      className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                {errors.password && (
                    <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-indigo-600 rounded border-gray-300" />
                  <span className="ml-2">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-indigo-600 hover:underline">
                  Forgot password?
                </Link>
              </div>

              {/* Form-level error */}
              {errors.form && (
                  <p className="text-center text-sm text-red-500">{errors.form}</p>
              )}

              {/* Submit */}
              <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 rounded text-white ${
                      loading ? "bg-indigo-300" : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            {/* Sign up link */}
            <p className="mt-4 text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link to="/register" className="text-indigo-600 hover:underline">
                Sign up
              </Link>
            </p>

            {/* Divider */}
            <div className="flex items-center my-6">
              <hr className="flex-grow border-gray-300" />
              <span className="px-3 text-gray-400">OR</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* Social Buttons */}
            <div className="flex justify-center space-x-4">
              <button className="p-2 border rounded-full hover:bg-gray-100">
                <img src="/icons/google.svg" alt="Google" className="h-5 w-5" />
              </button>
              <button className="p-2 border rounded-full hover:bg-gray-100">
                <img src="/icons/facebook.svg" alt="Facebook" className="h-5 w-5" />
              </button>
              <button className="p-2 border rounded-full hover:bg-gray-100">
                <img src="/icons/apple.svg" alt="Apple" className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <ToastContainer position="top-right" newestOnTop />
      </div>
  );
};

export default Login;
