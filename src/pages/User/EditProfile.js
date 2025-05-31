import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Heder';
import { PhoneIcon } from '@heroicons/react/solid';
import userImage from "../../assets/images/user.png";
import axios from 'axios';
import {jwtDecode} from "jwt-decode";

export default function EditProfile() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        nic: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3000/api/auth/dashboard', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });


                const userData = response.data;

                console.log('User Data:', userData);
                setUser({
                    name: userData.name || '',
                    email: userData.email || '',
                    contactNumber: userData.contactNumber || '',
                    address: userData.address || '',
                    nic: userData.nic || '',
                });

            } catch (err) {
                console.error('Failed to fetch user data:', err);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((u) => ({ ...u, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const decodedToken = jwtDecode(token);

            const userId = decodedToken.uid; 

            console.log('User ID:', userId);

            const updatedUser = {
                name: user.name,
                email: user.email,
                phone: user.contactNumber,
                address: user.address,
                nic: user.nic
            };
            // Send the updated data to the backend
            const response = await axios.put(
                `http://localhost:3000/api/auth/updates/${userId}`,
                updatedUser,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('Updated profile:', response.data);
             
        } catch (err) {
            console.error('Failed to update profile:', err);
        }
    };

    const handleCancel = () => {
        navigate(-1); // Go back to previous page without saving
    };

    return (
        <>
            <Header />

            <div className="flex">
                <Sidebar />

                <main className="flex-1 ml-64 bg-gray-100 p-6 min-h-[calc(100vh-4rem)] flex items-center justify-center">
                    <div className="w-full max-w-7xl">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Left: Profile & Contact */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="text-center">
                                    <img
                                        src={userImage}
                                        alt="avatar"
                                        className="mx-auto w-24 h-24 rounded-full mb-4"
                                    />
                                    <h3 className="text-xl font-semibold">
                                        {user.name || 'Your Name'}
                                    </h3>
                                    <p className="text-gray-500">
                                        {user.email || 'email@example.com'}
                                    </p>
                                </div>
                                <div className="mt-8">
                                    <h4 className="text-lg font-medium mb-4">
                                        Contact Information
                                    </h4>
                                    <div className="flex items-center space-x-2">
                                        <PhoneIcon className="w-6 h-6 text-green-500" />
                                        <span className="font-medium">Phone Number</span>
                                    </div>
                                    <p className="mt-1 text-gray-700">
                                        {user.contactNumber || '0762050235'}
                                    </p>
                                </div>
                            </div>

                            {/* Right: Edit Form */}
                            <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
                                <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Full Name */}
                                        <div>
                                            <label
                                                htmlFor="fullName"
                                                className="block text-sm font-medium mb-1"
                                            >
                                                Full Name
                                            </label>
                                            <input
                                                id="fullName"
                                                name="fullName"
                                                type="text"
                                                value={user.name}
                                                onChange={handleChange}
                                                placeholder="Enter your name"
                                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium mb-1"
                                            >
                                                Email
                                            </label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={user.email}
                                                onChange={handleChange}
                                                placeholder="Enter your email"
                                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        </div>

                                        {/* Contact Number */}
                                        <div>
                                            <label
                                                htmlFor="contactNumber"
                                                className="block text-sm font-medium mb-1"
                                            >
                                                Contact Number
                                            </label>
                                            <input
                                                id="contactNumber"
                                                name="contactNumber"
                                                type="text"
                                                value={user.contactNumber}
                                                onChange={handleChange}
                                                placeholder="Enter your contact number"
                                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        </div>


                                        {/* Address */}
                                        <div>
                                            <label
                                                htmlFor="address"
                                                className="block text-sm font-medium mb-1"
                                            >
                                                Address
                                            </label>
                                            <input
                                                id="address"
                                                name="address"
                                                type="text"
                                                value={user.address}
                                                onChange={handleChange}
                                                placeholder="Input text"
                                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        </div>

                                        {/* NIC */}
                                        <div>
                                            <label
                                                htmlFor="NIC"
                                                className="block text-sm font-medium mb-1"
                                            >
                                                NIC
                                            </label>
                                            <input
                                                id="NIC"
                                                name="NIC"
                                                type="text"
                                                value={user.nic}
                                                onChange={handleChange}
                                                placeholder="Input text"
                                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        </div>
                                    </div>


                                    {/* Buttons */}
                                    <div className="flex space-x-4 pt-4">
                                        <button
                                            type="submit"
                                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded"
                                        >
                                            Update Info
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleCancel}
                                            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
