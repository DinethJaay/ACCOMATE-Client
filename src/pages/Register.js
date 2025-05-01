import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import registerImage from "../assets/register/loginnew.jpg";
import backgroundImage from "../assets/backgrounds/background.png";

const apiUrl = process.env.REACT_APP_API_URL;

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        nic: "",
        role : "user",
        address : "fdffffdf",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        contactNumber: "",
        password: "",
        nic: "",
        confirmPassword: "",
    });

    const validateForm = () => {
        const formErrors = {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
        };
        let isValid = true;

        if (!formData.firstName) {
            formErrors.firstName = "First name is required";
            isValid = false;
        }
        if (!formData.lastName) {
            formErrors.lastName = "Last name is required";
            isValid = false;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!formData.email) {
            formErrors.email = "Email is required";
            isValid = false;
        } else if (!emailRegex.test(formData.email)) {
            formErrors.email = "Enter a valid email address";
            isValid = false;
        }

        if (!formData.phone) {
            formErrors.phone = "Contact Number is required";
            isValid = false;
        }
        if (!formData.nic) {
            formErrors.nic = "NIC number is required";
            isValid = false;
        }

        if (!formData.password) {
            formErrors.password = "Password is required";
            isValid = false;
        } else if (formData.password.length < 8) {
            formErrors.password = "Password must be at least 8 characters";
            isValid = false;
        }

        if (formData.confirmPassword !== formData.password) {
            formErrors.confirmPassword = "Passwords do not match";
            isValid = false;
        }

        setErrors(formErrors);
        return isValid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
    
        setLoading(true);
    
        // Concatenate firstName and lastName to create the full name
        const fullName = `${formData.firstName} ${formData.lastName}`;
    
        // Create a new form data object with concatenated name
        const updatedFormData = { ...formData, name: fullName };
    
        try {
            const response = await fetch(`http://localhost:3000/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedFormData), // Send updated formData with the name field
            });
            const result = await response.json();
    
            if (response.ok) {
                toast.success("User registered successfully & Verification email sent!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                });
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    password: "",
                    confirmPassword: "",
                });
            } else {
                toast.error(result.message || "Something went wrong", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                });
            }
        } catch {
            toast.error("Failed to register user.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
            });
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div
            className="min-h-screen flex bg-gray-100"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
            }}
        >
            {/* Left illustration */}
            <div className="hidden lg:flex w-1/2 bg-gray-50 items-center justify-center">
                <img src={registerImage} alt="Register" className="w-3/4" />
            </div>

            {/* Form card */}
            <div className="flex flex-col justify-center w-full lg:w-1/2 p-8">
                <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-3xl font-bold mb-6 text-center">Sign up</h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* First & Last Name */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                                    First name
                                </label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    placeholder="Input first name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
                                />
                                {errors.firstName && (
                                    <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                                    Last name
                                </label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    placeholder="Input last name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
                                />
                                {errors.lastName && (
                                    <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                                )}
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="example.email@gmail.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                            )}
                        </div>

                        {/* Contact Number */}
                        <div>
                            <label htmlFor="contactNumber" className="block text-sm font-medium mb-1">
                                Contact Number
                            </label>
                            <input
                                id="phone"
                                name="phone"
                                type="text"
                                placeholder="e.g. +94 77 123 4567"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
                            />
                            {errors.phone && (
                                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                            )}
                        </div>
                        <div>
    <label htmlFor="nic" className="block text-sm font-medium mb-1">
        NIC Number
    </label>
    <input
        id="nic"
        name="nic"
        type="text"
        placeholder="Enter your NIC number"
        value={formData.nic}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
    />
    {errors.nic && (
        <p className="mt-1 text-sm text-red-500">{errors.nic}</p>
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
                                    placeholder="Enter at least 8+ characters"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                                >
                                    {showPassword ? "🙈" : "👁️"}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter at least 8+ characters"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                                >
                                    {showPassword ? "🙈" : "👁️"}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                            )}
                        </div>

                        {/* Terms */}
                        <div className="flex items-center text-sm">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 rounded border-gray-300"
                                />
                                <span className="ml-2 text-gray-700">
                  By signing up, I agree with the{" "}
                                    <Link to="/terms" className="text-indigo-600 hover:underline">
                    Terms of Use
                  </Link>{" "}
                                    &{" "}
                                    <Link to="/privacy" className="text-indigo-600 hover:underline">
                    Privacy Policy
                  </Link>
                </span>
                            </label>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 rounded text-white ${
                                loading ? "bg-indigo-300" : "bg-indigo-600 hover:bg-indigo-700"
                            }`}
                        >
                            {loading ? "Signing up..." : "Sign up"}
                        </button>
                    </form>

                    {/* Already have an account */}
                    <p className="mt-4 text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-indigo-600 hover:underline">
                            Log in
                        </Link>
                    </p>

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <hr className="flex-grow border-gray-300" />
                        <span className="px-3 text-gray-400">OR</span>
                        <hr className="flex-grow border-gray-300" />
                    </div>

                    {/* Social buttons */}
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

export default Register;
