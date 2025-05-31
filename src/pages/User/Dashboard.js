import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Heder';
import {
    FaClipboardCheck,
    FaClipboardList,
    FaBan,
    FaStar,
} from 'react-icons/fa';
import userImage from "../../assets/images/user.png"; // Ensure the correct image path

// Importing chart.js modules for the chart
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

export default function UserDashboard() {
    const [userData, setUserData] = useState(null);
    const [adsStats, setAdsStats] = useState({
        totalAds: 0,
        approvedAds: 0,
        pendingAds: 0,
        completedAds: 0,
    });

    // Fetch user data and stats when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');

                // Fetch user data (Profile info)
                const userResponse = await axios.get('http://localhost:3000/api/auth/dashboard', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserData(userResponse.data);

                // Fetch statistics for ads (Total Ads, Approved, Pending, Completed)
                const statsResponse = await axios.get('http://localhost:3000/api/accommodation/user/dashboard/stats', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAdsStats(statsResponse.data);
            } catch (err) {
                console.error('Failed to fetch dashboard data:', err);
            }
        };

        fetchData();
    }, []);

    // Return loading state while data is being fetched
    if (!userData) {
        return (
            <div className="p-8">
                <Header />
                <div className="flex">
                    <Sidebar />
                    <main className="ml-64 p-8">Loading dashboard...</main>
                </div>
            </div>
        );
    }

    // Check for incomplete user data
    if (!userData.name || !userData.email) {
        return <div className="p-8">User data is incomplete</div>;
    }

    // Stats to be displayed in summary cards
    const stats = [
        { icon: FaClipboardList, label: 'Total Ads', value: adsStats.totalAds },
        { icon: FaStar, label: 'Total Approved Ads', value: adsStats.approvedAds },
        { icon: FaBan, label: 'Pending Ads', value: adsStats.pendingAds },
        { icon: FaBan, label: 'Rejected Ads', value: adsStats.rejectedAds },
    ];

    // Data for the line chart
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Ads Statistics',
                data: [
                    adsStats.totalAds, 
                    adsStats.approvedAds, 
                    adsStats.pendingAds, 
                    adsStats.rejectedAds
                ], // These values can be dynamic based on fetched stats
                fill: false,
                borderColor: '#6366F1',
                tension: 0.3,
                pointBackgroundColor: '#6366F1',
            },
        ],
    };

    // Chart options for better customization
    const options = {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } },
    };

    return (
        <>
            <Header />
            <div className="flex">
                <Sidebar />
                <main className="flex-1 ml-64 pt-24 bg-gray-100 p-8 min-h-screen">
                    {/* Top summary cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map(({ icon: Icon, label, value }) => (
                            <div key={label} className="bg-white p-6 rounded-lg shadow flex items-center">
                                <Icon className="w-8 h-8 text-indigo-500" />
                                <div className="ml-auto text-right">
                                    <p className="text-2xl font-bold">{value}</p>
                                    <p className="text-gray-500">{label}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow text-center">
                            <img
                                src={userImage} // Make sure the path is correct
                                alt="avatar"
                                className="mx-auto w-20 h-20 rounded-full"
                            />
                            <h3 className="mt-4 text-xl font-semibold">{userData.name}</h3>
                            <p className="text-gray-500">A (0)</p>
                            <p className="text-gray-500">{userData.email}</p>
                            <p className="text-gray-500">{userData.address}</p>
                            <p className="text-gray-500">{userData.nic}</p>
                        </div>

                        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-medium mb-4">Ads Statistics</h3>
                            <Line data={data} options={options} />
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
