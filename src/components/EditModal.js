import React, { useState, useEffect } from 'react';

export default function EditModal({ isOpen, onClose, user, onSave }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        nic: '',
    });
    const [updatedUser, setUpdatedUser] = useState(user || {});

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                address: user.address || '',
                nic: user.nic || '',
            });
        }
        setUpdatedUser(user);
    }, [user, isOpen]);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission (Save)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!updatedUser.uId) {
            console.error("User ID is missing!");
            return;
        }
        if (!updatedUser.phone) {
            console.error("Phone number is required!");
            return; 
        }

        const updatedData = {
                ...updatedUser,
                ...formData, 
            };

        onSave(updatedData); 
    };

    // Close modal
    const handleClose = () => {
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96">
                <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">User Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 w-full border rounded px-2 py-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 w-full border rounded px-2 py-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="mt-1 w-full border rounded px-2 py-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="mt-1 w-full border rounded px-2 py-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">NIC</label>
                        <input
                            type="text"
                            name="nic"
                            value={formData.nic}
                            onChange={handleChange}
                            className="mt-1 w-full border rounded px-2 py-1"
                            required
                        />
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2 bg-gray-400 text-white rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
