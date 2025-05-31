import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard'; 
import { Link } from 'react-router-dom';


export default function Room() {
    const [accommodations, setAccommodations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const category = 'Room';

    useEffect(() => {
        const fetchAccommodations = async () => {
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
                console.error('Error fetching accommodations:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAccommodations();
    }, [category]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-8 mt-20">Rooms for Rent</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {accommodations.length > 0 ? (
                    accommodations.map((ad) => (
                        <div key={ad.acc_id}>  
                            <PropertyCard ad={ad} />
                        </div> 
                    ))
                ) : (
                    <p>No annexes available at the moment.</p>
                )}
            </div>
        </div>
    );
}
