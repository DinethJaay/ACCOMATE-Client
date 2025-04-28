import React, { useState, useMemo } from 'react';
import AdminSidebar from '../../components/Sidebar';
import Header from '../../components/Heder';
import { FaEye, FaPen, FaTrash } from 'react-icons/fa';

const DUMMY_DATA = [
    { id: 1, title: 'Annex For Rent in Galle For Anyone', location: 'Wijesinghe Mw, Galle, Karapitiya', price: 'Rs25,000 (Negotiable)', date: 'February 18, 2024', status: 'Pending', imageUrl: 'https://via.placeholder.com/300' },
    { id: 2, title: 'Spacious Room For Rent in Colombo', location: 'Colombo, Sri Lanka', price: 'Rs50,000 (Fixed)', date: 'February 14, 2024', status: 'Approved', imageUrl: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Cozy Room For Rent in Kandy', location: 'Kandy, Sri Lanka', price: 'Rs30,000 (Negotiable)', date: 'February 12, 2024', status: 'Rejected', imageUrl: 'https://via.placeholder.com/300' },
    { id: 4, title: 'Home for Rent in Colombo', location: 'Colombo, Sri Lanka', price: 'Rs45,000 (Negotiable)', date: 'February 25, 2024', status: 'Approved', imageUrl: 'https://via.placeholder.com/300' },
    { id: 5, title: 'Modern Apartment for Rent', location: 'Nugegoda, Sri Lanka', price: 'Rs70,000 (Fixed)', date: 'March 1, 2024', status: 'Pending', imageUrl: 'https://via.placeholder.com/300' },
    { id: 6, title: 'Modern Apartment for Rent', location: 'Nugegoda, Sri Lanka', price: 'Rs70,000 (Fixed)', date: 'March 1, 2024', status: 'Pending', imageUrl: 'https://via.placeholder.com/300' },
    { id: 7, title: 'Modern Apartment for Rent', location: 'Nugegoda, Sri Lanka', price: 'Rs70,000 (Fixed)', date: 'March 1, 2024', status: 'Pending', imageUrl: 'https://via.placeholder.com/300' },
    { id: 8, title: 'Modern Apartment for Rent', location: 'Nugegoda, Sri Lanka', price: 'Rs70,000 (Fixed)', date: 'March 1, 2024', status: 'Pending', imageUrl: 'https://via.placeholder.com/300' },
    { id: 9, title: 'Modern Apartment for Rent', location: 'Nugegoda, Sri Lanka', price: 'Rs70,000 (Fixed)', date: 'March 1, 2024', status: 'Pending', imageUrl: 'https://via.placeholder.com/300' },
    { id: 9, title: 'Modern Apartment for Rent', location: 'Nugegoda, Sri Lanka', price: 'Rs70,000 (Fixed)', date: 'March 1, 2024', status: 'Pending', imageUrl: 'https://via.placeholder.com/300' },
    { id: 9, title: 'Modern Apartment for Rent', location: 'Nugegoda, Sri Lanka', price: 'Rs70,000 (Fixed)', date: 'March 1, 2024', status: 'Pending', imageUrl: 'https://via.placeholder.com/300' },
    { id: 9, title: 'Modern Apartment for Rent', location: 'Nugegoda, Sri Lanka', price: 'Rs70,000 (Fixed)', date: 'March 1, 2024', status: 'Pending', imageUrl: 'https://via.placeholder.com/300' },
    { id: 9, title: 'Modern Apartment for Rent', location: 'Nugegoda, Sri Lanka', price: 'Rs70,000 (Fixed)', date: 'March 1, 2024', status: 'Pending', imageUrl: 'https://via.placeholder.com/300' },
    { id: 9, title: 'Modern Apartment for Rent', location: 'Nugegoda, Sri Lanka', price: 'Rs70,000 (Fixed)', date: 'March 1, 2024', status: 'Pending', imageUrl: 'https://via.placeholder.com/300' },
    // more data
];

export default function FavouriteAds() {
    const [section, setSection] = useState('');
    const [status, setStatus] = useState('');
    const [search, setSearch] = useState('');

    const filtered = useMemo(() => {
        return DUMMY_DATA.filter(r => {
            if (section && !r.title.toLowerCase().includes(section.toLowerCase())) return false;
            if (status && r.status !== status) return false;
            if (search && !r.title.toLowerCase().includes(search.toLowerCase())) return false;
            return true;
        });
    }, [section, status, search]);

    const handleDelete = (id) => {
        // Handle delete logic
        console.log(`Deleting ad with ID: ${id}`);
    };

    const handleEdit = (id) => {
        // Handle edit logic
        console.log(`Editing ad with ID: ${id}`);
    };

    return (
        <>
            <Header />
            <div className="flex">
                <AdminSidebar />

                <main className="flex-1 ml-64 pt-24 bg-gray-100 p-8 min-h-screen">
                    <h2 className="text-2xl font-semibold mb-6">Favourite Ads</h2>

                    {/* Filters */}
                    <div className="bg-white rounded-lg shadow mb-6">
                        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                            <div>
                                <label className="block text-sm font-medium">Section</label>
                                <input
                                    value={section}
                                    onChange={e => { setSection(e.target.value); }}
                                    className="mt-1 w-full border rounded px-2 py-1"
                                    placeholder="Search by title"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Status</label>
                                <select
                                    value={status}
                                    onChange={e => { setStatus(e.target.value); }}
                                    className="mt-1 w-full border rounded px-2 py-1"
                                >
                                    <option value="">All</option>
                                    <option>Approved</option>
                                    <option>Pending</option>
                                    <option>Rejected</option>
                                </select>
                            </div>
                            <div className="sm:col-span-2 lg:col-span-3">
                                <label className="block text-sm font-medium">Search</label>
                                <input
                                    value={search}
                                    onChange={e => { setSearch(e.target.value); }}
                                    className="mt-1 w-full border rounded px-2 py-1"
                                    placeholder="Search by title…"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Ad Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 overflow-y-auto max-h-screen">
                        {filtered.map((ad) => (
                            <div key={ad.id} className="bg-white rounded-lg shadow-lg p-4">
                                <img src={ad.imageUrl} alt={ad.title} className="w-full h-40 object-cover rounded mb-4" />
                                <h3 className="text-lg font-semibold mb-2">{ad.title}</h3>
                                <p className="text-sm text-gray-600">{ad.location}</p>
                                <p className="text-sm text-gray-800">{ad.price}</p>
                                <p className="text-xs text-gray-500">{ad.date}</p>
                                <div className="mt-4 flex justify-between items-center">
                                    <span className={`text-xs py-1 px-3 rounded-full ${ad.status === 'Approved' ? 'bg-green-100 text-green-800' : ad.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                        {ad.status}
                                    </span>
                                    <div className="flex space-x-2">
                                        <button title="View">
                                            <FaEye className="w-5 h-5 text-purple-600 hover:text-purple-800" />
                                        </button>
                                        <button title="Edit" onClick={() => handleEdit(ad.id)}>
                                            <FaPen className="w-5 h-5 text-yellow-600 hover:text-yellow-800" />
                                        </button>
                                        <button title="Delete" onClick={() => handleDelete(ad.id)}>
                                            <FaTrash className="w-5 h-5 text-red-600 hover:text-red-800" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
}
