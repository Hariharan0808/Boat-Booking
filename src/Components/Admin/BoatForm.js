import React, { useState } from 'react';
import axios from 'axios';

const BoatForm = ({ token, boat, onSave }) => {
  const [name, setName] = useState(boat ? boat.name : '');
  const [description, setDescription] = useState(boat ? boat.description : '');
  const [price, setPrice] = useState(boat ? boat.price : '');
  const [location, setLocation] = useState(boat ? boat.location : '');
  const [type, setType] = useState(boat ? boat.type : '');
  const [capacity, setCapacity] = useState(boat ? boat.capacity : '');
  const [features, setFeatures] = useState(boat ? boat.features.join(', ') : '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const boatData = {
      name,
      description,
      price,
      location,
      type,
      capacity,
      features: features.split(',').map(feature => feature.trim())
    };
    if (boat) {
      await axios.put(`http://localhost:3001/boatData/${boat.id}`, boatData, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } else {
      await axios.post('http://localhost:3001/boatData', boatData, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="boat-form">
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" required />
      <input type="text" value={type} onChange={(e) => setType(e.target.value)} placeholder="Type" required />
      <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} placeholder="Capacity" required />
      <input type="text" value={features} onChange={(e) => setFeatures(e.target.value)} placeholder="Features (comma separated)" required />
      <button type="submit">Save</button>
    </form>
  );
};

export default BoatForm;
