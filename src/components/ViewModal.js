import React from 'react';

const ViewModal = ({ isOpen, onClose, user }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-1/3">
                <h2 className="text-2xl font-semibold mb-4">User Details</h2>

                <div className="mb-4">
                    <strong>Name:</strong> <p>{user.name}</p>
                </div>
                <div className="mb-4">
                    <strong>Email:</strong> <p>{user.email}</p>
                </div>
                <div className="mb-4">
                    <strong>Address:</strong> <p>{user.address}</p>
                </div>
                <div className="mb-4">
                    <strong>NIC:</strong> <p>{user.nic}</p>
                </div>

                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-600 text-white rounded"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewModal;
