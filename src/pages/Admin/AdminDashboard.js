import React from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import Header from '../../components/Heder';
import {
    FaClipboardList,
    FaUsers,
    FaCheckCircle,
    FaClock,
} from 'react-icons/fa';

export default function AdminDashboard() {
    const stats = [
        { icon: FaClipboardList, label: 'Total Ads', value: 100 },
        { icon: FaUsers,        label: 'Total Users', value: 100 },
        { icon: FaCheckCircle,  label: 'Approved Ads', value: 40  },
        { icon: FaClock,        label: 'Pending Ads',  value: 40  },
    ];

    // (In real life you’d fetch these from your API)
    const profile = {
        name: 'Rayan Cooray',
        rank: 'A (0)',
        email: 'dinethjayanga37@gmail.com',
        avatarUrl: '/path/to/avatar.jpg',
    };

    return (
        <>
            <Header />

            <div className="flex">
                <AdminSidebar />

                <main className="flex-1 ml-64 pt-24 bg-gray-100 p-8 min-h-screen">
                    {/* Stats row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map(({ icon: Icon, label, value }) => (
                            <div
                                key={label}
                                className="bg-white p-6 rounded-lg shadow flex items-center"
                            >
                                <Icon className="w-8 h-8 text-indigo-500" />
                                <div className="ml-auto text-right">
                                    <p className="text-2xl font-bold">{value}</p>
                                    <p className="text-gray-500">{label}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Profile card */}
                    <div className="max-w-lg bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-4">Profile</h3>
                        <div className="text-center">
                            <img
                                src={profile.avatarUrl}
                                alt="avatar"
                                className="mx-auto w-20 h-20 rounded-full mb-4"
                            />
                            <h4 className="text-xl font-medium">{profile.name}</h4>
                            <p className="text-gray-500">{profile.rank}</p>
                            <p className="text-gray-500">{profile.email}</p>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
