import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './BoatDetail.css';

const BoatDetail = () => {
    const { id } = useParams();
    const [boat, setBoat] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const navigate = useNavigate();
    const isLogged = useSelector(state => state.auth.isLogged);

    useEffect(() => {
        fetch(`http://localhost:3001/boatData`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const selectedBoat = data.find(boat => boat.id === parseInt(id));
                if (selectedBoat) {
                    setBoat(selectedBoat);
                } else {
                    setError('Boat not found');
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Fetch error:', error);
                setError('Failed to fetch boat data');
                setLoading(false);
            });
    }, [id]);

    const handleBookClick = () => {
        if (isLogged) {
            setShowDatePicker(true);
        } else {
            if (window.confirm("You need to be logged in to book a boat. Do you want to go to the login page?")) {
                navigate('/login');
            }
        }
    };

    const handleDateConfirm = () => {
        if (!selectedDate) {
            alert("Please select a date to book the boat.");
            return;
        }
        setShowDatePicker(false);
        navigate(`/payment`, { state: { boat, selectedDate } });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!boat) {
        return <div>Boat not found</div>;
    }

    return (
        <div className="boat-detail-container">
            <div className="boat-detail-main">
                <img src={boat.image} alt={boat.name} className="boat-detail-image" />
                <div className="boat-detail-info">
                    <h1>{boat.name}</h1>
                    <p>{boat.description}</p>
                    <p className="boat-detail-price">{boat.price} <span style={{ color: 'black', fontSize: 'small' }}> per day</span></p>
                    <button className="book-button" onClick={handleBookClick}>Book</button>
                    {showDatePicker && (
                        <div className="date-picker-container">
                            <DatePicker 
                                selected={selectedDate}
                                onChange={date => setSelectedDate(date)}
                                dateFormat="yyyy/MM/dd"
                                placeholderText="Select a date"
                                className="date-picker"
                            />
                            <button className="confirm-button" onClick={handleDateConfirm}>Confirm Date</button>
                        </div>
                    )}
                </div>
            </div>
            <div className="boat-detail-extra">
                <h2>Images</h2>
                <div className="boat-images">
                    {boat.extraImages.map((img, index) => (
                        <img key={index} src={img} alt={`${boat.name} ${index + 1}`} className="boat-extra-image" />
                    ))}
                </div>
                <hr></hr>
                <h2>Details</h2>
                <ul className="boat-extra-details">
                    <li><strong>Type:</strong> {boat.type}</li>
                    <li><strong>Location:</strong> {boat.location}</li>
                    <li><strong>Capacity:</strong> {boat.capacity} people</li>
                    <li><strong>Features:</strong> {boat.features.join(', ')}</li>
                </ul>
            </div>
        </div>
    );
};

export default BoatDetail;
