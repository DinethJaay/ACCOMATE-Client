import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function AccommodationListing() {
    const { id } = useParams();
    console.log('Accommodation ID:', id);

    const [accommodation, setAccommodation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState('');
    const [rating, setRating] = useState(0);
    const [user, setUser] = useState();

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/accommodation/${id}/reviews`);
            setReviews(response.data.reviews || []);
            console.log('Reviews:', response.data.reviews || []);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };


    useEffect(() => {
        if (!id) {
            console.error('Accommodation ID is missing!');
            return;
        }

        const fetchAccommodationDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:3000/api/accommodation/accommodation/${id}`); 
                console.log('Full accommodation response:', response.data);
                setAccommodation(response.data.accommodation);
                console.log('Accommodation:', response.data.accommodation);
            } catch (error) {
                console.error('Error fetching accommodation details:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3000/api/auth/dashboard', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });


                const userData = response.data;

                
                setUser({
                    name: userData.name || '',
                    email: userData.email || '',
                    contactNumber: userData.contactNumber || '',
                    address: userData.address || '',
                    nic: userData.nic || '',
                });
                console.log('User Data:', userData);

            } catch (err) {
                console.error('Failed to fetch user data:', err);
            }
        };

        fetchUserData();
        fetchAccommodationDetails();
        fetchReviews();
    }, [id]);

    const handleAddReview = async () => {
        if (!newReview || rating === 0) {
            alert('Please add a rating and a review text.');
            return;
        }

        const token = localStorage.getItem('token');

        if (!token) {
            alert('You must be logged in to add a review.');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:3000/api/accommodation/${id}/add-review`, {
                rating,
                reviewText: newReview
            },
            {
                headers: {
                Authorization: `Bearer ${token}`, // ← must pass token
                },
            }
        
        );

            alert('Review added successfully');
            fetchReviews();
        } catch (error) {
            console.error('Error adding review:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!accommodation) {
        return <div>No accommodation found</div>;
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <main className="flex-grow mt-16 pt-4 pb-8 px-4">
                <div className="container mx-auto">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-1 p-4">
                        <div className="col-span-2">
                            <img
                                src={`http://localhost:3000${accommodation.images?.[0] || '/default-image.jpg'}`}
                                alt={accommodation.title || 'Accommodation Image'}
                                className="w-full h-64 object-cover rounded-lg"
                            />
                        </div>

                        {accommodation.images?.length > 1 && (
                            <div className="grid grid-cols-2 gap-1 mt-2 col-span-2">
                                {accommodation.images.slice(1).map((imagePath, index) => (
                                    <img
                                        key={index}
                                        src={`http://localhost:3000${imagePath}`}
                                        alt={`Room thumbnail ${index + 1}`}
                                        className="w-full h-32 object-cover rounded-lg"
                                    />
                                ))}
                            </div>
                        )}



                        </div>

                        <div className="flex justify-between items-start px-6 py-3 border-b">
                            <div>
                                <div className="flex items-center mb-1">
                                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
                                        {accommodation.city || 'N/A'} 
                                    </span>
                                </div>
                                <h1 className="text-xl font-bold text-gray-800">{accommodation.title || 'No Title'}</h1>
                                <h2 className="text-lg font-bold text-gray-500">{accommodation.description || 'No Title'}</h2>
                                <div className="flex items-center text-sm text-gray-500 mt-1">
                                    <span>Posted: {accommodation.created_at || 'N/A'}</span>
                                    <span className="mx-4">•</span>
                                    <span>Views: {accommodation.property?.view|| 0}</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{accommodation.address || 'No Address'}</p>
                            </div>
                        </div>

                        <div className="px-6 py-3 bg-yellow-50">
                            <h3 className="text-xl font-bold text-yellow-600">
                                Rs.{accommodation.price || 'N/A'} / {accommodation.pricing_type || 'Unknown'}
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                            <div className="flex flex-col">
                                <span className="text-gray-500 text-sm">Pricing Type</span>
                                <span className="font-medium">{accommodation.pricing_type || 'Unknown'}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-500 text-sm">Advertisment status</span>
                                <span className="font-medium">{accommodation.status || 'Unknown'}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-500 text-sm">Category</span>
                                <span className="font-medium">{accommodation.category || 'Unknown'}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-500 text-sm">View</span>
                                <span className="font-medium">{accommodation.property?.view || 'Unknown'}/5</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-500 text-sm">Floors</span>
                                <span className="font-medium">{accommodation.property?.floors|| 'Unknown'}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-500 text-sm">Living Space</span>
                                <span className="font-medium">{accommodation.property?.sqft_living  || 'Unknown'} sqft</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-500 text-sm">Square Feet Above</span>
                                <span className="font-medium">{accommodation.property?.sqft_above || 'Unknown'} sqft</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-500 text-sm">Basement Size</span>
                                <span className="font-medium">{accommodation.property?.sqft_basement || 'Unknown'} sqft</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-500 text-sm">Year Built</span>
                                <span className="font-medium">{accommodation.property?.yr_built || 'Unknown'}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-500 text-sm">Year Renovated</span>
                                <span className="font-medium">{accommodation.property?.yr_renovated || 'Unknown'}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-500 text-sm">Bathrooms</span>
                                <span className="font-medium">{accommodation.property?.bathrooms || 'Unknown'}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-500 text-sm">Bedrooms</span>
                                <span className="font-medium">{accommodation.property?.bedrooms || 'Unknown'}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-500 text-sm">Condition</span>
                                <span className="font-medium">{accommodation.property?.condition|| 'N/A'}/5</span>
                            </div>
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                            <h2 className="text-lg font-semibold">Accessibility Features</h2>
                            <div className="flex flex-col">     
                                <span className="text-gray-500 text-sm">Ground floor</span>
                                <span className="font-medium">{accommodation.accessibility_preferences?.ground_floor === 1 ? 'Available' : 'No'}</span>
                            </div>
                            <div className="flex flex-col">     
                                <span className="text-gray-500 text-sm">No step</span>
                                <span className="font-medium">{accommodation.accessibility_preferences?.nosteps === 1 ? 'Available' : 'No'}</span>
                            </div>
                            <div className="flex flex-col">     
                                <span className="text-gray-500 text-sm">Grab bars</span>
                                <span className="font-medium">{accommodation.accessibility_preferences?.grabbars === 1 ? 'Available' : 'No'}</span>
                            </div>
                            <div className="flex flex-col">     
                                <span className="text-gray-500 text-sm">Wheelchair accessible</span>
                                <span className="font-medium">{accommodation.accessibility_preferences?.wheelchair === 1 ? 'Available' : 'No'}</span>
                            </div>   
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                            <h2 className="text-lg font-semibold">Property Features</h2>
                            <div className="flex flex-col">     
                                <span className="text-gray-500 text-sm">Single Beds</span>
                                <span className="font-medium">{accommodation.features?.[0]?.singlebeds === 1 ? 'Available' : 'No'}</span>
                            </div>
                            <div className="flex flex-col">     
                                <span className="text-gray-500 text-sm">Pantry</span>
                                <span className="font-medium">{accommodation.features?.[0]?.pantry === 1 ? 'Available' : 'No'}</span>
                            </div>
                            <div className="flex flex-col">     
                                <span className="text-gray-500 text-sm">Living Room</span>
                                <span className="font-medium">{accommodation.features?.[0]?.livingroom === 1 ? 'Available' : 'No'}</span>
                            </div>
                            <div className="flex flex-col">     
                                <span className="text-gray-500 text-sm">Separate entrance</span>
                                <span className="font-medium">{accommodation.features?.[0]?.seperateentrance === 1 ? 'Available' : 'No'}</span>
                            </div>   
                            <div className="flex flex-col">     
                                <span className="text-gray-500 text-sm">Brand New</span>
                                <span className="font-medium">{accommodation.features?.[0]?.brandnew === 1 ? 'Available' : 'No'}</span>
                            </div>   
                            <div className="flex flex-col">     
                                <span className="text-gray-500 text-sm">Double Beds</span>
                                <span className="font-medium">{accommodation.features?.[0]?.doublebeds === 1 ? 'Available' : 'No'}</span>
                            </div>  
                            <div className="flex flex-col">     
                                <span className="text-gray-500 text-sm">Kitchen</span>
                                <span className="font-medium">{accommodation.features?.[0]?.kitchen === 1 ? 'Available' : 'No'}</span>
                            </div>  
                            <div className="flex flex-col">     
                                <span className="text-gray-500 text-sm">CCTV Camera</span>
                                <span className="font-medium">{accommodation.features?.[0]?.cctv === 1 ? 'Available' : 'No'}</span>
                            </div> 
                            <div className="flex flex-col">     
                                <span className="text-gray-500 text-sm">Furnished</span>
                                <span className="font-medium">{accommodation.features?.[0]?.furnished === 1 ? 'Available' : 'No'}</span>
                            </div>
                        </div>


                        <div className="px-6 py-3 border-t">
                        {user ? (
                            <>
                                <h2 className="text-md text-gray-600">{user.name}</h2>
                                <p className="text-sm text-gray-600">{user.email}</p>
                                <p className="text-sm text-gray-600">{user.contactNumber}</p>
                            </>
                        ) : (
                            <p className="text-sm text-gray-600">No contact information available</p>
                        )}
                        </div>

                        {/* Reviews Section */}
                        <div className="px-6 py-3">
                            <h2 className="text-lg font-semibold">Reviews</h2>
                            {reviews.length > 0 ? (
                                <div className="mt-4">
                                    {reviews.map((review) => (
                                        <div key={review.review_id} className="mb-4">
                                            <h2 className="font-large">{review.user_name  || 'Anonymous'}</h2>
                                            <p className="text-md text-gray-600">
                                                {review.review}
                                                <span><p className="text-sm text-gray-400">{review.rating} stars</p></span>
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No reviews yet. Be the first to review!</p>
                            )}
                        </div>

                        {/* Add Review Section */}
                        <div className="px-6 py-3 border-t">
                            <h2 className="text-lg font-semibold">Add a Review</h2>
                            <div className="mt-4">
                                <textarea
                                    value={newReview}
                                    onChange={(e) => setNewReview(e.target.value)}
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Write your review here"
                                />
                                <div className="mt-2">
                                    <label className="mr-2">Rating:</label>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            onClick={() => setRating(star)}
                                            className={`cursor-pointer ${rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                                <button
                                    onClick={handleAddReview}
                                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md"
                                >
                                    Submit Review
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
