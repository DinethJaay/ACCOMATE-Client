import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaChevronDown,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTag,
  FaSortAmountDown,
  FaSortAmountUp,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import axios from "axios";

const DUMMY_DATA = [
  {
    id: 1,
    title: "Sharing Rooms For Rent in Galle for Girls",
    category: "Room",
    location: "Maharagama",
    price: 12500,
    status: "Fixed",
    date: "2024-02-18",
    imageUrl: "https://via.placeholder.com/300",
  },
  {
    id: 2,
    title: "Apartment For Rent in Colombo",
    category: "Apartment",
    location: "Colombo",
    price: 25000,
    status: "Available",
    date: "2024-05-01",
    imageUrl: "https://via.placeholder.com/300",
  },
  {
    id: 3,
    title: "House For Sale in Homagama",
    category: "House",
    location: "Homagama",
    price: 600000,
    status: "Sold",
    date: "2024-03-15",
    imageUrl: "https://via.placeholder.com/300",
  },
  {
    id: 4,
    title: "House For Sale in Homagama",
    category: "Annex",
    location: "Galle",
    price: 600000,
    status: "Sold",
    date: "2024-03-15",
    imageUrl: "https://via.placeholder.com/300",
  },
];

const getUniqueValues = (data, key) => {
  const values = data.map((item) => item[key]);
  return [...new Set(values)];
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    maximumFractionDigits: 0,
  }).format(price);
};

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const PropertyCard = ({
  ad,
  isFavorite,
  handleAddFavorite,
  handleRemoveFavorite,
}) => {
  console.log(ad);
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:scale-[1.01]">
      <div className="relative">
        <img
          src={`http://localhost:3000${
            ad.images?.[0] || "/img/default-image.jpg"
          }`}
          alt={ad.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 right-0 bg-blue-600 text-white px-2 py-1 m-2 rounded text-xs font-semibold">
          {ad.status}
        </div>
        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent w-full h-16 opacity-70"></div>
        <div
          className="absolute top-2 right-2 text-white cursor-pointer"
          onClick={() =>
            isFavorite(ad.acc_id)
              ? handleRemoveFavorite(ad.acc_id)
              : handleAddFavorite(ad.acc_id)
          }
        >
          {isFavorite(ad.acc_id) ? <FaHeart /> : <FaRegHeart />}
          {isFavorite(ad.acc_id)
            ? " Remove from Favorites"
            : " Add to Favorites"}
        </div>
      </div>

      <div className="p-4">
        <h4 className="font-semibold text-lg mb-2 line-clamp-2">{ad.title}</h4>

        <div className="flex items-center mb-1 text-sm text-gray-600">
          <FaMapMarkerAlt className="mr-2 text-blue-600" />
          <p className="truncate">{ad.city}</p>
        </div>

        <div className="flex items-center mb-1 text-sm text-gray-600">
          <FaTag className="mr-2 text-blue-600" />
          <p>{ad.category}</p>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <FaCalendarAlt className="mr-2 text-blue-600" />
          <p>{formatDate(ad.created_at)}</p>
        </div>

        <div className="mt-3 mb-2">
          <p className="text-lg font-bold text-blue-700">
            {formatPrice(ad.price)}
          </p>
        </div>
      </div>

      <div className="px-4 pb-4">
        {ad.acc_id ? (
          <Link
            to={`/accommodation/${ad.acc_id}`}
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded transition-colors duration-300"
          >
            View Details
          </Link>
        ) : (
          <p>Invalid ID</p>
        )}
      </div>
    </div>
  );
};

const SearchFilter = ({
  title,
  type = "select",
  options = [],
  value,
  onChange,
  placeholder = "",
  icon = null,
  min = 0,
  max = 10000000,
}) => {
  if (type === "select") {
    return (
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          {title}
        </label>
        <div className="relative mt-1">
          <select
            value={value}
            onChange={onChange}
            className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">{placeholder}</option>
            {options.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  if (type === "search") {
    return (
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          {title}
        </label>
        <div className="relative mt-1 flex items-center">
          <input
            type="text"
            value={value}
            onChange={onChange}
            className="block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder={placeholder}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {icon}
          </div>
        </div>
      </div>
    );
  }

  if (type === "priceRange") {
    return (
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          {title}
        </label>
        <div className="mt-2">
          <div className="flex justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">
              Min: {formatPrice(value[0])}
            </span>
            <span className="text-xs font-medium text-gray-500">
              Max: {formatPrice(value[1])}
            </span>
          </div>
          <div className="relative">
            <input
              type="range"
              min={min}
              max={max}
              value={value[0]}
              onChange={onChange[0]}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <input
              type="range"
              min={min}
              max={max}
              value={value[1]}
              onChange={onChange[1]}
              className="absolute w-full h-2 bg-transparent rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default function SearchPage() {
  // State for filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [sortOrder, setSortOrder] = useState("asc");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [accommodations, setAccommodations] = useState([]);
  const [filteredAccommodations, setFilteredAccommodations] = useState([]);
  const [selectedAd, setSelectedAd] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Extract unique values for filters
  const categories = useMemo(() => getUniqueValues(DUMMY_DATA, "category"), []);
  const locations = useMemo(() => getUniqueValues(DUMMY_DATA, "location"), []);

  const fetchFilteredAccommodations = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing");
        return;
      }

      // console.log('Fetching with params:', {
      //     search,
      //     category,
      //     location,
      //     minPrice,
      //     maxPrice,
      // });

      const response = await axios.get(
        "http://localhost:3000/api/accommodation/filtered-accommodations",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            search: search || "",
            category: category || "",
            location: location || "",
            minPrice: minPrice || 0,
            maxPrice: maxPrice || 10000000,
          },
        }
      );

      const approvedAds = response.data.accommodations.filter(
        (ad) => ad.status === "approved"
      );

      setAccommodations(approvedAds); // Update state with filtered accommodations data
    } catch (error) {
      console.error("Error fetching filtered accommodations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFilteredAccommodations();
  }, [search, category, location, minPrice, maxPrice]);

  //console.log('Received filters:', { search, category, location, minPrice, maxPrice });

  useEffect(() => {
    if (!accommodations || accommodations.length === 0) return;

    let filtered = accommodations;

    if (search.trim()) {
      filtered = filtered.filter((ad) =>
        `${ad.title ?? ""} ${ad.description ?? ""} ${ad.address ?? ""}`
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter((ad) => ad.category === category);
    }

    if (location) {
      filtered = filtered.filter(
        (ad) => ad.city?.toLowerCase() === location.toLowerCase()
      );
    }
    console.log("Before Price Filter:", filtered);

    const adPrice = (price) => parseFloat(price);

    if (minPrice !== undefined || maxPrice !== undefined) {
      filtered = filtered.filter((ad) => {
        const price = adPrice(ad.price);

        if (isNaN(price)) return false;

        return (
          (minPrice === undefined || price >= minPrice) && // minPrice filter
          (maxPrice === undefined || price <= maxPrice) // maxPrice filter
        );
      });
    }

    console.log("Current maxPrice:", maxPrice);

    console.log("After Price Filter:", filtered);

    console.log("Filtered accommodations:", filtered);

    setFilteredAccommodations(filtered);
  }, [accommodations, search, category, location, minPrice, maxPrice]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token is missing");
          return;
        }
        const response = await axios.get(
          "http://localhost:3000/api/favorites",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFavorites(response.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, []);

  const handleAddFavorite = async (adId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("User is not authenticated");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/favorites/add",
        { acc_id: adId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Favorite added:", response.data);

      setFavorites((prevFavorites) => {
        const updatedFavorites = [...prevFavorites, { acc_id: adId }];
        console.log("Updated favorites:", updatedFavorites);
        return updatedFavorites;
      });
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  const handleRemoveFavorite = async (adId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("User is not authenticated");
        return;
      }
      await axios.delete(`http://localhost:3000/api/favorites/${adId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update local state after removing favorite
      setFavorites((prevFavorites) =>
        prevFavorites.filter((fav) => fav.acc_id !== adId)
      );
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // const onFavoriteToggle = (adId) => {
  //     setFavorites((prevFavorites) => {
  //         const updatedFavorites = prevFavorites.includes(adId)
  //             ? prevFavorites.filter((id) => id !== adId)
  //             : [...prevFavorites, adId];

  //         console.log('Updated Favorites:', updatedFavorites);

  //         localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  //         return updatedFavorites;
  //     });
  // };

  // useEffect(() => {
  //     const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
  //     setFavorites(storedFavorites);
  // }, []);

  console.log("Favorites:", favorites);

  const isFavorite = (adId) => {
    return favorites.some((favorite) => favorite && favorite.acc_id === adId);
  };

  const handleMinPriceChange = (e) => {
    const value = parseInt(e.target.value);
    setMinPrice(Math.min(value, maxPrice - 1000));
  };

  const handleMaxPriceChange = (e) => {
    const value = parseInt(e.target.value);
    setMaxPrice(Math.max(value, minPrice + 1000));
  };

  const handleSort = (order) => {
    setSortOrder(order);
    setIsSortOpen(false);
    setAccommodations((prevAds) => {
      const sortedAds = [...prevAds].sort((a, b) => {
        return order === "asc" ? a.price - b.price : b.price - a.price;
      });
      return sortedAds;
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setSearch("");
    setCategory("");
    setLocation("");
    setMinPrice(0);
    setMaxPrice(10000000);
    setSortOrder("asc");

    setTimeout(() => {
      fetchFilteredAccommodations();
    }, 0);
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6 animate-pulse">
          <div className="w-full lg:w-64 h-screen/2 bg-gray-200 rounded-lg"></div>
          <div className="flex-1">
            <div className="h-10 bg-gray-200 rounded-lg mb-6"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="bg-gray-200 h-72 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 mt-10">
        Find Your Perfect Space
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Mobile Filter Toggle */}
        <button
          className="lg:hidden mb-4 bg-blue-600 text-white py-2 px-4 rounded-md flex items-center justify-center"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <FaSearch className="mr-2" />
          {isFilterOpen ? "Hide Filters" : "Show Filters"}
        </button>

        <div
          className={`lg:block lg:w-64 ${isFilterOpen ? "block" : "hidden"}`}
        >
          <div className="bg-white shadow-lg rounded-lg p-6 sticky top-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
              <button
                onClick={resetFilters}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear All
              </button>
            </div>

            <SearchFilter
              title="Search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title or location"
              icon={<FaSearch className="text-gray-400" />}
            />

            <SearchFilter
              title="Category"
              type="select"
              options={categories}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="All Categories"
            />

            <SearchFilter
              title="Location"
              type="select"
              options={locations}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="All Locations"
            />

            <SearchFilter
              title="Price Range"
              type="priceRange"
              value={[minPrice, maxPrice]}
              onChange={[handleMinPriceChange, handleMaxPriceChange]}
              min={0}
              max={10000000}
            />

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Sort By Price
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleSort("asc")}
                  className={`flex items-center justify-center px-4 py-2 border rounded-md ${
                    sortOrder === "asc"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <FaSortAmountUp
                    className={`mr-2 ${
                      sortOrder === "asc" ? "text-white" : "text-gray-400"
                    }`}
                  />
                  Low to High
                </button>
                <button
                  onClick={() => handleSort("desc")}
                  className={`flex items-center justify-center px-4 py-2 border rounded-md ${
                    sortOrder === "desc"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <FaSortAmountDown
                    className={`mr-2 ${
                      sortOrder === "desc" ? "text-white" : "text-gray-400"
                    }`}
                  />
                  High to Low
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-white p-4 rounded-lg shadow">
            <div className="mb-4 sm:mb-0">
              <h3 className="font-semibold text-xl text-gray-800">
                {accommodations.length}{" "}
                {accommodations.length === 1 ? "Property" : "Properties"} Found
              </h3>
              {Object.values({ category, location }).some(
                (val) => val !== ""
              ) && (
                <div className="text-sm text-gray-500 mt-1">
                  Filtered by:{" "}
                  {[
                    category && `Category: ${category}`,
                    location && `Location: ${location}`,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </div>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
              >
                <span>
                  Sort By:{" "}
                  {sortOrder === "asc"
                    ? "Price Low to High"
                    : "Price High to Low"}
                </span>
                <FaChevronDown className="w-4 h-4" />
              </button>

              {isSortOpen && (
                <div className="absolute right-0 bg-white shadow-md rounded-md mt-2 w-48 z-10">
                  <button
                    onClick={() => handleSort("asc")}
                    className="flex items-center px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                  >
                    <FaSortAmountUp className="mr-2 text-gray-400" />
                    Price: Low to High
                  </button>
                  <button
                    onClick={() => handleSort("desc")}
                    className="flex items-center px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                  >
                    <FaSortAmountDown className="mr-2 text-gray-400" />
                    Price: High to Low
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAccommodations.length > 0 ? (
              filteredAccommodations.map((ad) => (
                <PropertyCard
                  ad={ad}
                  isFavorite={isFavorite}
                  //onFavoriteToggle={onFavoriteToggle}
                  handleAddFavorite={handleAddFavorite}
                  handleRemoveFavorite={handleRemoveFavorite}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center bg-white p-12 rounded-lg shadow text-center">
                <FaSearch size={48} className="text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No properties found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search filters
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
