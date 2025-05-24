import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  useEffect(() => {
    // Fetch group data by ID
    const fetchGroupData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/all-group/${id}`);
        const data = await res.json();
        setFormData(data);
      } catch (err) {
        console.error('Failed to fetch group data:', err);
      }
    };

    fetchGroupData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      userName: user?.displayName || '',
      userEmail: user?.email || ''
    };

    try {
      const response = await fetch(`http://localhost:5000/all-group/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          title: 'Updated!',
          text: 'Your hobby group has been updated.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        navigate('/my-groups'); // redirect if needed
      } else {
        throw new Error(data.message || 'Update failed');
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update hobby group.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">
            Edit Hobby Group
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" name="groupName" placeholder="Group Name" value={formData.groupName} onChange={handleChange} className="input-field" required />

            <select name="category" value={formData.category} onChange={handleChange} className="input-field" required>
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

            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="input-field col-span-1 md:col-span-2" rows="4" required />

            <input type="text" name="location" placeholder="Meeting Location" value={formData.location} onChange={handleChange} className="input-field" required />

            <input type="number" name="maxMembers" placeholder="Max Members" value={formData.maxMembers} onChange={handleChange} className="input-field" required />

            <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="input-field" required />

            <input type="text" name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} className="input-field col-span-1 md:col-span-2" required />

            <input type="text" value={user?.displayName || ''} readOnly className="input-field bg-gray-100 dark:bg-gray-700 cursor-not-allowed" placeholder="User Name" />

            <input type="email" value={user?.email || ''} readOnly className="input-field bg-gray-100 dark:bg-gray-700 cursor-not-allowed" placeholder="User Email" />

            <button type="submit" className="col-span-1 md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl transition duration-200">
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Edit;
