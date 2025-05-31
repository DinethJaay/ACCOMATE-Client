    import React, { useState, useEffect, useMemo } from 'react';
    import AdminSidebar from "../../components/AdminSidebar";
    import Header from "../../components/Heder";
    import ConfirmModal from "../../components/ConfirmModal";
    import { FaEye, FaCheckCircle, FaTimesCircle, FaTrash } from 'react-icons/fa';
    import axios from 'axios';

    export default function AdManagement() {
        // State for ads and filters
        const [ads, setAds] = useState([]);
        const [modal, setModal] = useState({ open: false, type: '', row: null });
        const [search, setSearch] = useState('');
        const [status, setStatus] = useState('');
        const [page, setPage] = useState(1);
        const perPage = 5;
        const [category, setCategory] = useState('');
        const [location, setLocation] = useState('');
        const [minPrice, setMinPrice] = useState(0);
        const [maxPrice, setMaxPrice] = useState(10000000);
        const [userRole, setUserRole] = useState('');


        useEffect(() => {
            const fetchUserRole = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/auth/dashboard', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setUserRole(response.data.role || 'user');  
                console.log('User Role:', response.data.role); 
            } catch (error) {
                console.error('Error fetching user role:', error);
            }
            };


            const fetchAds = async () => {
                try {
                    const token = localStorage.getItem('token');
                    console.log('Received Token:', token);
            
                    if (!token) {
                        console.error('Token is missing');
                        return;
                    }
            
                    const response = await axios.get('http://localhost:3000/api/accommodation/filtered-accommodations', {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                        params: {
                            search: search || '',       // Empty string if no search term
                            category: category || '',   // Empty string if no category
                            status: status || '',       // Empty string if no status
                            location: location || '',   // Empty string if no location
                            minPrice: minPrice || 0,    // Default to 0 if no minPrice
                            maxPrice: maxPrice || 100000 // Default to 100000 if no maxPrice
                        }
                    });
                    console.log('Ads Response:', response.data); // Add this line to log the API response
            
                    if (response.data && response.data.accommodations) {
                        const adsWithUsernames = await Promise.all(response.data.accommodations.map(async ad => {
                            const userResponse = await axios.get('http://localhost:3000/api/auth/dashboard', {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                                },
                            });
                            const username = userResponse.data.name || 'Unknown'; // Ensure you have username in the response
        
                            return { ...ad, username }; // Add username to the ad object
                        }));
        
                        setAds(adsWithUsernames);
                    } else {
                        console.error('No accommodations found in response:', response.data);
                    }
                } catch (error) {
                    console.error('Error fetching ads:', error);
                }
            };
            
            fetchUserRole();
            fetchAds();
        }, [search, category, status, location, minPrice, maxPrice]);

        


        const filteredAds = useMemo(() => {
            return ads.filter(ad => {
                if (status && ad.status !== status) return false;
                if (search && !ad.title.toLowerCase().includes(search.toLowerCase())) return false;
                return true;
            });
        }, [ads, status, search, category, location, minPrice, maxPrice]);

        const totalPages = Math.ceil(filteredAds.length / perPage);
        const pageData = filteredAds.slice((page - 1) * perPage, page * perPage);

        // Open modal for approve/reject/delete actions
        const openModal = (type, row) => {
            console.log('Opening modal with row:', row);  // Add this log to inspect the row object
            setModal({ open: true, type, row });
        };
        const closeModal = () => setModal(m => ({ ...m, open: false }));

        // Handle confirm action (approve/reject/delete)
        const handleConfirm = async () => {
            try {

                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                if (!modal.row || !modal.row.acc_id) {
                    console.error('No valid ad data found for approval');
                    return;
                }

                if (modal.type === 'approve') {
                    await axios.patch(`http://localhost:3000/api/accommodation/accommodations/${modal.row.acc_id}/approve`,  {}, config);
                setAds(prevAds =>
                    prevAds.map(ad =>
                        ad.acc_id === modal.row.acc_id ? { ...ad, status: 'approved' } : ad
                    )
                );
                }

                if (modal.type === 'reject') {
                    await axios.patch(`http://localhost:3000/api/accommodation/accommodations/${modal.row.acc_id}/reject`,  {}, config);
                setAds(prevAds => prevAds.map(ad =>
                    ad.acc_id === modal.row.acc_id ? { ...ad, status: 'rejected' } : ad
                ));
                }

                if (modal.type === 'delete') {
                    await axios.delete(`http://localhost:3000/api/accommodation/accommodations/${modal.row.acc_id}/delete`, config);
                setAds(prevAds => prevAds.filter(ad => 
                    ad.acc_id !== modal.row.acc_id));
                }

                closeModal();
            } catch (error) {
                console.error(`${modal.type} failed:`, error);
            }
        };

        const dialogConfig = {
            approve: {
                title: 'Approve Ad?',
                message: `Approve "${modal.row?.title || 'Unknown'}" now?`,
                confirmText: 'Approve'
            },
            reject: {
                title: 'Reject Ad?',
                message: `Reject "${modal.row?.title || 'Unknown'}"?`,
                confirmText: 'Reject'
            },
            delete: {
                title: 'Delete Ad?',
                message: `Delete "${modal.row?.title || 'Unknown'}" permanently?`,
                confirmText: 'Delete'
            }
        }[modal.type] || {};

        return (
            <>
                <Header />
                <div className="flex">
                    <AdminSidebar />
                    <main className="flex-1 ml-64 pt-24 bg-gray-100 p-8 min-h-screen">
                        <h2 className="text-2xl font-semibold mb-6">Ad Management</h2>

                    
                        <div className="bg-white rounded-lg shadow mb-6">
                            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                                <div>
                                    <label className="block text-sm font-medium">Search</label>
                                    <input
                                        value={search}
                                        onChange={e => { setSearch(e.target.value); setPage(1); }}
                                        className="mt-1 w-full border rounded px-2 py-1"
                                        placeholder="Search by name…"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Status</label>
                                    <select
                                        value={status}
                                        onChange={e => { setStatus(e.target.value); setPage(1); }}
                                        className="mt-1 w-full border rounded px-2 py-1"
                                    >
                                        <option value="">All</option>
                                        <option>approved</option>
                                        <option>pending</option>
                                        <option>rejected</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                    
                        <div className="bg-white rounded-lg shadow overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left">Name</th>
                                        <th className="px-4 py-2 text-left">Date</th>
                                        <th className="px-4 py-2 text-left">Status</th>
                                        <th className="px-4 py-2 text-left">Username</th>
                                        <th className="px-4 py-2 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 bg-white">
                                    {pageData.map(r => (
                                        <tr key={r.acc_id}>
                                            <td className="px-4 py-2">{r.title}</td>
                                            <td className="px-4 py-2">{new Date(r.created_at).toLocaleDateString()}</td>
                                            <td className="px-4 py-2">{r.status}</td>
                                            <td className="px-4 py-2">{r.username}</td>
                                            {userRole === 'admin' && (
                                                <td className="px-4 py-2 flex justify-center space-x-3">
                                                    <button onClick={() => openModal('approve', r)}>
                                                        <FaCheckCircle className="w-5 h-5 text-green-600 hover:text-green-800" />
                                                    </button>
                                                    <button onClick={() => openModal('reject', r)}>
                                                        <FaTimesCircle className="w-5 h-5 text-red-600 hover:text-red-800" />
                                                    </button>
                                                    <button onClick={() => openModal('delete', r)}>
                                                        <FaTrash className="w-5 h-5 text-red-600 hover:text-red-800" />
                                                    </button>
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        
                            <div className="px-4 py-3 border-t flex justify-end space-x-2">
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setPage(i + 1)}
                                        className={`px-3 py-1 rounded ${page === i + 1 ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </main>
                </div>

            
                <ConfirmModal
                    isOpen={modal.open}
                    title={dialogConfig.title}
                    message={dialogConfig.message}
                    confirmText={dialogConfig.confirmText}
                    cancelText="Cancel"
                    onConfirm={handleConfirm}
                    onCancel={closeModal}
                />
            </>
        );
    }
