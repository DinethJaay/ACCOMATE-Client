import React, { useState } from "react";
import { HeartIcon, StarIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

// Dummy data for accommodation
const adDetail = {
    title: 'Sharing Rooms Annex for Rent in Borella for Girls',
    price: 12500,
    category: 'Room',
    location: 'Wijesinghe Mw, Galle 08',
    description: 'Shared rooms for rent. Attached bathroom, kitchen, and study room. Monthly rental price includes water and electricity. Suitable for students and workers.',
    imageUrl: 'https://via.placeholder.com/500',
    contact: 'Mr. Arjuna - 0706 618 135',
    reviews: [
        { username: 'Jenny Deka', rating: 5, comment: 'Great place, friendly environment.' },
        { username: 'John Doe', rating: 4, comment: 'Nice place but can be improved on facilities.' },
        { username: 'Anna Smith', rating: 4, comment: 'Good place, clean and peaceful.' }
    ]
};

export default function AccommodationListing() {
    const [activeTab, setActiveTab] = useState("description");

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {/* Navigation Bar */}
            <nav className="bg-blue-950 text-white p-4 fixed w-full top-0 left-0 z-10 shadow-md">
                <div className="flex justify-between items-center max-w-7xl mx-auto">
                    <Link to="/" className="text-xl font-bold">Accomate</Link>
                    <div className="space-x-4">
                        <Link to="/" className="text-white hover:text-yellow-400">Home</Link>
                        <Link to="/search" className="text-white hover:text-yellow-400">Search</Link>
                    </div>
                </div>
            </nav>

            <main className="flex-grow mt-16 pt-4 pb-8 px-4">
                <div className="container mx-auto">
                    {/* Section Title */}
                    <div className="mb-4 ml-2">
                        <h2 className="text-lg text-gray-700 font-medium">Section 11</h2>
                    </div>

                    {/* Listing Card */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        {/* Image Gallery */}
                        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-1 p-4">
                            <div className="col-span-2">
                                <img
                                    src={adDetail.imageUrl}
                                    alt={adDetail.title}
                                    className="w-full h-64 object-cover rounded-lg"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-1">
                                {[1, 2, 3, 4].map((index) => (
                                    <img
                                        key={index}
                                        src="/api/placeholder/200/150"
                                        alt={`Room thumbnail ${index}`}
                                        className="w-full h-32 object-cover rounded-lg"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Listing Header */}
                        <div className="flex justify-between items-start px-6 py-3 border-b">
                            <div>
                                <div className="flex items-center mb-1">
                                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">Borella</span>
                                </div>
                                <h1 className="text-xl font-bold text-gray-800">{adDetail.title}</h1>
                                <div className="flex items-center text-sm text-gray-500 mt-1">
                                    <span>Posted: February 15, 2024</span>
                                    <span className="mx-4">•</span>
                                    <span>Views: 740</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{adDetail.location}</p>
                            </div>
                            <button className="text-red-500 p-2">
                                <HeartIcon className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Price Section */}
                        <div className="px-6 py-3 bg-yellow-50">
                            <h3 className="text-xl font-bold text-yellow-600">Rs 12,500 / Month</h3>
                        </div>

                        {/* Listing Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                            <div className="flex flex-col">
                                <span className="text-gray-500 text-sm">Type</span>
                                <span className="font-medium">Rent</span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-gray-500 text-sm">Condition</span>
                                <span className="font-medium">Normal</span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-gray-500 text-sm">No. of rooms</span>
                                <span className="font-medium">1</span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-gray-500 text-sm">No. of bathrooms</span>
                                <span className="font-medium">1</span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-gray-500 text-sm">Bathroom Type</span>
                                <span className="font-medium">Attached Bathroom</span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-gray-500 text-sm">Floor / Upstairs</span>
                                <span className="font-medium">Ground</span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-gray-500 text-sm">Time Period</span>
                                <span className="font-medium">Long Term only</span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-gray-500 text-sm">Monthly Rent Per Room</span>
                                <span className="font-medium">12500</span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-gray-500 text-sm">How many persons can be shared in one room?</span>
                                <span className="font-medium">2-3</span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-gray-500 text-sm">Electricity and Water Bill</span>
                                <span className="font-medium">Excluded from rent</span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-gray-500 text-sm">Deposit</span>
                                <span className="font-medium">1 Month</span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-gray-500 text-sm">Nearest Universities & Schools</span>
                                <span className="font-medium">University of Colombo</span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-gray-500 text-sm">Parking Space</span>
                                <span className="font-medium">Bike Only</span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-gray-500 text-sm">Availability</span>
                                <span className="font-medium">Available now</span>
                            </div>

                            <div className="flex flex-col col-span-1 md:col-span-2">
                                <span className="text-gray-500 text-sm">Property Features</span>
                                <span className="font-medium">Fully Furnished, Attached Bathroom, Separate Single Beds, Separate entrance, Brand new, Home security system</span>
                            </div>
                        </div>

                        {/* Tab Section */}
                        <div className="px-6 py-3 border-t">
                            <div className="flex border-b">
                                <button
                                    className={`px-4 py-2 font-medium ${activeTab === 'description' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                                    onClick={() => setActiveTab('description')}
                                >
                                    Description
                                </button>
                                <button
                                    className={`px-4 py-2 font-medium ${activeTab === 'reviews' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                                    onClick={() => setActiveTab('reviews')}
                                >
                                    Reviews
                                </button>
                            </div>

                            {/* Description Tab Content */}
                            {activeTab === 'description' && (
                                <div className="py-4">
                                    <div className="mb-2">
                                        <span className="text-green-600 font-medium">✓ FACILITIES:</span>
                                    </div>
                                    <ul className="space-y-2 text-gray-700">
                                        <li>- 1 Room Available</li>
                                        <li>- Attached Bathroom</li>
                                        <li>- Single Beds, Bunk Beds, Kitchen, Pantry, Separate Study Room, Separate entrance, Semi Furnished, Third Story House, Pantry is available.</li>
                                        <li>- Water and Electricity bill - Included in monthly rental</li>
                                        <li>- Parking for Bikes Only</li>
                                    </ul>

                                    <div className="mt-4 mb-2">
                                        <span className="text-green-600 font-medium">✓ RENT & DEPOSIT:</span>
                                    </div>
                                    <ul className="space-y-2 text-gray-700">
                                        <li>- Rent - Rs. 12,500</li>
                                        <li>- Key money/advance - for 1 Month</li>
                                    </ul>

                                    <div className="mt-4 mb-2">
                                        <span className="text-green-600 font-medium">✓ LOCATION:</span>
                                    </div>
                                    <ul className="space-y-2 text-gray-700">
                                        <li>- Location Address - Maradana Road, Colombo-08</li>
                                        <li>- Nearest Locations - University of Colombo medical college</li>
                                    </ul>

                                    <div className="mt-4 mb-2">
                                        <span className="text-green-600 font-medium">✓ CONTACT:</span>
                                    </div>
                                    <ul className="space-y-2 text-gray-700">
                                        <li>- Tel: 0742388071 Akisha</li>
                                        <li>- WhatsApp call - 070 345 11 55</li>
                                        <li>- WhatsApp msg - Click the link ↓</li>
                                    </ul>
                                </div>
                            )}

                            {/* Reviews Tab Content */}
                            {activeTab === 'reviews' && (
                                <div className="py-4">
                                    <h3 className="text-lg font-semibold mb-4">Reviews</h3>

                                    {[...Array(3)].map((_, index) => (
                                        <div key={index} className="border-b py-4 last:border-b-0">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                                                    <img src="/api/placeholder/40/40" alt={`reviewer-${index}`} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <div className="font-medium">Amy Duke</div>
                                                    <div className="text-xs text-gray-500">2 days ago</div>
                                                </div>
                                                <div className="ml-auto flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <StarIcon
                                                            key={i}
                                                            className={`h-4 w-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-gray-600 text-sm">
                                                Great place, friendly environment.
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
