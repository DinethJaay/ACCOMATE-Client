// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
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
    { name: 'Dashboard',     icon: FaTachometerAlt, path: '/user/user-dashboard' },
    // { name: 'My Account',    icon: FaUser,           path: '/user/account' },
    { name: 'Edit Profile',  icon: FaEdit,           path: '/user/edit-profile' },
    { name: 'Manage My Ads', icon: FaClipboardList,  path: '/user/my-ads' },
    { name: 'Favourite Ads', icon: FaHeart,          path: '/user/favourite-ads' },
    // { name: 'My Messages',   icon: FaEnvelope,       path: '/messages' },
];

export default function Sidebar() {
    return (
        <aside className="fixed top-16 left-0 bottom-0 w-64 pt-6 bg-white shadow-md overflow-y-auto z-20">
            <nav>
                <ul>
                    {menu.map(({ name, icon: Icon, path }) => (
                        <li key={name}>
                            <NavLink
                                to={path}
                                end
                                className={({ isActive }) =>
                                    `block px-4 py-2 rounded-r flex items-center space-x-3 
                   text-gray-700 hover:bg-gray-100
                   ${isActive ? 'bg-gray-200 font-semibold' : ''}`
                                }
                            >
                                <Icon className="w-5 h-5" />
                                <span>{name}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="absolute bottom-0 w-full p-4">
                <NavLink
                    to="/post-ad"
                    className="block text-center bg-black text-white py-2 rounded hover:bg-gray-800"
                >
                    <FaPlus className="inline-block mr-2" /> Post Ad
                </NavLink>
            </div>
        </aside>
    );
}
