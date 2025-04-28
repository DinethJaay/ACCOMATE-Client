import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    FaTachometerAlt,
    FaUser,
    FaEdit,
    FaEye,
    FaClipboardList,
    FaUsers,
} from 'react-icons/fa';

const adminMenu = [
    { name: 'Dashboard', icon: FaTachometerAlt, path: '/admin/dashboard' },
    { name: 'My Account', icon: FaUser, path: '/admin/account' },
    { name: 'Edit Profile', icon: FaEdit, path: '/admin/edit-profile' },
    { name: 'View Profile', icon: FaEye, path: '/admin/view-profile' },
    { name: 'Ad Management', icon: FaClipboardList, path: '/admin/ad-management' },
    { name: 'User Management', icon: FaUsers, path: '/admin/user-management' },
];

export default function AdminSidebar() {
    const location = useLocation();

    return (
        <aside className="fixed top-16 left-0 bottom-0 w-64 bg-white shadow-md overflow-y-auto z-20">
            <nav className="mt-4">
                <ul>
                    {adminMenu.map((item) => (
                        <li
                            key={item.name}
                            className={`px-4 py-2 hover:bg-gray-100 ${
                                location.pathname === item.path ? 'bg-gray-200' : ''
                            }`}
                        >
                            <Link
                                to={item.path}
                                className="flex items-center space-x-3 text-gray-700"
                            >
                                <item.icon className="w-5 h-5" />
                                <span>{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
