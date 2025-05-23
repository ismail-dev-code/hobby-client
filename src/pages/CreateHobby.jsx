import React, { useContext, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';

// Assume you have AuthContext already set up


const CreateHobby = () => {
    const { user } = useContext(AuthContext); // Destructure user from context
    const [formData, setFormData] = useState({
        groupName: '',
        category: '',
        description: '',
        location: '',
        maxMembers: '',
        endDate: '',
        imageUrl: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const hobbyData = {
            ...formData,
            userName: user?.displayName || '',
            userEmail: user?.email || ''
        };
        console.log('Submitted Hobby Data:', hobbyData);
        // You can send hobbyData to your server or Firebase here
    };

    return (
        <div className="max-w-xl mx-auto p-4 shadow-lg rounded bg-white">
            <h2 className="text-xl font-bold mb-4">Create Hobby Group</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="groupName"
                    placeholder="Group Name"
                    value={formData.groupName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />

                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                >
                    <option value="">Select Hobby Category</option>
                    <option>Drawing & Painting</option>
                    <option>Photography</option>
                    <option>Video Gaming</option>
                    <option>Fishing</option>
                    <option>Running</option>
                    <option>Cooking</option>
                    <option>Reading</option>
                    <option>Writing</option>
                    {/* Add more categories if needed */}
                </select>

                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />

                <input
                    type="text"
                    name="location"
                    placeholder="Meeting Location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />

                <input
                    type="number"
                    name="maxMembers"
                    placeholder="Max Members"
                    value={formData.maxMembers}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />

                <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />

                <input
                    type="text"
                    name="imageUrl"
                    placeholder="Image URL"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />

                <input
                    type="text"
                    value={user?.displayName || ''}
                    readOnly
                    className="w-full p-2 border rounded bg-gray-100"
                    placeholder="User Name"
                />

                <input
                    type="email"
                    value={user?.email || ''}
                    readOnly
                    className="w-full p-2 border rounded bg-gray-100"
                    placeholder="User Email"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                    Create
                </button>
            </form>
        </div>
    );
};

export default CreateHobby;
