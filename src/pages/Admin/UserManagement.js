import React, { useState, useMemo } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import Header from '../../components/Heder';
import ConfirmModal from '../../components/ConfirmModal';
import {
    FaEye,
    FaTrash,
    FaPen,
} from 'react-icons/fa';

const DUMMY_DATA = [
    { id: 1, username: 'dineth@gmail.com', NIC: '20012370281', fullName: 'A.K Dineth Jayanga', address: 'Dineth Jayanga', date: '2021-02-09' },
    { id: 2, username: 'john@gmail.com', NIC: '20012370281', fullName: 'John Doe', address: 'New York', date: '2021-03-09' },
    { id: 3, username: 'mary@gmail.com', NIC: '20012370281', fullName: 'Mary Jane', address: 'Los Angeles', date: '2021-01-15' },
    { id: 4, username: 'alex@gmail.com', NIC: '20012370281', fullName: 'Alex Smith', address: 'Chicago', date: '2021-04-25' },
    // more rows...
];

export default function UserManagement() {
    const [section, setSection] = useState('');
    const [status, setStatus] = useState('');
    const [labelDate, setLabelDate] = useState('');
    const [search, setSearch] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [page, setPage] = useState(1);
    const perPage = 5;

    const [modal, setModal] = useState({
        open: false,
        type: '', // 'delete' | 'edit'
        row: null,
    });

    // Filter + Pagination logic
    const filtered = useMemo(() => {
        return DUMMY_DATA.filter(r => {
            if (section && r.id !== +section) return false;
            if (search && !r.username.toLowerCase().includes(search.toLowerCase())) return false;
            if (startDate && new Date(r.date) < new Date(startDate)) return false;
            if (endDate && new Date(r.date) > new Date(endDate)) return false;
            return true;
        });
    }, [section, status, labelDate, search, startDate, endDate]);

    const totalPages = Math.ceil(filtered.length / perPage);
    const pageData = filtered.slice((page - 1) * perPage, page * perPage);

    const openModal = (type, row) => setModal({ open: true, type, row });
    const closeModal = () => setModal(m => ({ ...m, open: false }));

    const handleConfirm = () => {
        console.log(`${modal.type} confirmed for`, modal.row);
        // TODO: call your API here...
        closeModal();
    };

    const dialogConfig = {
        delete: {
            title: 'Delete User?',
            message: `Are you sure you want to delete the user "${modal.row?.username}"?`,
            confirmText: 'Delete',
        },
        edit: {
            title: 'Edit User?',
            message: `Do you want to edit the details of "${modal.row?.username}"?`,
            confirmText: 'Edit',
        },
    }[modal.type] || {};

    return (
        <>
            <Header />
            <div className="flex">
                <AdminSidebar />

                <main className="flex-1 ml-64 pt-24 bg-gray-100 p-8 min-h-screen">
                    <h2 className="text-2xl font-semibold mb-6">User Management</h2>

                    {/* Filters */}
                    <div className="bg-white rounded-lg shadow mb-6">
                        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                            {/* Section Filter */}
                            <div>
                                <label className="block text-sm font-medium">Section (ID)</label>
                                <input
                                    value={section}
                                    onChange={e => { setSection(e.target.value); setPage(1); }}
                                    className="mt-1 w-full border rounded px-2 py-1"
                                    placeholder="e.g. 1"
                                />
                            </div>
                            {/* Status Filter */}
                            <div>
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
                            </div>
                            {/* Date Range Filter */}
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
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-lg shadow overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left"><input type="checkbox" /></th>
                                <th className="px-4 py-2 text-left">User Name</th>
                                <th className="px-4 py-2 text-left">NIC</th>
                                <th className="px-4 py-2 text-left">Full Name</th>
                                <th className="px-4 py-2 text-left">Address</th>
                                <th className="px-4 py-2 text-center">Action</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                            {pageData.map(user => (
                                <tr key={user.id}>
                                    <td className="px-4 py-2"><input type="checkbox" /></td>
                                    <td className="px-4 py-2">{user.username}</td>
                                    <td className="px-4 py-2">{user.NIC}</td>
                                    <td className="px-4 py-2">{user.fullName}</td>
                                    <td className="px-4 py-2">{user.address}</td>
                                    <td className="px-4 py-2 flex justify-center space-x-3">
                                        <button
                                            title="View"
                                            onClick={() => openModal('view', user)}
                                        >
                                            <FaEye className="w-5 h-5 text-purple-600 hover:text-purple-800" />
                                        </button>
                                        <button
                                            title="Edit"
                                            onClick={() => openModal('edit', user)}
                                        >
                                            <FaPen className="w-5 h-5 text-yellow-600 hover:text-yellow-800" />
                                        </button>
                                        <button
                                            title="Delete"
                                            onClick={() => openModal('delete', user)}
                                        >
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
                                    className={`px-3 py-1 rounded 
                    ${page === i + 1
                                        ? 'bg-indigo-600 text-white'
                                        : 'text-gray-600 hover:bg-gray-200'}`}
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
