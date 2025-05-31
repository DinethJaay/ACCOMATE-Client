import React, { useState,  useEffect } from 'react';
import AdminSidebar from '../../components/Sidebar';
import { FaEye, FaPen, FaTrash } from 'react-icons/fa';
import axios from 'axios';



export default function MyAds() {
    const [section, setSection] = useState('');
    const [status, setStatus] = useState('');
    const [search, setSearch] = useState('');
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAd, setSelectedAd] = useState(null);

    useEffect(() => {
        const fetchAds = async () => {
            try{
                const token = localStorage.getItem('token');

                if (!token) {
                    console.error('No token found in local storage');
                    return;
                }

                const response = await axios.get('http://localhost:3000/api/accommodation/accommodations', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAds(response.data.accommodations);
                console.log('Fetched ads:', response.data.accommodations);
                setLoading(false);
            }
            catch (error){
                console.error('Error fetching ads:', error);
                setLoading(false);
            }   
        }
        fetchAds();
    }, []);

    const filtered = ads.filter(ad => {
        if (section && !ad.title.toLowerCase().includes(section.toLowerCase())) return false;
        if (status && ad.status !== status) return false;
        if (search && !ad.title.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    });

    const handleDelete = async (id) => {
        try {
           
    
            // Send DELETE request to backend with the accommodation ID
            const response = await axios.delete(`http://localhost:3000/api/accommodation/delete-accommodation/${id}`);
    
            // Check if the delete was successful and update the UI
            if (response.status === 200) {
                setAds((prevAds) => prevAds.filter((ad) => ad.acc_id !== id)); // Remove the deleted ad
                alert('Accommodation deleted successfully!');
            }
        
        } catch (error) {
            console.error('Error deleting accommodation:', error);  // Log the error for debugging
            alert('Error deleting accommodation. Please try again.');
        }
    };

    const handleEdit = (id) => {
        // Handle edit logic
        console.log(`Editing ad with ID: ${id}`);
    };

    const handleView = (ad) => {
        setSelectedAd(ad);  
    };

    const handleCloseModal = () => {
        setSelectedAd(null);  
    };

    return (
        <>
            
            <div className="flex">
                <AdminSidebar />

                <main className="flex-1 ml-64 pt-24 bg-gray-100 p-8 min-h-screen">
                    <h2 className="text-2xl font-semibold mb-6">My Ads</h2>

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
                                    <option>approved</option>
                                    <option>pending</option>
                                    <option>rejected</option>
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
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            filtered.map((ad) => (
                                <div key={ad.acc_id} className="bg-white rounded-lg shadow-lg p-4">
                                    <img src={`http://localhost:3000${ad.images[0] || '/img/default-image.jpg'}`} alt={ad.title} className="w-full h-40 object-cover rounded mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">{ad.title}</h3>
                                    <p className="text-sm text-gray-600">{ad.city}</p>
                                    <p className="text-sm text-gray-800">Rs.{ad.price}</p>
                                    <p className="text-xs text-gray-500">{ad.date}</p>
                                    <div className="mt-4 flex justify-between items-center">
                                        <span className={`text-xs py-1 px-3 rounded-full ${ad.status === 'Approved' ? 'bg-green-100 text-green-800' : ad.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                            {ad.status}
                                        </span>
                                        <div className="flex space-x-2">
                                            <button title="View" onClick={() => handleView(ad)}>
                                                <FaEye className="w-5 h-5 text-purple-600 hover:text-purple-800" />
                                            </button>
                                            {/* <button title="Edit" onClick={() => handleEdit(ad.acc_id)}>
                                                <FaPen className="w-5 h-5 text-yellow-600 hover:text-yellow-800" />
                                            </button> */}
                                            <button title="Delete" onClick={() => handleDelete(ad.acc_id)}>
                                                <FaTrash className="w-5 h-5 text-red-600 hover:text-red-800" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Modal to view ad details */}
                    {selectedAd && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white p-6 rounded-lg w-96">
                                <h3 className="text-xl font-semibold mb-4">{selectedAd.title}</h3>
                                <h3 className="text-xl font-semibold mb-4">{selectedAd.address}</h3>
                                <p className="text-md text-gray-600">{selectedAd.city}</p>
                                <p className="text-md text-gray-800">Rs.{selectedAd.price}/{selectedAd.pricing_type}</p>
                                <p className="text-md text-gray-500">{selectedAd.created_at}</p>
                                <img src={`http://localhost:3000${selectedAd.images[0] || '/img/default-image.jpg'}`} alt={selectedAd.title} className="w-full h-40 object-cover rounded my-4" />
                                <button onClick={handleCloseModal} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </main>
               
            </div>
        </>
    );
}
