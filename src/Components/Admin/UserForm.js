import React, { useState } from 'react';
import axios from 'axios';

const UserForm = ({ token, user, onSave }) => {
  const [username, setUsername] = useState(user ? user.username : '');
  const [email, setEmail] = useState(user ? user.email : '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { username, email };
    if (user) {
      await axios.put(`http://localhost:3001/users/${user.id}`, userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } else {
      await axios.post('http://localhost:3001/users', userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <button type="submit">Save</button>
    </form>
  );
};

export default UserForm;
