import React, { useState } from "react";
import Header from "../../components/Heder";
import Footer from "../../components/Footer";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from 'react-router-dom';


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
        price: ""
    });

    const [predictedResults, setPredictedResults] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // Convert numbers where necessary (including bathrooms)
        const newValue = ['sqft_living', 'sqft_lot', 'sqft_above', 'sqft_basement', 'yr_built', 'yr_renovated', 'price', 'bathrooms'].includes(name) 
            ? parseFloat(value) 
            : value;
    
        setFormData({
            ...formData,
            [name]: newValue
        });
    };
    
    

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: checked,
        }));
      };

    const handlePredict = async (e) => {
        e.preventDefault();
        
        // Ensure all fields are filled in (optional validation)
        if (!formData.sqft_living || !formData.sqft_lot || !formData.waterfront || !formData.view || !formData.condition || !formData.sqft_above || !formData.sqft_basement || !formData.yr_built || !formData.yr_renovated || !formData.price || !formData.bathrooms) {
            toast.error("Please fill in all the required fields.");
            return;
        }
    
        // Add Accessibility and Property Features to the form data
        const extendedFormData = {
            ...formData,
            ground_floor: formData.ground_floor ? 1 : 0,
            nosteps: formData.nosteps ? 1 : 0,
            grabbars: formData.grabbars ? 1 : 0,
            wheelchair: formData.wheelchair ? 1 : 0,
            singlebeds: formData.singlebeds ? 1 : 0,
            doublebeds: formData.doublebeds ? 1 : 0,
            pantry: formData.pantry ? 1 : 0,
            kitchen: formData.kitchen ? 1 : 0,
            livingroom: formData.livingroom ? 1 : 0,
            cctv: formData.cctv ? 1 : 0,
            seperateentrance: formData.seperateentrance ? 1 : 0,
            furnished: formData.furnished ? 1 : 0,
            brandnew: formData.brandnew ? 1 : 0
        };
    
        console.log("Sending the following data to the backend:", extendedFormData);
    
        try {
            // Send the form data to the AI model to get predictions
            const predictionResponse = await axios.post("http://127.0.0.1:5003/predict", formData);
            console.log("Model Prediction Response:", predictionResponse.data);
    
            const { predictions } = predictionResponse.data;
            console.log(predictions);
    
            // Combine predictions with the extended form data
            const combinedData = {
                ...extendedFormData,
                predictedCity: predictions.city,
                predictedBedrooms: predictions.bedrooms,
                predictedFloors: predictions.floors,
            };
            console.log("Request sent to backend:", combinedData);
    
            // Now, send this combined data to the backend to check for similar accommodations
            const similarAccommodationsResponse = await axios.post("http://localhost:3000/api/accommodation/find", combinedData);
            
            // Check if the response is OK (200)
            if (similarAccommodationsResponse.status === 200) {
                console.log("Similar Accommodations Response:", similarAccommodationsResponse.data);
    
                const similarAccommodations = similarAccommodationsResponse.data.accommodations || [];
                console.log(similarAccommodations);
    
                if (similarAccommodations.length === 0) {
                    setPredictedResults([]);
                    setShowResults(true);
                    toast.info("No similar accommodations found.");
                } else {
                    setPredictedResults(similarAccommodations.map((accommodation) => ({
                        acc_id: accommodation.acc_id,
                        title: `Accommodation in ${accommodation.city}`,
                        location: accommodation.city,
                        price: `Rs ${accommodation.price}`,
                        date: new Date(accommodation.created_at).toLocaleDateString(),
                        image: `http://localhost:3000${accommodation.image_path || '/default-image.jpg'}` || "/api/placeholder/300/200",
                        negotiable: true
                    })));
                    setShowResults(true);
                }
            } else {
                throw new Error("Failed to fetch similar accommodations");
            }
        } catch (error) {
            console.error("Error fetching prediction or similar accommodations:", error);
            toast.error("Error fetching predictions or similar accommodations. Please try again.");
        }
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
                                            placeholder="2"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Bathrooms
                                        </label>
                                        <input
                                            type="text"
                                            name="bathrooms"
                                            value={formData.bathrooms}
                                            onChange={handleInputChange}
                                            placeholder="No of bathrooms"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Accesibiliy Features */}

                            <div className="mb-6 mt-10">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                Accessibility Features
                                </label>
                                <div className="space-y-2">
                                <div className="flex items-center">
                                    <input
                                    type="checkbox"
                                    id="ground_floor"
                                    name="ground_floor"
                                    checked={!!formData.ground_floor}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                    />
                                    <label htmlFor="ground_floor">Ground floor</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                    type="checkbox"
                                    id="nosteps"
                                    name="nosteps"
                                    checked={!!formData.nosteps}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                    />
                                    <label htmlFor="nosteps">No step</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                    type="checkbox"
                                    id="grabbars"
                                    name="grabbars"
                                    checked={!!formData.grabbars}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                    />
                                    <label htmlFor="grabbars">Grab bars</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                    type="checkbox"
                                    id="wheelchair"
                                    name="wheelchair"
                                    checked={!!formData.wheelchair}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                    />
                                    <label htmlFor="wheelchair">Wheelchair accessible</label>
                                </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-4">
                                Property Features
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <div className="flex items-center">
                                    <input
                                    type="checkbox"
                                    id="singlebeds"
                                    name="singlebeds"
                                    checked={!!formData.singlebeds}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                    />
                                    <label htmlFor="singlebeds">Single Beds</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                    type="checkbox"
                                    id="doublebeds"
                                    name="doublebeds"
                                    checked={!!formData.doublebeds}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                    />
                                    <label htmlFor="doublebeds">Double Beds</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                    type="checkbox"
                                    id="pantry"
                                    name="pantry"
                                    checked={!!formData.pantry}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                    />
                                    <label htmlFor="pantry">Pantry</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                    type="checkbox"
                                    id="kitchen"
                                    name="kitchen"
                                    checked={!!formData.kitchen}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                    />
                                    <label htmlFor="kitchen">Kitchen</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                    type="checkbox"
                                    id="livingroom"
                                    name="livingroom"
                                    checked={!!formData.livingroom}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                    />
                                    <label htmlFor="livingroom">Living Room</label>
                                    <span className="text-xs text-gray-500 ml-2">(TV / TV Room)</span>
                                </div>
                                <div className="flex items-center">
                                    <input
                                    type="checkbox"
                                    id="cctv"
                                    name="cctv"
                                    checked={!!formData.cctv}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                    />
                                    <label htmlFor="cctv">CCTV Camera</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                    type="checkbox"
                                    id="separateentrance"
                                    name="separateentrance"
                                    checked={!!formData.separateentrance}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                    />
                                    <label htmlFor="separateentrance">Separate entrance</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                    type="checkbox"
                                    id="furnished"
                                    name="furnished"
                                    checked={!!formData.furnished}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                    />
                                    <label htmlFor="furnished">Furnished</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                    type="checkbox"
                                    id="brandnew"
                                    name="brandnew"
                                    checked={!!formData.brandnew}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                    />
                                    <label htmlFor="brandnew">Brand New</label>
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
                    {showResults && predictedResults.length === 0 ? (
                            <div className="text-center mt-8">
                                <p>No similar accommodations found.</p>
                            </div>
                        ) : (
                        <div className="mt-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {predictedResults.map((result) => (
                                    <div key={result.acc_id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                        <div className="relative">
                                            <img
                                                src={result.image}
                                                alt={result.title}
                                                className="w-full h-48 object-cover"
                                            />
                                            <div className="absolute bottom-2 left-2">
                                                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
                                                    {result.location}
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
                                        <div className="px-4 pb-4">
                                            {result.acc_id ? (
                                                <Link to={`/accommodation/${result.acc_id}`} className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded transition-colors duration-300">
                                                    View Details
                                                </Link>
                                            ) : (
                                                <p>Invalid ID</p>  
                                            )}
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