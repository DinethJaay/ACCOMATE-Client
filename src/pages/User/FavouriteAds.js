import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';

const FavoriteAds = () => {
  const [favoriteAds, setFavoriteAds] = useState([]);

  useEffect(() => {
    const fetchFavoriteAds = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token is missing');
          return;
        }

        const response = await axios.get('http://localhost:3000/api/favorites', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Favorites response:', response.data);
        setFavoriteAds(response.data);
      } catch (error) {
        console.error('Error fetching favorite ads:', error);
      }
    };

    fetchFavoriteAds();
  }, []);

    const removeFavorite = async (acc_id) => {
    try {
          const token = localStorage.getItem('token');

            if (!token) {
            console.error('Token is missing');
            return;
            }

        const response = await axios.delete(`http://localhost:3000/api/favorites/${acc_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                acc_id: acc_id, 
            },
            });

        console.log('Favorite removed:', response.data);
    
      setFavoriteAds(prevAds => prevAds.filter(ad => ad.acc_id !== acc_id));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-10">
      <h1 className="text-3xl font-bold mb-6">Favorite Ads</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {favoriteAds.length > 0 ? (
          favoriteAds.map((ad) => (
            <div key={ad.acc_id} className="bg-white rounded-2xl shadow-md overflow-hidden">
              <img
                src={`http://localhost:3000${ad.image_path || '/img/default-image.jpg'}`}
                alt={ad.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{ad.title}</h2>
                <p className="text-gray-600 mb-2 truncate">{ad.description}</p>
                <p className="text-black-600 font-bold mb-4">Rs.{ad.price}</p>
                <button
                  onClick={() => removeFavorite(ad.acc_id)}
                  className="flex items-center gap-2 text-red-500 hover:text-red-600 font-medium"
                >
                  <FaHeart /> Remove Favorite
                </button>

              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No favorite ads found.</p>
        )}
      </div>
    </div>
  );
};

export default FavoriteAds;
