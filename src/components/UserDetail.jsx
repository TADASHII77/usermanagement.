import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserDetail = () => {
  const { id } = useParams(); // Gets the user id from URL params
  const navigate = useNavigate(); // For navigation
  const [user, setUser] = useState(null); // State to store user data
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling
  
  // Fetch user data when the component is mounted
  useEffect(() => {
    fetchUser();
  }, [id]);

  // Function to fetch user data from the API
  const fetchUser = async () => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUser(response.data); // Set the fetched user data
      setLoading(false); // Disable loading spinner
    } catch (err) {
      setError('Failed to load user'); // Handle any error
      setLoading(false); // Disable loading spinner
    }
  };

  // Function to handle user update
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, user);
      navigate('/'); // Navigate to the home page after updating
    } catch (err) {
      console.error('Error updating user:', err); // Log any error
    }
  };

  // Function to handle changes in the input fields
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h2 className="my-4">Edit User</h2>
      {loading && <p>Loading user...</p>} {/* Display while loading */}
      {error && <p>{error}</p>} {/* Display error if any */}

      {/* Show form if user data is available */}
      {user && (
        <form onSubmit={handleUpdateUser}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="name"
              value={user.name} // Bind user name to the input field
              onChange={handleChange} // Handle changes in input
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              name="email"
              value={user.email} // Bind user email
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="phone"
              value={user.phone} // Bind user phone
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Update User</button>
        </form>
      )}
    </div>
  );
};

export default UserDetail;
