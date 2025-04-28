import React, { useState } from "react";
import Header from "../../components/Heder";
;


const AccommodationSearch = () => {
    const [formData, setFormData] = useState({
        sqft_living: "",
        sqft_lot: "",
        waterfront: "",
        view: "",
        condition: "",
        sqft_above: "",
        sqft_basement: "",
        yr_built: "",
        yr_renovated: "",
        country: "Sri Lanka",
        price: "",
        bathrooms: ""
    });

    const [predictedResults, setPredictedResults] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData({
            ...formData,
            [name]: checked ? 1 : 0
        });
    };

    const handlePredict = (e) => {
        e.preventDefault();
        // In a real app, this would call an API to get predictions
        // For this example, we'll use mock data
        const mockResults = [
            {
                id: 1,
                title: "Sharing Rooms Annex for Rent in Galle for Girls",
                location: "Maradana Road, Galle 06",
                price: "Rs 12,500 / Month",
                date: "February 19, 2024",
                image: "/api/placeholder/300/200",
                negotiable: true
            },
            {
                id: 2,
                title: "Single Room for Rent in Galle for anyone",
                location: "Galle Harbour Boulevard, Galle 3",
                price: "Rs 20,000 / Month",
                date: "February 18, 2024",
                image: "/api/placeholder/300/200",
                negotiable: true
            },
            {
                id: 3,
                title: "Annex For Rent in Galle For Anyone",
                location: "Matugama Rd, Galle, Pinwaththa",
                price: "Rs 25,000 / Negotiable",
                date: "February 18, 2024",
                image: "/api/placeholder/300/200",
                negotiable: true
            },
            {
                id: 4,
                title: "Annex for Rent in Galle For a Couple or Girls",
                location: "Marine road, Katugoda, Galle",
                price: "Rs 15,500 / Negotiable",
                date: "February 18, 2024",
                image: "/api/placeholder/300/200",
                negotiable: true
            }
        ];

        setPredictedResults([...mockResults, ...mockResults]); // Duplicate to show more results
        setShowResults(true);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Header />
            {/* Back Navigation Bar */}
            <div className="flex justify-center mt-16 mb-2">
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center text-black hover:text-gray-700"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back
                </button>
            </div>

            <main className="flex-grow mt-16 pt-4 pb-10">
                <div className="container mx-auto">
                    {/* Title */}
                    <div className="mb-4 ml-2">
                        <h2 className="text-lg text-gray-700 font-medium">Section 11</h2>
                    </div>

                    {/* Search Form */}
                    <div className="bg-white rounded-lg shadow-md max-w-3xl mx-auto p-6 mb-8">
                        <form onSubmit={handlePredict}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Accommodation Type */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Accommodation Type *
                                    </label>
                                    <select
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        defaultValue=""
                                    >
                                        <option value="" disabled>Select an option</option>
                                        <option value="annex">Annex</option>
                                        <option value="room">Room</option>
                                        <option value="house">House</option>
                                        <option value="apartment">Apartment</option>
                                    </select>
                                </div>

                                {/* Type of Ad */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Type of Ad *
                                    </label>
                                    <select
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        defaultValue=""
                                    >
                                        <option value="" disabled>Select an option</option>
                                        <option value="rent">For Rent</option>
                                        <option value="sale">For Sale</option>
                                    </select>
                                </div>

                                {/* Price Type */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Price Type
                                    </label>
                                    <select
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        defaultValue=""
                                    >
                                        <option value="" disabled>Select an option</option>
                                        <option value="monthly">Monthly</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="daily">Daily</option>
                                    </select>
                                </div>

                                {/* Currency */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Currency
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Rs"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                        <span className="absolute right-2 top-2 text-gray-400 text-xs">0/100</span>
                                    </div>
                                </div>

                                {/* Price */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Price
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Item Condition */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Item Condition
                                    </label>
                                    <select
                                        name="condition"
                                        value={formData.condition}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    >
                                        <option value="" disabled>Select an option</option>
                                        <option value="1">1 - Poor</option>
                                        <option value="2">2 - Fair</option>
                                        <option value="3">3 - Average</option>
                                        <option value="4">4 - Good</option>
                                        <option value="5">5 - Excellent</option>
                                    </select>
                                </div>
                            </div>

                            {/* Accessibility Features */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Accessibility features
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <div className="flex items-center">
                                        <input type="checkbox" id="ground-floor" className="mr-2" />
                                        <label htmlFor="ground-floor">Ground Floor</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="elevator" className="mr-2" />
                                        <label htmlFor="elevator">Elevator/ Chair</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="wide-door" className="mr-2" />
                                        <label htmlFor="wide-door">Wide Door</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="no-steps" className="mr-2" />
                                        <label htmlFor="no-steps">No Steps</label>
                                    </div>
                                </div>
                            </div>

                            {/* For Whom */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    For Whom
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <div className="flex items-center">
                                        <input type="checkbox" id="university-boys" className="mr-2" />
                                        <label htmlFor="university-boys">For University Boys</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="university-workers" className="mr-2" />
                                        <label htmlFor="university-workers">For Girls and Workers</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="professional-lady" className="mr-2" />
                                        <label htmlFor="professional-lady">For Professional Lady</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="professional-gent" className="mr-2" />
                                        <label htmlFor="professional-gent">For Professional Gent</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="for-couple" className="mr-2" />
                                        <label htmlFor="for-couple">For a Couple</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="for-family" className="mr-2" />
                                        <label htmlFor="for-family">For a Family</label>
                                    </div>
                                </div>
                            </div>

                            {/* No Of Rooms */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    No Of Rooms
                                </label>
                                <input
                                    type="number"
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>

                            {/* No Of Bathrooms */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    No Of Bathrooms
                                </label>
                                <input
                                    type="number"
                                    name="bathrooms"
                                    value={formData.bathrooms}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>

                            {/* Bathroom Type */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Bathroom Type
                                </label>
                                <select
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    defaultValue=""
                                >
                                    <option value="" disabled>Select an option</option>
                                    <option value="attached">Attached</option>
                                    <option value="common">Common</option>
                                </select>
                            </div>

                            {/* Floor */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Floor
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Time Period
                                </label>
                                <div className="grid grid-cols-1 gap-2">
                                    <div className="flex items-center">
                                        <input type="checkbox" id="short-term" className="mr-2" />
                                        <label htmlFor="short-term">Short Term period</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="long-term" className="mr-2" />
                                        <label htmlFor="long-term">Long Term only</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="short-long" className="mr-2" />
                                        <label htmlFor="short-long">Short Term or Long Term accept</label>
                                    </div>
                                </div>
                            </div>

                            {/* Electricity and Water Bill */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Electricity and Water Bill
                                </label>
                                <div className="grid grid-cols-1 gap-2">
                                    <div className="flex items-center">
                                        <input type="checkbox" id="included" className="mr-2" />
                                        <label htmlFor="included">Included in Rent</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="charged" className="mr-2" />
                                        <label htmlFor="charged">Charged separately (according bill number)</label>
                                    </div>
                                </div>
                            </div>

                            {/* Deposit */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Deposit
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter info"
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>

                            {/* Main Fields Section */}
                            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                                <h3 className="text-lg font-semibold mb-4 text-blue-800">Advanced Search Criteria</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Living Area (sqft)
                                        </label>
                                        <input
                                            type="number"
                                            name="sqft_living"
                                            value={formData.sqft_living}
                                            onChange={handleInputChange}
                                            placeholder="2200"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Lot Size (sqft)
                                        </label>
                                        <input
                                            type="number"
                                            name="sqft_lot"
                                            value={formData.sqft_lot}
                                            onChange={handleInputChange}
                                            placeholder="9000"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Waterfront
                                        </label>
                                        <select
                                            name="waterfront"
                                            value={formData.waterfront}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        >
                                            <option value="">Select an option</option>
                                            <option value="0">No</option>
                                            <option value="1">Limited View</option>
                                            <option value="2">Direct Access</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            View Rating
                                        </label>
                                        <select
                                            name="view"
                                            value={formData.view}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        >
                                            <option value="">Select an option</option>
                                            <option value="0">No View</option>
                                            <option value="1">Fair</option>
                                            <option value="2">Good</option>
                                            <option value="3">Excellent</option>
                                            <option value="4">Premium</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Above Ground Area (sqft)
                                        </label>
                                        <input
                                            type="number"
                                            name="sqft_above"
                                            value={formData.sqft_above}
                                            onChange={handleInputChange}
                                            placeholder="1600"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Basement Area (sqft)
                                        </label>
                                        <input
                                            type="number"
                                            name="sqft_basement"
                                            value={formData.sqft_basement}
                                            onChange={handleInputChange}
                                            placeholder="600"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Year Built
                                        </label>
                                        <input
                                            type="number"
                                            name="yr_built"
                                            value={formData.yr_built}
                                            onChange={handleInputChange}
                                            placeholder="2005"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Year Renovated
                                        </label>
                                        <input
                                            type="number"
                                            name="yr_renovated"
                                            value={formData.yr_renovated}
                                            onChange={handleInputChange}
                                            placeholder="2015"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Country
                                        </label>
                                        <input
                                            type="text"
                                            name="country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            placeholder="Sri Lanka"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Additional Filters Section */}
                            <div className="mt-6">
                                <div className="grid grid-cols-3 gap-4">
                                    {/* Parking spaces */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Parking spaces
                                        </label>
                                        <div className="flex flex-col space-y-1">
                                            <div className="flex items-center">
                                                <input type="checkbox" id="bike-car" className="mr-1" />
                                                <label htmlFor="bike-car" className="text-sm">Bike and Car</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input type="checkbox" id="bike-only" className="mr-1" />
                                                <label htmlFor="bike-only" className="text-sm">Bike only</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input type="checkbox" id="bike-van" className="mr-1" />
                                                <label htmlFor="bike-van" className="text-sm">Bike and Van</label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Availability */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Availability
                                        </label>
                                        <div className="flex flex-col space-y-1">
                                            <div className="flex items-center">
                                                <input type="checkbox" id="available-now" className="mr-1" />
                                                <label htmlFor="available-now" className="text-sm">Available now</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input type="checkbox" id="available-soon" className="mr-1" />
                                                <label htmlFor="available-soon" className="text-sm">Available Soon</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input type="checkbox" id="without-furniture" className="mr-1" />
                                                <label htmlFor="without-furniture" className="text-sm">Without Furniture</label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Single Beds */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Single Beds
                                        </label>
                                        <div className="flex flex-col space-y-1">
                                            <div className="flex items-center">
                                                <input type="checkbox" id="single" className="mr-1" />
                                                <label htmlFor="single" className="text-sm">Single</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input type="checkbox" id="double" className="mr-1" />
                                                <label htmlFor="double" className="text-sm">Double</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input type="checkbox" id="semi-furnished" className="mr-1" />
                                                <label htmlFor="semi-furnished" className="text-sm">Semi Furnished</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4 mt-4">
                                    <div className="flex flex-col space-y-1">
                                        <div className="flex items-center">
                                            <input type="checkbox" id="kitchen" className="mr-1" />
                                            <label htmlFor="kitchen" className="text-sm">Kitchen</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input type="checkbox" id="bunk-beds" className="mr-1" />
                                            <label htmlFor="bunk-beds" className="text-sm">Bunk Beds</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input type="checkbox" id="parking-indoor" className="mr-1" />
                                            <label htmlFor="parking-indoor" className="text-sm">Parking (Indoor)</label>
                                        </div>
                                    </div>

                                    <div className="flex flex-col space-y-1">
                                        <div className="flex items-center">
                                            <input type="checkbox" id="pantry" className="mr-1" />
                                            <label htmlFor="pantry" className="text-sm">Pantry</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input type="checkbox" id="balcony" className="mr-1" />
                                            <label htmlFor="balcony" className="text-sm">Balcony</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input type="checkbox" id="fully-furnished" className="mr-1" />
                                            <label htmlFor="fully-furnished" className="text-sm">Fully Furnished</label>
                                        </div>
                                    </div>

                                    <div className="flex flex-col space-y-1">
                                        <div className="flex items-center">
                                            <input type="checkbox" id="internet" className="mr-1" />
                                            <label htmlFor="internet" className="text-sm">Internet</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input type="checkbox" id="living-room" className="mr-1" />
                                            <label htmlFor="living-room" className="text-sm">Living Room</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input type="checkbox" id="separate-study" className="mr-1" />
                                            <label htmlFor="separate-study" className="text-sm">Separate Study Room</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4 mt-4">
                                    <div className="flex flex-col space-y-1">
                                        <div className="flex items-center">
                                            <input type="checkbox" id="water" className="mr-1" />
                                            <label htmlFor="water" className="text-sm">Water</label>
                                        </div>
                                    </div>

                                    <div className="flex flex-col space-y-1">
                                        <div className="flex items-center">
                                            <input type="checkbox" id="separate-entrance" className="mr-1" />
                                            <label htmlFor="separate-entrance" className="text-sm">Separate entrance</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="mt-8 text-center">
                                <button
                                    type="submit"
                                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-10 rounded"
                                >
                                    AI Predict
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Results Section */}
                    {showResults && (
                        <div className="mt-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {predictedResults.map((result, index) => (
                                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                                        <div className="relative">
                                            <img
                                                src={result.image}
                                                alt={result.title}
                                                className="w-full h-48 object-cover"
                                            />
                                            <div className="absolute bottom-2 left-2">
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
                          {result.location.split(',')[1]?.trim()}
                        </span>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-sm font-bold mb-2 line-clamp-2">
                                                {result.title}
                                            </h3>
                                            <p className="text-xs text-gray-600 mb-2">{result.location}</p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-yellow-600 font-bold">{result.price}</span>
                                                <span className="text-xs text-gray-500">{result.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>


        </div>
    );
};

export default AccommodationSearch;