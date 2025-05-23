import React, { useContext, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';

const CreateHobby = () => {
  const { user } = useContext(AuthContext);

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

    Swal.fire({
      title: 'Hobby Created!',
      text: 'Your hobby group has been successfully created.',
      icon: 'success',
      confirmButtonText: 'OK',
    });

 
    setFormData({
      groupName: '',
      category: '',
      description: '',
      location: '',
      maxMembers: '',
      endDate: '',
      imageUrl: ''
    });
  };

  return (
    <>
    <Navbar></Navbar>
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 md:p-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">
          Create Hobby Group
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="groupName"
            placeholder="Group Name"
            value={formData.groupName}
            onChange={handleChange}
            className="input-field"
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="input-field"
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
          </select>

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="input-field col-span-1 md:col-span-2"
            rows="4"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Meeting Location"
            value={formData.location}
            onChange={handleChange}
            className="input-field"
            required
          />

          <input
            type="number"
            name="maxMembers"
            placeholder="Max Members"
            value={formData.maxMembers}
            onChange={handleChange}
            className="input-field"
            required
          />

          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="input-field"
            required
          />

          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={formData.imageUrl}
            onChange={handleChange}
            className="input-field col-span-1 md:col-span-2"
            required
          />

          <input
            type="text"
            value={user?.displayName || ''}
            readOnly
            className="input-field bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
            placeholder="User Name"
          />

          <input
            type="email"
            value={user?.email || ''}
            readOnly
            className="input-field bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
            placeholder="User Email"
          />

          <button
            type="submit"
            className="col-span-1 md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl transition duration-200"
          >
            Create
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default CreateHobby;
