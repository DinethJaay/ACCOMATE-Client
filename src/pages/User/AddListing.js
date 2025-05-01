import React, { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Heder";

const PostAdForm = () => {
  const [price, setPrice] = useState("00.00");
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Function to validate prediction fields
  const validatePredictionFields = () => {
    const newErrors = {};

    // Required fields for price prediction
    if (!document.getElementById("bedrooms").value) {
      newErrors.bedrooms = "Bedrooms is required";
    }

    if (!document.getElementById("bathrooms").value) {
      newErrors.bathrooms = "Bathrooms is required";
    }

    if (!document.getElementById("sqft_living").value) {
      newErrors.sqft_living = "Living space is required";
    }

    if (!document.getElementById("sqft_lot").value) {
      newErrors.sqft_lot = "Lot size is required";
    }

    if (!document.getElementById("floors").value) {
      newErrors.floors = "Number of floors is required";
    }

    if (!document.getElementById("condition").value) {
      newErrors.condition = "Condition is required";
    }

    if (!document.getElementById("yr_built").value) {
      newErrors.yr_built = "Year built is required";
    }

    if (!document.getElementById("city").value) {
      newErrors.city = "City is required";
    }

    if (!document.getElementById("statezip").value) {
      newErrors.statezip = "State/Zip is required";
    }

    if (!document.getElementById("country").value) {
      newErrors.country = "Country is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to handle price prediction
  // Function to handle price prediction
  const handlePricePrediction = async () => {
    // Validate all required fields
    if (!validatePredictionFields()) {
      return;
    }

    // Set loading state
    setIsLoading(true);
    setPredictedPrice("Calculating...");

    try {
      // Gather data for price prediction
      const predictionData = {
        bedrooms: parseInt(document.getElementById("bedrooms").value),
        bathrooms: parseFloat(document.getElementById("bathrooms").value),
        sqft_living: parseInt(document.getElementById("sqft_living").value),
        sqft_lot: parseInt(document.getElementById("sqft_lot").value),
        floors: parseFloat(document.getElementById("floors").value),
        waterfront: parseInt(document.getElementById("waterfront").value),
        view: parseInt(document.getElementById("view").value),
        condition: parseInt(document.getElementById("condition").value),
        sqft_above: parseInt(document.getElementById("sqft_above").value),
        sqft_basement: parseInt(document.getElementById("sqft_basement").value),
        yr_built: parseInt(document.getElementById("yr_built").value),
        yr_renovated: parseInt(document.getElementById("yr_renovated").value),
        city: document.getElementById("city").value,
        statezip: document.getElementById("statezip").value,
        country: document.getElementById("country").value,
      };

      // Call the prediction API
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(predictionData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Update price fields with the prediction result
      const predictedValue = data.predicted_price.toFixed(2);
      setPredictedPrice(predictedValue);
      setPrice(predictedValue);
    } catch (error) {
      console.error("Error during price prediction:", error);
      setPredictedPrice("Error calculating price");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert checkbox to 1 or 0
    const checkboxValue = (id) => (document.getElementById(id).checked ? 1 : 0);

    // Gather all form data
    const formData = {
      // Basic property info
      title: document.getElementById("title").value,
      category: document.getElementById("category").value,
      description: document.getElementById("description").value,
      pricingType: document.getElementById("pricingType").value,
      price: price,
      itemCondition: document.getElementById("itemCondition").value,

      // Property details
      bedrooms: parseInt(document.getElementById("bedrooms").value),
      bathrooms: parseFloat(document.getElementById("bathrooms").value),
      bathroomType: document.getElementById("bathroomType").value,
      sqft_living: parseInt(document.getElementById("sqft_living").value),
      sqft_lot: parseInt(document.getElementById("sqft_lot").value),
      floors: parseFloat(document.getElementById("floors").value),
      waterfront: parseInt(document.getElementById("waterfront").value),
      view: parseInt(document.getElementById("view").value),
      condition: parseInt(document.getElementById("condition").value),
      sqft_above: parseInt(document.getElementById("sqft_above").value),
      sqft_basement: parseInt(document.getElementById("sqft_basement").value),
      yr_built: parseInt(document.getElementById("yr_built").value),
      yr_renovated: parseInt(document.getElementById("yr_renovated").value),

      // Location
      city: document.getElementById("city").value,
      statezip: document.getElementById("statezip").value,
      country: document.getElementById("country").value,

      // Accessibility Features (using 1/0 instead of true/false)
      accessibilityFeatures: {
        groundFloor: checkboxValue("groundfloor"),
        noStep: checkboxValue("nostep"),
        grabBars: checkboxValue("grabbars"),
        wheelchair: checkboxValue("wheelchair"),
      },

      // Property Features (using 1/0 instead of true/false)
      propertyFeatures: {
        singleBeds: checkboxValue("singlebeds"),
        doubleBeds: checkboxValue("doublebeds"),
        pantry: checkboxValue("pantry"),
        kitchen: checkboxValue("kitchen"),
        livingRoom: checkboxValue("livingroom"),
        cctv: checkboxValue("cctv"),
        separateEntrance: checkboxValue("separateentrance"),
        furnished: checkboxValue("furnished"),
        brandNew: checkboxValue("brandnew"),
      },

      // Terms agreement (using 1/0)
      termsAgreed: checkboxValue("terms"),

      // User information
      userName: document.getElementById("userName").value,
      mobileNumber: document.getElementById("mobileNumber").value,
      userCountry: document.getElementById("userCountry").value,
      address: document.getElementById("address").value,
    };

    // Validate terms agreement
    if (formData.termsAgreed === 0) {
      alert("You must agree to the terms and conditions to proceed.");
      return;
    }

    console.log("Form submission data:", formData);

    // TODO: Replace with actual API call
    // Example:
    // fetch('/api/add-listing', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData)
    // });
  };

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
              <p className="text-sm text-gray-500">
                Select boarding category for your ad
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Boarding */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Boarding
                  </label>
                  <div className="flex space-x-4 text-sm">
                    <span className="text-yellow-500">
                      Single Room, Colombo
                    </span>
                    <span className="text-yellow-500">
                      Single Room, Rent Room
                    </span>
                    <button
                      type="button"
                      className="text-blue-500 hover:underline"
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  id="category"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select a category</option>
                  <option value="1">Room</option>
                  <option value="2">Annex</option>
                </select>
              </div>

              {/* Title */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="Enter title (maximum limit 100)"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Ad Description */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Ad Description
                  </label>
                  <span className="text-xs text-gray-500">
                    0 out of 3000 characters
                  </span>
                </div>
                <div className="border border-gray-300 rounded overflow-hidden">
                  <div className="bg-gray-50 border-b px-3 py-2 flex items-center">
                    <span className="text-sm">Normal</span>
                    <span className="text-gray-300 mx-2">|</span>
                    <span className="text-sm">
                      Landlords to secure advertising screen target and selected
                      ad...
                    </span>
                    <span className="text-blue-500 ml-auto">...</span>
                  </div>
                  <textarea
                    id="description"
                    className="w-full p-3 min-h-[100px] focus:outline-none"
                    placeholder="Enter your description here"
                  ></textarea>
                </div>
              </div>

              {/* Type of Ad
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type of Ad
                </label>
                <select
                  id="adType"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select an option</option>
                  <option value="rent">For Rent</option>
                  <option value="sale">For Sale</option>
                </select>
              </div> */}

              {/* Pricing Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pricing Type
                </label>
                <select
                  id="pricingType"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select an option</option>
                  <option value="monthly">Monthly</option>
                  <option value="weekly">Weekly</option>
                  <option value="daily">Daily</option>
                </select>
              </div>

              {/* Currency
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency
                </label>
                <div className="relative">
                  <textarea
                    id="currency"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                    placeholder="Rs."
                    rows="1"
                  ></textarea>
                  <div className="absolute top-2 right-2 text-gray-400">
                    <span className="text-xs">0/100</span>
                  </div>
                </div>
              </div> */}

              {/* Price */}
              {/* Price */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="price-input"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handlePricePrediction}
                    disabled={isLoading}
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${
                      isLoading ? "bg-gray-400" : "bg-blue-500"
                    } text-white px-3 py-1 rounded text-sm`}
                  >
                    {isLoading ? "Calculating..." : "Fixed Price"}
                  </button>
                </div>
                <div className="bg-gray-100 p-4 mt-2 text-center">
                  <p className="font-bold text-gray-800">RS. {price}</p>
                  {predictedPrice && (
                    <p className="text-sm text-green-600 mt-1">
                      Predicted Price: RS. {predictedPrice}
                    </p>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Fill all required prediction fields marked with * to calculate
                  price
                </p>
              </div>

              {/* Item Condition */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Item Condition
                </label>
                <select
                  id="itemCondition"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select an option</option>
                  <option value="new">New</option>
                  <option value="used">Used</option>
                </select>
              </div>

              {/* Price Prediction Fields */}
              <div className="mb-8">
                <h2 className="text-lg font-medium mb-4 bg-gray-100 p-3 rounded">
                  Property Details for Price Prediction
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Bedrooms */}
                  <div>
                    <label
                      htmlFor="bedrooms"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Bedrooms *
                    </label>
                    <input
                      type="number"
                      id="bedrooms"
                      required
                      className={`w-full border ${
                        errors.bedrooms ? "border-red-500" : "border-gray-300"
                      } rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    />
                    {errors.bedrooms && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.bedrooms}
                      </p>
                    )}
                  </div>

                   {/* Bathrooms */}
                   <div>
                    <label
                      htmlFor="bathrooms"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Bathrooms *
                    </label>
                    <input
                      type="number"
                      id="bathrooms"
                      step="0.5"
                      required
                      className={`w-full border ${errors.bathrooms ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    />
                    {errors.bathrooms && (
                      <p className="text-red-500 text-xs mt-1">{errors.bathrooms}</p>
                    )}
                  </div>

                 {/* Living Space */}
                 <div>
                    <label
                      htmlFor="sqft_living"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Living Space (sqft) *
                    </label>
                    <input
                      type="number"
                      id="sqft_living"
                      required
                      className={`w-full border ${errors.sqft_living ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    />
                    {errors.sqft_living && (
                      <p className="text-red-500 text-xs mt-1">{errors.sqft_living}</p>
                    )}
                  </div>

                  {/* Lot Size */}
                  <div>
                    <label
                      htmlFor="sqft_lot"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Lot Size (sqft)
                    </label>
                    <input
                      type="number"
                      id="sqft_lot"
                      className={`w-full border ${errors.sqft_lot ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    />
                      {errors.sqft_lot && (
                      <p className="text-red-500 text-xs mt-1">{errors.sqft_lot}</p>
                    )}
                  </div>

                  {/* Floors */}
                  <div>
                    <label
                      htmlFor="floors"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Floors
                    </label>
                    <input
                      type="number"
                      id="floors"
                      step="0.5"
                      className={`w-full border ${errors.floors ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    />
                    {errors.floors && (
                      <p className="text-red-500 text-xs mt-1">{errors.floors}</p>
                    )}
                  </div>

                  {/* Waterfront */}
                  <div>
                    <label
                      htmlFor="waterfront"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Waterfront
                    </label>
                    <select
                      id="waterfront"
                      className={`w-full border ${errors.waterfront ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    >
                          {errors.waterfront && (
                      <p className="text-red-500 text-xs mt-1">{errors.waterfront}</p>
                    )}
                      <option value="0">No</option>
                      <option value="1">Yes</option>
                    </select>
                  </div>

                  {/* View */}
                  <div>
                    <label
                      htmlFor="view"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      View (0-4)
                    </label>
                    <select
                      id="view"
                      className={`w-full border ${errors.view ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    >
                         {errors.view && (
                      <p className="text-red-500 text-xs mt-1">{errors.view}</p>
                    )}
                      <option value="0">0 - None</option>
                      <option value="1">1 - Fair</option>
                      <option value="2">2 - Average</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Excellent</option>
                    </select>
                  </div>

                  {/* Condition */}
                  <div>
                    <label
                      htmlFor="condition"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Condition (1-5)
                    </label>
                    <select
                      id="condition"
                      className={`w-full border ${errors.condition ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    >
                         {errors.condition && (
                      <p className="text-red-500 text-xs mt-1">{errors.condition}</p>
                    )}
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Average</option>
                      <option value="4">4 - Good</option>
                      <option value="5">5 - Excellent</option>
                    </select>
                  </div>

                  {/* Above Ground Sqft */}
                  <div>
                    <label
                      htmlFor="sqft_above"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Above Ground (sqft)
                    </label>
                    <input
                      type="number"
                      id="sqft_above"
                      className={`w-full border ${errors.sqft_above ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    />
                     {errors.sqft_above && (
                      <p className="text-red-500 text-xs mt-1">{errors.sqft_above}</p>
                    )}
                  </div>

                  {/* Basement Sqft */}
                  <div>
                    <label
                      htmlFor="sqft_basement"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Basement (sqft)
                    </label>
                    <input
                      type="number"
                      id="sqft_basement"
                      className={`w-full border ${errors.sqft_basement ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    />
                     {errors.sqft_basement && (
                      <p className="text-red-500 text-xs mt-1">{errors.sqft_basement}</p>
                    )}
                  </div>

                  {/* Year Built */}
                  <div>
                    <label
                      htmlFor="yr_built"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Year Built
                    </label>
                    <input
                      type="number"
                      id="yr_built"
                      className={`w-full border ${errors.yr_built ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    />
                       {errors.yr_built && (
                      <p className="text-red-500 text-xs mt-1">{errors.yr_built}</p>
                    )}
                  </div>

                  {/* Year Renovated */}
                  <div>
                    <label
                      htmlFor="yr_renovated"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Year Renovated
                    </label>
                    <input
                      type="number"
                      id="yr_renovated"
                      className={`w-full border ${errors.yr_renovated ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    />
                     {errors.yr_renovated && (
                      <p className="text-red-500 text-xs mt-1">{errors.yr_renovated}</p>
                    )}
                  </div>

                  {/* City */}
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      className={`w-full border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    />
                     {errors.city && (
                      <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                    )}
                  </div>

                  {/* State/Zip */}
                  <div>
                    <label
                      htmlFor="statezip"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      State/Zip
                    </label>
                    <input
                      type="text"
                      id="statezip"
                      className={`w-full border ${errors.statezip ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    />
                      {errors.statezip && (
                      <p className="text-red-500 text-xs mt-1">{errors.statezip}</p>
                    )}
                  </div>

                  {/* Country */}
                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      className={`w-full border ${errors.country ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    />
                     {errors.country && (
                      <p className="text-red-500 text-xs mt-1">{errors.country}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Bathroom Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bathroom Type
                </label>
                <select
                  id="bathroomType"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select an option</option>
                  <option value="attached">Attached</option>
                  <option value="common">Common</option>
                </select>
              </div>

              {/* Accesibiliy Features */}

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Accesibiliy Features
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="groundfloor" className="mr-2" />
                    <label htmlFor="ground">Ground floor</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="nostep" className="mr-2" />
                    <label htmlFor="nostep">No step</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="grabbars" className="mr-2" />
                    <label htmlFor="grabbars">Grab bars</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="wheelchair" className="mr-2" />
                    <label htmlFor="wheelchair">Wheelchair accessible</label>
                  </div>
                </div>
              </div>

              {/* Property Features */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Property Features
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="singlebeds" className="mr-2" />
                    <label htmlFor="single-beds">Single Beds</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="doublebeds" className="mr-2" />
                    <label htmlFor="double-beds">Double Beds</label>
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
                    <input type="checkbox" id="livingroom" className="mr-2" />
                    <label htmlFor="living-room">Living Room</label>
                    <span className="text-xs text-gray-500 ml-2">
                      (TV / TV Room)
                    </span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="cctv" className="mr-2" />
                    <label htmlFor="cctv">CCTV Camera</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="separateentrance"
                      className="mr-2"
                    />
                    <label htmlFor="separate-entrance">Separate entrance</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="furnished" className="mr-2" />
                    <label htmlFor="semi-furnished">Furnished</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="brandnew" className="mr-2" />
                    <label htmlFor="brand-new">Brand New</label>
                  </div>
                </div>
              </div>
              {/* User Information */}
              <div className="mb-8">
                <h2 className="text-lg font-medium mb-4 bg-gray-100 p-3 rounded">
                  User Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Your Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="userName"
                      placeholder="Dimple Gamage"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      id="mobileNumber"
                      placeholder="0700000000"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country *
                    </label>
                    <select
                      id="userCountry"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Select an option</option>
                      <option value="sri-lanka">Sri Lanka</option>
                    </select>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      placeholder="Enter Address"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="mb-6 flex items-center">
                <input type="checkbox" id="terms" className="mr-2" />
                <label htmlFor="terms" className="text-sm">
                  I agree to Term & conditions
                </label>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-600 text-blue-950 font-bold py-2 px-10 rounded"
                >
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
