import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import Profile from './Components/Profile';
import BoatDetail from './Components/BoatDetail/BoatDetail';
import Payment from './Components/Payment/Payment'; // Import the Payment component
import Bookings from './Components/Bookings/Bookings';
import AdminDashboard from './Components/Admin/AdminDashboard';
import PrivateRoute from './Components/PrivateRoute';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/boat/:id" element={<BoatDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          } 
        />
      </Routes>
    </div>
  );
};

export default App;
