import React from 'react';

import BoatList from './BoatList';
import UserList from './UserList';

const AdminDashboard = () => {

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <BoatList />
      <UserList />
    </div>
  );
};

export default AdminDashboard;
