import React, { useState, useMemo } from 'react';
import { FaSearch, FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const DUMMY_DATA = [
    { id: 1, title: 'Sharing Rooms For Rent in Galle for Girls', category: 'Room', location: 'Wijesinghe Mw, Galle 08', price: 12500, status: 'Fixed', date: '2024-02-18', imageUrl: 'https://via.placeholder.com/300' },
    { id: 2, title: 'Single Room For Rent in Galle for Anyone', category: 'Room', location: 'Amarasekera Mawatha, Galle 5', price: 30000, status: 'Fixed', date: '2024-02-14', imageUrl: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Annex For Rent in Galle For Anyone', category: 'Annex', location: 'Wijesinghe Mw, Galle, Karapitiya', price: 25000, status: 'Negotiable', date: '2024-02-18', imageUrl: 'https://via.placeholder.com/300' },
    { id: 4, title: 'Annex For Rent in Galle For Couple or Girls', category: 'Annex', location: 'Purana Road, Karapitiya, Galle', price: 25000, status: 'Negotiable', date: '2024-02-18', imageUrl: 'https://via.placeholder.com/300' },
    // more data...
];

export default function SearchPage() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('');
    const [location, setLocation] = useState('');
    const [minPrice, setMinPrice] = useState(1);
    const [maxPrice, setMaxPrice] = useState(10000000);
    const [sortOrder, setSortOrder] = useState('asc');
    const [isSortOpen, setIsSortOpen] = useState(false);

    // Extract unique locations for dropdown
    const uniqueLocations = useMemo(() => {
        const locations = DUMMY_DATA.map(ad => ad.location);
        return [...new Set(locations)];
    }, []);

    const filtered = useMemo(() => {
        return DUMMY_DATA.filter(ad => {
            const matchesCategory = category ? ad.category.toLowerCase() === category.toLowerCase() : true;
            const matchesStatus = status ? ad.status.toLowerCase() === status.toLowerCase() : true;
            const matchesLocation = location ? ad.location.toLowerCase() === location.toLowerCase() : true;
            const matchesPrice = ad.price >= minPrice && ad.price <= maxPrice;
            const matchesSearch = search ? ad.title.toLowerCase().includes(search.toLowerCase()) : true;
            return matchesCategory && matchesStatus && matchesLocation && matchesPrice && matchesSearch;
        });
    }, [category, status, location, search, minPrice, maxPrice]);

    const sortedAds = useMemo(() => {
        return [...filtered].sort((a, b) => {
            if (sortOrder === 'asc') return a.price - b.price;
            return b.price - a.price;
        });
    }, [filtered, sortOrder]);

    const handleSort = (order) => {
        setSortOrder(order);
        setIsSortOpen(false);
    };

    return (
        <div className="flex flex-col lg:flex-row pt-10">
            {/* Sidebar */}
            <div className="w-full lg:w-60 p-6 bg-white shadow-md rounded-md mb-6 lg:mb-0 lg:mr-6">
                <h3 className="text-lg font-semibold">Search Filters</h3>

                {/* Search Filter */}
                <div className="mt-4">
                    <label className="block text-sm font-medium">Search</label>
                    <div className="flex items-center border rounded px-2 py-1 mt-1">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full border-none outline-none"
                            placeholder="Search ads"
                        />
                        <FaSearch />
                    </div>
                </div>

                {/* Category Filter */}
                <div className="mt-4">
                    <label className="block text-sm font-medium">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="mt-1 w-full border rounded px-2 py-1"
                    >
                        <option value="">Select Category</option>
                        <option value="Room">Room</option>
                        <option value="Annex">Annex</option>
                        <option value="House">House</option>
                        <option value="Apartment">Apartment</option>
                    </select>
                </div>

                {/* Location Filter */}
                <div className="mt-4">
                    <label className="block text-sm font-medium">Location</label>
                    <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="mt-1 w-full border rounded px-2 py-1"
                    >
                        <option value="">Select Location</option>
                        {uniqueLocations.map((loc, idx) => (
                            <option key={idx} value={loc}>{loc}</option>
                        ))}
                    </select>
                </div>

                {/* Price Filter */}
                <div className="mt-4">
                    <label className="block text-sm font-medium">Price Range</label>
                    <input
                        type="range"
                        min="1"
                        max="10000000"
                        value={minPrice}
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                        className="w-full"
                    />
                    <div className="flex justify-between text-sm">
                        <span>Rs. {minPrice}</span>
                        <span>Rs. {maxPrice}</span>
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="10000000"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="w-full"
                    />
                </div>

                {/* Sort By */}
                <div className="mt-4">
                    <label className="block text-sm font-medium">Sort By Price</label>
                    <div className="flex flex-col gap-2 mt-2">
                        <button onClick={() => handleSort('asc')} className="bg-blue-500 text-white py-2 rounded-md">Low to High</button>
                        <button onClick={() => handleSort('desc')} className="bg-blue-500 text-white py-2 rounded-md">High to Low</button>
                    </div>
                </div>
            </div>

            {/* Ads Display */}
            <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold text-xl">Found Ads: {filtered.length} Ads</h3>

                    {/* Sort Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsSortOpen(!isSortOpen)}
                            className="flex items-center space-x-2 text-sm px-4 py-2 bg-blue-600 text-white rounded-md"
                        >
                            <span>Sort</span>
                            <FaChevronDown className="w-4 h-4" />
                        </button>

                        {isSortOpen && (
                            <div className="absolute right-0 bg-white shadow-md rounded-md mt-2 w-32 z-10">
                                <button onClick={() => handleSort('asc')} className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-100">Price: Low to High</button>
                                <button onClick={() => handleSort('desc')} className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-100">Price: High to Low</button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Ad Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedAds.map((ad) => (
                        <div key={ad.id} className="bg-white shadow-lg rounded-md overflow-hidden">
                            <img
                                src={ad.imageUrl}
                                alt={ad.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h4 className="font-semibold text-lg mb-2">{ad.title}</h4>
                                <p className="text-sm text-gray-500">{ad.location}</p>
                                <p className="text-sm text-gray-700">Rs. {ad.price}</p>
                                <p className="text-xs text-gray-400">{ad.date}</p>
                            </div>
                            <div className="flex justify-between items-center p-4">
                                <Link to={`/view-ad/${ad.id}`} className="text-purple-600">View</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
