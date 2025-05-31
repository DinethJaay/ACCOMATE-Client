import React from 'react';
import { Link } from 'react-router-dom';

export default function PropertyCard({ ad }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <img src={`http://localhost:3000${ad.images?.[0] || '/img/default-image.jpg'}`} alt={ad.title} className="w-full h-40 object-cover rounded-t-lg" />
      <h3 className="text-lg font-semibold">{ad.title}</h3>
      <p className="text-sm text-gray-600">{ad.description}</p>
      <p className="text-xl text-gray-800 mt-2">Rs {ad.price}</p>
      <p className="text-sm text-gray-500">{ad.city}</p>
      <Link to={`/accommodation/${ad.acc_id}`} className="text-blue-600 hover:text-blue-800">
        View Details
      </Link>
    </div>
  );
}
