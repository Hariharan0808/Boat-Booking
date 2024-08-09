import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import UserForm from './UserForm';
import './UserList.css'; // Import CSS

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('http://localhost:3001/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    };
    fetchUsers();
  }, [token]);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUsers(users.filter(user => user.id !== id));
  };

  const handleSave = () => {
    setEditingUser(null);
    const fetchUsers = async () => {
      const response = await axios.get('http://localhost:3001/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    };
    fetchUsers();
  };

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      {editingUser ? (
        <UserForm token={token} user={editingUser} onSave={handleSave} />
      ) : (
        <UserForm token={token} onSave={handleSave} />
      )}
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username} - {user.email}
            <button onClick={() => setEditingUser(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
