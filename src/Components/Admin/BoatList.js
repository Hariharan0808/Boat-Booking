import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import BoatForm from './BoatForm';
import './BoatList.css';

const BoatList = () => {
  const [boats, setBoats] = useState([]);
  const [editingBoat, setEditingBoat] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    const fetchBoats = async () => {
      const response = await axios.get('http://localhost:3001/boatData', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBoats(response.data);
    };
    fetchBoats();
  }, [token]);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/boatData/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setBoats(boats.filter(boat => boat.id !== id));
  };

  const handleSave = () => {
    setEditingBoat(null);
    setIsFormVisible(false);
    const fetchBoats = async () => {
      const response = await axios.get('http://localhost:3001/boatData', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBoats(response.data);
    };
    fetchBoats();
  };

  const handleAddBoat = () => {
    setEditingBoat(null);
    setIsFormVisible(true);
  };

  const handleEditBoat = (boat) => {
    setEditingBoat(boat);
    setIsFormVisible(true);
  };

  return (
    <div className="boat-list-container">
      <h2>Boat List</h2>
      <button className="toggle-button" onClick={() => setIsFormVisible(!isFormVisible)}>
        {isFormVisible ? '▼' : '▲'}
      </button>
      {isFormVisible && (
        <BoatForm token={token} boat={editingBoat} onSave={handleSave} />
      )}
      <ul>
        {boats.map(boat => (
          <li key={boat.id}>
            <span>{boat.name} - {boat.location}</span>
            <div className="button-group">
              <button onClick={() => handleEditBoat(boat)}>Edit</button>
              <button onClick={() => handleDelete(boat.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BoatList;
