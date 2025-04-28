import React, { useState } from "react";
import Header from "../../components/Heder";
import Footer from "../../components/Footer";


const PostAdForm = () => {
    const [price, setPrice] = useState("80000.00");

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Header />

            <main className="flex-grow mt-16 pt-4 pb-12">
                <div className="container mx-auto">
                    {/* Breadcrumb */}
                    <div className="mb-6 ml-4">
                        <h2 className="text-lg text-gray-700 font-medium">Section 11</h2>
                    </div>

                    {/* Form Container */}
                    <div className="bg-white rounded-lg shadow-md max-w-3xl mx-auto p-6">
                        <div className="mb-8">
                            <h1 className="text-xl font-semibold mb-1">Basic Information</h1>
                            <p className="text-sm text-gray-500">Select boarding category for your ad</p>
                        </div>

                        <form>
                            {/* Boarding */}
                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-medium text-gray-700">Boarding</label>
                                    <div className="flex space-x-4 text-sm">
                                        <span className="text-yellow-500">Single Room, Colombo</span>
                                        <span className="text-yellow-500">Single Room, Rent Room</span>
                                        <button type="button" className="text-blue-500 hover:underline">Change</button>
                                    </div>
                                </div>
                            </div>

                            {/* Title */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                <input
                                    type="text"
                                    placeholder="Enter title (maximum limit 100)"
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>

                            {/* Ad Description */}
                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-medium text-gray-700">Ad Description</label>
                                    <span className="text-xs text-gray-500">0 out of 3000 characters</span>
                                </div>
                                <div className="border border-gray-300 rounded overflow-hidden">
                                    <div className="bg-gray-50 border-b px-3 py-2 flex items-center">
                                        <span className="text-sm">Normal</span>
                                        <span className="text-gray-300 mx-2">|</span>
                                        <span className="text-sm">Landlords to secure advertising screen target and selected ad...</span>
                                        <span className="text-blue-500 ml-auto">...</span>
                                    </div>
                                    <textarea
                                        className="w-full p-3 min-h-[100px] focus:outline-none"
                                        placeholder="Enter your description here"
                                    ></textarea>
                                </div>
                            </div>

                            {/* Type of Ad */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Type of Ad</label>
                                <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                    <option value="">Select an option</option>
                                    <option value="rent">For Rent</option>
                                    <option value="sale">For Sale</option>
                                </select>
                            </div>

                            {/* Pricing Type */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Pricing Type</label>
                                <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                    <option value="">Select an option</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="daily">Daily</option>
                                </select>
                            </div>

                            {/* Currency */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                                <div className="relative">
                  <textarea
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                      placeholder="Rs."
                      rows="1"
                  ></textarea>
                                    <div className="absolute top-2 right-2 text-gray-400">
                                        <span className="text-xs">0/100</span>
                                    </div>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-3 py-1 rounded text-sm"
                                    >
                                        Fixed Price
                                    </button>
                                </div>
                                <div className="bg-gray-100 p-4 mt-2 text-center">
                                    <p className="font-bold text-gray-800">RS. {price}</p>
                                </div>
                            </div>

                            {/* Item Condition */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Item Condition</label>
                                <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                    <option value="">Select an option</option>
                                    <option value="new">New</option>
                                    <option value="used">Used</option>
                                </select>
                            </div>

                            <div className="mb-6 text-xs text-gray-500">
                                <p>Once the box below is all photos: <span className="text-red-500">*</span> Indicates this info may be shared with another by Accomate.</p>
                            </div>

                            <div className="mb-6 text-center text-sm text-gray-500">
                                <p>Drag files here or click to upload.</p>
                                <p>Drop files here or click to select.</p>
                            </div>

                            {/* For Whom */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-4">For Whom</label>
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <input type="checkbox" id="students" className="mr-2" />
                                        <label htmlFor="students">For Students</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="workers" className="mr-2" />
                                        <label htmlFor="workers">For Offices and Workers</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="professionals" className="mr-2" />
                                        <label htmlFor="professionals">For Professional Lady</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="university" className="mr-2" />
                                        <label htmlFor="university">For University Boys</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="girls" className="mr-2" />
                                        <label htmlFor="girls">For Girls and Workers</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="professionals-girls" className="mr-2" />
                                        <label htmlFor="professionals-girls">For Professional Girls</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="couple" className="mr-2" />
                                        <label htmlFor="couple">For a Couple</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="family" className="mr-2" />
                                        <label htmlFor="family">For a Family</label>
                                    </div>
                                </div>
                            </div>

                            {/* No Of Rooms */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">No Of Rooms</label>
                                <input
                                    type="number"
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>

                            {/* No Of Bathrooms */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">No Of Bathrooms</label>
                                <input
                                    type="number"
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>

                            {/* Bathroom Type */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Bathroom Type</label>
                                <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                    <option value="">Select an option</option>
                                    <option value="attached">Attached</option>
                                    <option value="common">Common</option>
                                </select>
                            </div>

                            {/* Level */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <input type="checkbox" id="ground" className="mr-2" />
                                        <label htmlFor="ground">Ground floor</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="upstairs" className="mr-2" />
                                        <label htmlFor="upstairs">Upstairs</label>
                                    </div>
                                </div>
                            </div>

                            {/* Time Period */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <input type="checkbox" id="short" className="mr-2" />
                                        <label htmlFor="short">Short Term period</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="long" className="mr-2" />
                                        <label htmlFor="long">Long Term only</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="both" className="mr-2" />
                                        <label htmlFor="both">Short Term or Long Term accept</label>
                                    </div>
                                </div>
                            </div>

                            {/* Electricity and Water Bill */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Electricity and Water Bill</label>
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <input type="checkbox" id="included" className="mr-2" />
                                        <label htmlFor="included">Included in Rent</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="charged" className="mr-2" />
                                        <label htmlFor="charged">Charged separately</label>
                                        <span className="text-xs text-gray-500 ml-2">(according bill number)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Deposit */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Deposit</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    placeholder="e.g., 1 Month"
                                />
                            </div>

                            {/* Nearest Universities & Schools */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Nearest Universities & Schools</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>

                            {/* Nearest bus route & Distance */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-4">Nearest bus route & Distance</label>
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <input type="checkbox" id="parking-space" className="mr-2" />
                                        <label htmlFor="parking-space">Parking spaces</label>
                                        <span className="text-xs text-gray-500 ml-2">(Bike Only)</span>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="vehicle-park" className="mr-2" />
                                        <label htmlFor="vehicle-park">Vehicle Park</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="available" className="mr-2" />
                                        <label htmlFor="available">Not Available</label>
                                    </div>
                                </div>
                            </div>

                            {/* Amenities */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-4">Amenities</label>
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <input type="checkbox" id="ac" className="mr-2" />
                                        <label htmlFor="ac">Air Condition fitted</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="furniture" className="mr-2" />
                                        <label htmlFor="furniture">Furniture fitted</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="bathroom" className="mr-2" />
                                        <label htmlFor="bathroom">Bathroom fitted</label>
                                    </div>
                                </div>
                            </div>

                            {/* Property Features */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-4">Property Features</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <div className="flex items-center">
                                        <input type="checkbox" id="single-beds" className="mr-2" />
                                        <label htmlFor="single-beds">Single Beds</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="double-beds" className="mr-2" />
                                        <label htmlFor="double-beds">Double Beds</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="bunk-beds" className="mr-2" />
                                        <label htmlFor="bunk-beds">Bunk Beds</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="pantry" className="mr-2" />
                                        <label htmlFor="pantry">Pantry</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="kitchen" className="mr-2" />
                                        <label htmlFor="kitchen">Kitchen</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="living-room" className="mr-2" />
                                        <label htmlFor="living-room">Living Room</label>
                                        <span className="text-xs text-gray-500 ml-2">(TV / TV Room)</span>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="internet" className="mr-2" />
                                        <label htmlFor="internet">Internet</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="canteen" className="mr-2" />
                                        <label htmlFor="canteen">Canteen</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="cctv" className="mr-2" />
                                        <label htmlFor="cctv">CCTV Camera</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="fridge" className="mr-2" />
                                        <label htmlFor="fridge">Fridge</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="security" className="mr-2" />
                                        <label htmlFor="security">Security by Night Watch</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="separate-entrance" className="mr-2" />
                                        <label htmlFor="separate-entrance">Separate entrance</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="semi-furnished" className="mr-2" />
                                        <label htmlFor="semi-furnished">Semi Furnished</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="fully-furnished" className="mr-2" />
                                        <label htmlFor="fully-furnished">Fully Furnished</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="new-house" className="mr-2" />
                                        <label htmlFor="new-house">New Construction (2024)</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="brand-new" className="mr-2" />
                                        <label htmlFor="brand-new">Brand New</label>
                                    </div>
                                </div>
                            </div>

                            {/* User Information */}
                            <div className="mb-8">
                                <h2 className="text-lg font-medium mb-4 bg-gray-100 p-3 rounded">User Information</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Your Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
                                        <input
                                            type="text"
                                            placeholder="Dimple Gamage"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* Mobile Number */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
                                        <input
                                            type="tel"
                                            placeholder="0700000000"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* Country */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                                        <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                            <option value="">Select an option</option>
                                            <option value="sri-lanka">Sri Lanka</option>
                                        </select>
                                    </div>

                                    {/* Address */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                        <input
                                            type="text"
                                            placeholder="Enter Address"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Terms and Conditions */}
                            <div className="mb-6 flex items-center">
                                <input type="checkbox" id="terms" className="mr-2" />
                                <label htmlFor="terms" className="text-sm">I agree to Term & conditions</label>
                            </div>

                            {/* Submit Button */}
                            <div className="text-center">
                                <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-blue-950 font-bold py-2 px-10 rounded">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PostAdForm;