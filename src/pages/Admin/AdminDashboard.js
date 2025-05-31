import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import Header from '../../components/Heder';
import {
    FaClipboardList,
    FaUsers,
    FaCheckCircle,
    FaClock,
} from 'react-icons/fa';
import axios from 'axios';
import userImage from '../../assets/images/user.png'; 

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalAds: 0,
        totalUsers: 0,
        approvedAds: 0,
        pendingAds: 0,
    });
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Token is missing');
                    return;
                }

                const response = await axios.get('http://localhost:3000/api/accommodation/admin/dashboard/stats', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setStats({
                    totalAds: response.data.totalAds,
                    approvedAds: response.data.approvedAds,
                    pendingAds: response.data.pendingAds,
                    totalUsers: response.data.totalUsers,
                });
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
            }
        };

        fetchStats();
    }, []);

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


    return (
        <>
            <Header />

            <div className="flex">
                <AdminSidebar />

                <main className="flex-1 ml-64 pt-24 bg-gray-100 p-8 min-h-screen">
                    {/* Stats row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {[
                            { icon: FaClipboardList, label: 'Total Ads', value: stats.totalAds },
                            { icon: FaUsers,        label: 'Total Users', value: stats.totalUsers },
                            { icon: FaCheckCircle,  label: 'Approved Ads', value: stats.approvedAds },
                            { icon: FaClock,        label: 'Pending Ads',  value: stats.pendingAds },
                        ].map(({ icon: Icon, label, value }) => (
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
                        {users.map(user => (
                        <div className="text-center" key={user.id}>
                            <img
                                src={userImage}
                                alt="avatar"
                                className="mx-auto w-20 h-20 rounded-full mb-4"
                            />
                            <h4 className="text-xl font-medium">{user.name}</h4>
                            <p className="text-gray-500">{user.email}</p>
                            <p className="text-gray-500">{user.address}</p>
                            <p className="text-gray-500">{user.nic}</p>
                        </div>
                         ))}
                    </div>
                </main>
            </div>
        </>
    );
}
