import React, { useState, useEffect, useMemo } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import Header from '../../components/Heder';
import ConfirmModal from '../../components/ConfirmModal';
import ViewModal from '../../components/ViewModal';
import EditModal from '../../components/EditModal';
import { FaEye, FaTrash, FaPen } from 'react-icons/fa';
import axios from 'axios';

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [modal, setModal] = useState({
        open: false,
        type: '', 
        row: null,
    });
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [page, setPage] = useState(1);
    const perPage = 5;

useEffect(() => {
    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token is missing');
                return;
            }
            const response = await axios.get('http://localhost:3000/api/auth/dashboard', {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log('Fetched user:', response.data);

            // Directly set the user data if it's a single user
            if (response.data) {
                setUsers([response.data]); // Wrap the user object in an array
            } else {
                console.error('No user data found');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    fetchUsers();
}, []);

useEffect(() => {
    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token is missing');
                return;
            }
            const response = await axios.get('http://localhost:3000/api/auth/getusers', {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log('Fetched user list:', response.data);

            if (response.data && Array.isArray(response.data)) {
                setUsers(response.data); 
            } else {
                console.error('No user data found or incorrect format');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    fetchUsers();
}, []);


    // Filter and paginate users
    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            if (status && user.status !== status) return false;
            if (search && !user.name.toLowerCase().includes(search.toLowerCase())) return false;
            if (startDate && new Date(user.created_at) < new Date(startDate)) return false;
            if (endDate && new Date(user.created_at) > new Date(endDate)) return false;
            return true;
        });
    }, [users, status, search, startDate, endDate]);

    const totalPages = Math.ceil(filteredUsers.length / perPage);
    const pageData = filteredUsers.slice((page - 1) * perPage, page * perPage);

    
    const openModal = (type, row) => {
        if (row) {
            console.log("Opening modal for user:", row); // Log row data to check
            setModal({ open: true, type, row });
        } else {
            console.error('Invalid user data');
        }
    };


    const closeModal = () => setModal({ open: false, type: '', row: null });


    const handleConfirm = async () => {
        try {
            if (modal.type === 'delete') {
                await axios.delete(`http://localhost:3000/api/auth/${modal.row.uId}/delete`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setUsers(users.filter(user => user.uId !== modal.row.uId));
            }

            closeModal();
        } catch (error) {
            console.error(`${modal.type} failed:`, error);
        }
    };

    const handleEditUser = async (updatedUser) => {
        console.log("Updated User uId:", updatedUser.uId);

        if (!updatedUser.uId) {
            console.error("User ID is missing!");
            return;
        }

        try {
            const response = await axios.put(`http://localhost:3000/api/auth/update/${updatedUser.uId}`, updatedUser, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });

            if (response.status === 200) {
            const updatedUsers = users.map(user => {
                if (user.uId === updatedUser.uId) {
                    return { ...user, ...updatedUser };
                }
                return user;
            });

            setUsers(updatedUsers);
            closeModal();
            }
  
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    

    const dialogConfig = {
        delete: {
            title: 'Delete User?',
            message: `Are you sure you want to delete the user "${modal.row?.name || 'Unknown'}"?`, 
            confirmText: 'Delete',
        }

    }[modal.type] || {};

    return (
        <>
            <Header />
            <div className="flex">
                <AdminSidebar />
                <main className="flex-1 ml-64 pt-24 bg-gray-100 p-8 min-h-screen">
                    <h2 className="text-2xl font-semibold mb-6">User Management</h2>

                    
                    <div className="bg-white rounded-lg shadow mb-6">
                        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                           
                            {/* <div>
                                <label className="block text-sm font-medium">Status</label>
                                <select
                                    value={status}
                                    onChange={e => { setStatus(e.target.value); setPage(1); }}
                                    className="mt-1 w-full border rounded px-2 py-1"
                                >
                                    <option value="">All</option>
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>
                            </div> */}

                            
                            <div className="sm:col-span-2 lg:col-span-3">
                                <label className="block text-sm font-medium">Date Range</label>
                                <div className="flex space-x-4">
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={e => { setStartDate(e.target.value); setPage(1); }}
                                        className="mt-1 w-full border rounded px-2 py-1"
                                    />
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={e => { setEndDate(e.target.value); setPage(1); }}
                                        className="mt-1 w-full border rounded px-2 py-1"
                                    />
                                </div>
                            </div>

                            {/* Search Filter */}
                            <div className="sm:col-span-2 lg:col-span-3">
                                <label className="block text-sm font-medium">Search</label>
                                <input
                                    value={search}
                                    onChange={e => { setSearch(e.target.value); setPage(1); }}
                                    className="mt-1 w-full border rounded px-2 py-1"
                                    placeholder="Search by username…"
                                />
                            </div>

                            <button onClick={() => {
                                setSearch('');
                                setStatus('');
                                setStartDate('');
                                setEndDate('');
                                setPage(1);
                            }} className="bg-blue-500 text-white py-2 px-4 rounded-md">
                                Reset Filters
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-lg shadow overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left"><input type="checkbox" /></th>
                                    <th className="px-4 py-2 text-left">User Name</th>
                                    <th className="px-4 py-2 text-left">Email</th>
                                    <th className="px-4 py-2 text-left">Address</th>
                                    <th className="px-4 py-2 text-left">NIC</th>
                                    <th className="px-4 py-2 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                                {pageData.map(user => (
                                    <tr key={user.id}>
                                        <td className="px-4 py-2"><input type="checkbox" /></td>
                                        <td className="px-4 py-2">{user.name}</td>
                                        <td className="px-4 py-2">{user.email}</td>
                                        <td className="px-4 py-2">{user.address}</td>
                                        <td className="px-4 py-2">{user.nic}</td>
                                       
                                        <td className="px-4 py-2 flex justify-center space-x-3">
                                               <button title="View" onClick={() => openModal('view', user)}>
                                                    <FaEye className="w-5 h-5 text-purple-600 hover:text-purple-800" />
                                                </button>
                                                <button title="Edit" onClick={() => openModal('edit', user)}>
                                                    <FaPen className="w-5 h-5 text-yellow-600 hover:text-yellow-800" />
                                                </button>
                                                <button title="Delete" onClick={() => openModal('delete', user)}>
                                                    <FaTrash className="w-5 h-5 text-red-600 hover:text-red-800" />
                                                </button>
                                            </td>
                                        
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination */}
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

            <ViewModal isOpen={modal.open && modal.type === 'view'} onClose={closeModal} user={modal.row} />
            
            <EditModal isOpen={modal.open && modal.type === 'edit'} onClose={closeModal} user={modal.row} onSave={handleEditUser} />

            <ConfirmModal
                isOpen={modal.open && modal.type === 'delete' }
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
