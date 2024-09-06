import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '' });
  const [showPopup, setShowPopup] = useState(false);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load users');
      setLoading(false);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', newUser);
      setUsers([...users, response.data]);
      setNewUser({ name: '', email: '', phone: '' });
      setShowPopup(false);
    } catch (err) {
      setError('Error creating user');
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${editUser.id}`, editUser);
      setUsers(users.map(user => (user.id === editUser.id ? response.data : user)));
      setEditUser(null);
      setShowPopup(false);
    } catch (err) {
      setError('Error updating user');
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    } catch (err) {
      setError('Error deleting user');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (user) => {
    setEditUser(user);
    setShowPopup(true);
  };

  const handleExportClick = () => {
    alert('Export to Excel is not available yet.');
  };

  return (
    <div className="container">
      <div className="table-title">
        <div className="row">
          <div className="col-sm-5">
            <h2>User <b>Management</b></h2>
          </div>
          <div className="col-sm-7">
            <button className="btn btn-secondary" onClick={() => setShowPopup(true)}>
              <i className="bi bi-person-plus"></i> <span>Add New User</span>
            </button>
            <button className="btn btn-secondary" onClick={handleExportClick}>
              <i className="bi bi-file-earmark-spreadsheet"></i> <span>Export to Excel</span>
            </button>
          </div>
        </div>
      </div>

      {loading && <div className="loading-spinner"></div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <div className="btn-group" role="group" aria-label="User Actions">
                    <button className="btn btn-success" onClick={() => handleEditClick(user)}>
                      <i className="bi bi-pencil"></i> {/* Bootstrap icon for edit */}
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDeleteUser(user.id)}>
                      <i className="bi bi-trash"></i> {/* Bootstrap icon for delete */}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create/Update User Popup */}
      {(showPopup || editUser) && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>{editUser ? 'Edit User' : 'Create User'}</h2>
            <form onSubmit={editUser ? handleUpdateUser : handleCreateUser}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={editUser ? editUser.name : newUser.name}
                  onChange={(e) => editUser ? setEditUser({ ...editUser, name: e.target.value }) : setNewUser({ ...newUser, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={editUser ? editUser.email : newUser.email}
                  onChange={(e) => editUser ? setEditUser({ ...editUser, email: e.target.value }) : setNewUser({ ...newUser, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone"
                  value={editUser ? editUser.phone : newUser.phone}
                  onChange={(e) => editUser ? setEditUser({ ...editUser, phone: e.target.value }) : setNewUser({ ...newUser, phone: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-person-check"></i> {/* Bootstrap icon for create/update */}
                {editUser ? 'Update User' : 'Create User'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => { setShowPopup(false); setEditUser(null); }}>
                <i className="bi bi-x-circle"></i> {/* Bootstrap icon for close */}
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
