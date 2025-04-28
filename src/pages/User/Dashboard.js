import React from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Heder';
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
import {
    FaClipboardCheck,
    FaClipboardList,
    FaBan,
    FaStar,
} from 'react-icons/fa';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

export default function UserDashboard() {
    const stats = [
        { icon: FaClipboardCheck, label: 'Ads Completed', value: 100 },
        { icon: FaClipboardList, label: 'Total Listings', value: 100 },
        { icon: FaBan, label: 'Inactive Ads', value: 100 },
        { icon: FaStar, label: 'Total Ratings', value: 100 },
    ];

    const data = {
        labels: ['2024-08', '2024-09', '2024-10', '2024-11', '2024-12', '2025-01'],
        datasets: [
            {
                label: 'Ads Timeline',
                data: [0, 1, 0.5, 0.7, 0.9, 1.0],
                fill: false,
                borderColor: '#6366F1',
                tension: 0.3,
                pointBackgroundColor: '#6366F1',
            },
        ],
    };

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

                    {/* Profile + Chart */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Profile card */}
                        <div className="bg-white p-6 rounded-lg shadow text-center">
                            <img
                                src="/path/to/avatar.jpg"
                                alt="avatar"
                                className="mx-auto w-20 h-20 rounded-full"
                            />
                            <h3 className="mt-4 text-xl font-semibold">Dineth Jayanga</h3>
                            <p className="text-gray-500">A (0)</p>
                            <p className="text-gray-500">dinethjayanga37@gmail.com</p>
                        </div>

                        {/* Ads statistics chart */}
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
