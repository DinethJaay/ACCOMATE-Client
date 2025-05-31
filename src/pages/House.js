import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';  // Import PropertyCard component

export default function House() {
  const [accommodations, setAccommodations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const category = 'House'; 

  useEffect(() => {
    
    const fetchProperties = async () => {
    setIsLoading(true);
      try {
        const token = localStorage.getItem('token');

                if (!token) {
                    console.error('Token is missing');
                    return;
                }
            
                const response = await axios.get('http://localhost:3000/api/accommodation/filtered-accommodations', {
                    headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    params: {
                        category: category , 
                    }
                });
                const approvedAds = response.data.accommodations.filter(ad => ad.status === 'approved');
                console.log('Fetched accommodations:', approvedAds);
                setAccommodations(approvedAds);
      } catch (error) {
        console.error('Error fetching house properties:', error);
        setIsLoading(false);
      }
    };  

    fetchProperties();
  }, [category]);

    

    return (
        <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 mt-20">Houses for Rent</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {accommodations.length > 0 ? (
                accommodations.map((ad) => (
                                    <PropertyCard key={ad.id} ad={ad} />
                                ))
                            ) : (
                                <p>No Houses available at the moment.</p>
                            )}
        </div>
        </div>
    );
}
