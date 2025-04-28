import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    FaTachometerAlt,
    FaUser,
    FaEdit,
    FaEye,
    FaClipboardList,
    FaHeart,
    FaEnvelope,
    FaPlus,
} from 'react-icons/fa';

const menu = [
    { name: 'Dashboard', icon: FaTachometerAlt, path: '/user-dashboard' },
    { name: 'My Account', icon: FaUser, path: '/account' },
    { name: 'Edit Profile', icon: FaEdit, path: '/edit-profile' },
    { name: 'View Profile', icon: FaEye, path: '/view-profile' },
    { name: 'Manage My Ads', icon: FaClipboardList, path: '/manage-ads' },
    { name: 'Favourite Ads', icon: FaHeart, path: '/favourites' },
    { name: 'My Messages', icon: FaEnvelope, path: '/messages' },
];

export default function Sidebar() {
    const location = useLocation();

    return (
        <aside className="fixed top-16 left-0 bottom-0 w-64 bg-white shadow-md overflow-y-auto z-20">
            <nav className="mt-4">
                <ul>
                    {menu.map((item) => (
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

            <div className="absolute bottom-0 w-full p-4">
                <Link
                    to="/post-ad"
                    className="w-full block text-center bg-black text-white py-2 rounded"
                >
                    <FaPlus className="inline-block mr-2" /> Post Ad
                </Link>
            </div>
        </aside>
    );
}
