import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaChevronDown, FaMapMarkerAlt, FaCalendarAlt, FaTag, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';

// Sample data - in a real app, this would come from an API
const DUMMY_DATA = [
    { id: 1, title: 'Sharing Rooms For Rent in Galle for Girls', category: 'Room', location: 'Wijesinghe Mw, Galle 08', price: 12500, status: 'Fixed', date: '2024-02-18', imageUrl: 'https://via.placeholder.com/300' },
    { id: 2, title: 'Single Room For Rent in Galle for Anyone', category: 'Room', location: 'Amarasekera Mawatha, Galle 5', price: 30000, status: 'Fixed', date: '2024-02-14', imageUrl: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Annex For Rent in Galle For Anyone', category: 'Annex', location: 'Wijesinghe Mw, Galle, Karapitiya', price: 25000, status: 'Negotiable', date: '2024-02-18', imageUrl: 'https://via.placeholder.com/300' },
    { id: 4, title: 'Annex For Rent in Galle For Couple or Girls', category: 'Annex', location: 'Purana Road, Karapitiya, Galle', price: 25000, status: 'Negotiable', date: '2024-02-18', imageUrl: 'https://via.placeholder.com/300' },
    { id: 5, title: 'Luxury Apartment in Galle Fort Area', category: 'Apartment', location: 'Fort Road, Galle', price: 55000, status: 'Fixed', date: '2024-02-17', imageUrl: 'https://via.placeholder.com/300' },
    { id: 6, title: 'Cozy House for Family in Karapitiya', category: 'House', location: 'Hospital Road, Karapitiya, Galle', price: 42000, status: 'Negotiable', date: '2024-02-16', imageUrl: 'https://via.placeholder.com/300' },
];

// Extract unique categories, locations and statuses
const getUniqueValues = (data, key) => {
    const values = data.map(item => item[key]);
    return [...new Set(values)];
};

const formatPrice = (price) => {
    return new Intl.NumberFormat('en-LK', {
        style: 'currency',
        currency: 'LKR',
        maximumFractionDigits: 0
    }).format(price);
};

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

const PropertyCard = ({ ad }) => (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:scale-[1.01]">
        <div className="relative">
            <img
                src={ad.imageUrl}
                alt={ad.title}
                className="w-full h-48 object-cover"
            />
            <div className="absolute top-0 right-0 bg-blue-600 text-white px-2 py-1 m-2 rounded text-xs font-semibold">
                {ad.status}
            </div>
            <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent w-full h-16 opacity-70"></div>
        </div>

        <div className="p-4">
            <h4 className="font-semibold text-lg mb-2 line-clamp-2">{ad.title}</h4>

            <div className="flex items-center mb-1 text-sm text-gray-600">
                <FaMapMarkerAlt className="mr-2 text-blue-600" />
                <p className="truncate">{ad.location}</p>
            </div>

            <div className="flex items-center mb-1 text-sm text-gray-600">
                <FaTag className="mr-2 text-blue-600" />
                <p>{ad.category}</p>
            </div>

            <div className="flex items-center text-sm text-gray-600">
                <FaCalendarAlt className="mr-2 text-blue-600" />
                <p>{formatDate(ad.date)}</p>
            </div>

            <div className="mt-3 mb-2">
                <p className="text-lg font-bold text-blue-700">{formatPrice(ad.price)}</p>
            </div>
        </div>

        <div className="px-4 pb-4">
            <Link
                to={`/view-ad/${ad.id}`}
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded transition-colors duration-300"
            >
                View Details
            </Link>
        </div>
    </div>
);

const SearchFilter = ({
                          title,
                          type = "select",
                          options = [],
                          value,
                          onChange,
                          placeholder = "",
                          icon = null,
                          min = 0,
                          max = 1000000
                      }) => {
    if (type === "select") {
        return (
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">{title}</label>
                <div className="relative mt-1">
                    <select
                        value={value}
                        onChange={onChange}
                        className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">{placeholder}</option>
                        {options.map((option, idx) => (
                            <option key={idx} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
            </div>
        );
    }

    if (type === "search") {
        return (
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">{title}</label>
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
                <label className="block text-sm font-medium text-gray-700">{title}</label>
                <div className="mt-2">
                    <div className="flex justify-between mb-2">
                        <span className="text-xs font-medium text-gray-500">Min: {formatPrice(value[0])}</span>
                        <span className="text-xs font-medium text-gray-500">Max: {formatPrice(value[1])}</span>
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
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('');
    const [location, setLocation] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100000);
    const [sortOrder, setSortOrder] = useState('asc');
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Extract unique values for filters
    const categories = useMemo(() => getUniqueValues(DUMMY_DATA, 'category'), []);
    const locations = useMemo(() => getUniqueValues(DUMMY_DATA, 'location'), []);
    const statuses = useMemo(() => getUniqueValues(DUMMY_DATA, 'status'), []);

    // Simulate loading data
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    // Filter data based on all filters
    const filteredAds = useMemo(() => {
        return DUMMY_DATA.filter(ad => {
            const matchesSearch = search ?
                ad.title.toLowerCase().includes(search.toLowerCase()) ||
                ad.location.toLowerCase().includes(search.toLowerCase()) :
                true;
            const matchesCategory = category ? ad.category === category : true;
            const matchesStatus = status ? ad.status === status : true;
            const matchesLocation = location ? ad.location === location : true;
            const matchesPrice = ad.price >= minPrice && ad.price <= maxPrice;

            return matchesSearch && matchesCategory && matchesStatus && matchesLocation && matchesPrice;
        });
    }, [search, category, status, location, minPrice, maxPrice]);

    // Sort filtered data
    const sortedAds = useMemo(() => {
        return [...filteredAds].sort((a, b) => {
            if (sortOrder === 'asc') return a.price - b.price;
            return b.price - a.price;
        });
    }, [filteredAds, sortOrder]);

    // Handle price range change
    const handleMinPriceChange = (e) => {
        const value = parseInt(e.target.value);
        setMinPrice(Math.min(value, maxPrice - 1000));
    };

    const handleMaxPriceChange = (e) => {
        const value = parseInt(e.target.value);
        setMaxPrice(Math.max(value, minPrice + 1000));
    };

    // Handle sorting
    const handleSort = (order) => {
        setSortOrder(order);
        setIsSortOpen(false);
    };

    // Reset all filters
    const resetFilters = () => {
        setSearch('');
        setCategory('');
        setStatus('');
        setLocation('');
        setMinPrice(0);
        setMaxPrice(100000);
        setSortOrder('asc');
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
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Find Your Perfect Space</h1>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Mobile Filter Toggle */}
                <button
                    className="lg:hidden mb-4 bg-blue-600 text-white py-2 px-4 rounded-md flex items-center justify-center"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                    <FaSearch className="mr-2" />
                    {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
                </button>

                {/* Sidebar */}
                <div className={`lg:block lg:w-64 ${isFilterOpen ? 'block' : 'hidden'}`}>
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
                            title="Status"
                            type="select"
                            options={statuses}
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            placeholder="All Statuses"
                        />

                        <SearchFilter
                            title="Price Range"
                            type="priceRange"
                            value={[minPrice, maxPrice]}
                            onChange={[handleMinPriceChange, handleMaxPriceChange]}
                            min={0}
                            max={100000}
                        />

                        <div className="mt-6">
                            <h3 className="text-sm font-medium text-gray-700 mb-2">Sort By Price</h3>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => handleSort('asc')}
                                    className={`flex items-center justify-center px-4 py-2 border rounded-md ${
                                        sortOrder === 'asc'
                                            ? 'bg-blue-600 text-white border-blue-600'
                                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                    }`}
                                >
                                    <FaSortAmountUp className={`mr-2 ${sortOrder === 'asc' ? 'text-white' : 'text-gray-400'}`} />
                                    Low to High
                                </button>
                                <button
                                    onClick={() => handleSort('desc')}
                                    className={`flex items-center justify-center px-4 py-2 border rounded-md ${
                                        sortOrder === 'desc'
                                            ? 'bg-blue-600 text-white border-blue-600'
                                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                    }`}
                                >
                                    <FaSortAmountDown className={`mr-2 ${sortOrder === 'desc' ? 'text-white' : 'text-gray-400'}`} />
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
                                {sortedAds.length} {sortedAds.length === 1 ? 'Property' : 'Properties'} Found
                            </h3>
                            {Object.values({category, location, status}).some(val => val !== '') && (
                                <div className="text-sm text-gray-500 mt-1">
                                    Filtered by: {[
                                    category && `Category: ${category}`,
                                    location && `Location: ${location}`,
                                    status && `Status: ${status}`
                                ].filter(Boolean).join(', ')}
                                </div>
                            )}
                        </div>

                        {/* Sort Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsSortOpen(!isSortOpen)}
                                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
                            >
                                <span>Sort By: {sortOrder === 'asc' ? 'Price Low to High' : 'Price High to Low'}</span>
                                <FaChevronDown className="w-4 h-4" />
                            </button>

                            {isSortOpen && (
                                <div className="absolute right-0 bg-white shadow-md rounded-md mt-2 w-48 z-10">
                                    <button
                                        onClick={() => handleSort('asc')}
                                        className="flex items-center px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                                    >
                                        <FaSortAmountUp className="mr-2 text-gray-400" />
                                        Price: Low to High
                                    </button>
                                    <button
                                        onClick={() => handleSort('desc')}
                                        className="flex items-center px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                                    >
                                        <FaSortAmountDown className="mr-2 text-gray-400" />
                                        Price: High to Low
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Ad Cards */}
                    {sortedAds.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {sortedAds.map((ad) => (
                                <PropertyCard key={ad.id} ad={ad} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center bg-white p-12 rounded-lg shadow text-center">
                            <FaSearch size={48} className="text-gray-300 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">No properties found</h3>
                            <p className="text-gray-600 mb-4">Try adjusting your search filters</p>
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
    );
}