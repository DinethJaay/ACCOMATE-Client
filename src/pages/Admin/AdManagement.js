import React, { useState, useMemo } from 'react';
import AdminSidebar from "../../components/AdminSidebar";
import Header from "../../components/Heder";
import ConfirmModal from "../../components/ConfirmModal";
import {
    FaEye,
    FaCheckCircle,
    FaTimesCircle,
    FaTrash,
} from 'react-icons/fa';

const DUMMY_DATA = [
    { id: 1, name: 'Home for rent', date: '2001.04.05', status: 'Approved', username: 'Dineth Jayanga' },
    { id: 2, name: 'Home for rent', date: '2001.04.05', status: 'Pending', username: 'Dineth Jayanga' },
    { id: 3, name: 'Home for rent', date: '2001.04.05', status: 'Rejected', username: 'Dineth Jayanga' },
    // …etc.
];

export default function AdManagement() {
    // filters & pagination
    const [section, setSection] = useState('');
    const [status, setStatus] = useState('');
    const [labelDate, setLabelDate] = useState('');
    const [search, setSearch] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [page, setPage] = useState(1);
    const perPage = 5;

    // modal state
    const [modal, setModal] = useState({
        open: false,
        type: '',   // 'approve'|'reject'|'delete'
        row: null,
    });

    // filter + paginate
    const filtered = useMemo(() => {
        return DUMMY_DATA.filter(r => {
            // Check for Section filter
            if (section && r.id !== +section) return false;
            // Check for Status filter
            if (status && r.status !== status) return false;
            // Check for Date Range filter
            if (startDate && new Date(r.date) < new Date(startDate)) return false;
            if (endDate && new Date(r.date) > new Date(endDate)) return false;
            // Check for Search filter
            if (search && !r.name.toLowerCase().includes(search.toLowerCase())) return false;
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
        approve: {
            title: 'Approve Ad?',
            message: `Approve "${modal.row?.name}" now?`,
            confirmText: 'Approve'
        },
        reject: {
            title: 'Reject Ad?',
            message: `Reject "${modal.row?.name}"?`,
            confirmText: 'Reject'
        },
        delete: {
            title: 'Delete Ad?',
            message: `Delete "${modal.row?.name}" permanently?`,
            confirmText: 'Delete'
        },
    }[modal.type] || {};

    return (
        <>
            <Header />
            <div className="flex">
                <AdminSidebar />

                <main className="flex-1 ml-64 pt-24 bg-gray-100 p-8 min-h-screen">
                    <h2 className="text-2xl font-semibold mb-6">Ad Management</h2>

                    {/* Filters */}
                    <div className="bg-white rounded-lg shadow mb-6">
                        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                            <div>
                                <label className="block text-sm font-medium">Section (ID)</label>
                                <input
                                    value={section}
                                    onChange={e => { setSection(e.target.value); setPage(1); }}
                                    className="mt-1 w-full border rounded px-2 py-1"
                                    placeholder="e.g. 1"
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
                                    <option>Approved</option>
                                    <option>Pending</option>
                                    <option>Rejected</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Label (Date)</label>
                                <input
                                    type="date"
                                    value={labelDate}
                                    onChange={e => { setLabelDate(e.target.value); setPage(1); }}
                                    className="mt-1 w-full border rounded px-2 py-1"
                                />
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

                            <div className="sm:col-span-2 lg:col-span-3">
                                <label className="block text-sm font-medium">Search</label>
                                <input
                                    value={search}
                                    onChange={e => { setSearch(e.target.value); setPage(1); }}
                                    className="mt-1 w-full border rounded px-2 py-1"
                                    placeholder="Search by name…"
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
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Date</th>
                                <th className="px-4 py-2 text-left">Status</th>
                                <th className="px-4 py-2 text-left">Username</th>
                                <th className="px-4 py-2 text-center">Action</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                            {pageData.map(r => (
                                <tr key={r.id}>
                                    <td className="px-4 py-2"><input type="checkbox" /></td>
                                    <td className="px-4 py-2">{r.name}</td>
                                    <td className="px-4 py-2">{r.date}</td>
                                    <td className="px-4 py-2">
                      <span className={` 
                        px-2 py-1 rounded-full text-xs font-medium
                        ${r.status==='Approved' ? 'bg-green-100 text-green-800'
                          : r.status==='Pending' ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'}`}>
                        {r.status}
                      </span>
                                    </td>
                                    <td className="px-4 py-2">{r.username}</td>
                                    <td className="px-4 py-2 flex justify-center space-x-3">
                                        <button title="View">
                                            <FaEye className="w-5 h-5 text-purple-600 hover:text-purple-800" />
                                        </button>
                                        <button
                                            title="Approve"
                                            onClick={() => openModal('approve', r)}
                                        >
                                            <FaCheckCircle className="w-5 h-5 text-green-600 hover:text-green-800" />
                                        </button>
                                        <button
                                            title="Reject"
                                            onClick={() => openModal('reject', r)}
                                        >
                                            <FaTimesCircle className="w-5 h-5 text-red-600 hover:text-red-800" />
                                        </button>
                                        <button
                                            title="Delete"
                                            onClick={() => openModal('delete', r)}
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
