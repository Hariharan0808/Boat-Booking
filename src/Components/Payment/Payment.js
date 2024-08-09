import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Payment.css';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const boat = location.state?.boat; // Safeguard with optional chaining

    const [days, setDays] = useState(1);
    const [totalPrice, setTotalPrice] = useState(boat ? boat.price : 0);

    const handleDaysChange = (event) => {
        const selectedDays = event.target.value;
        setDays(selectedDays);
        if (boat) {
            setTotalPrice(boat.price * selectedDays);
        }
    };

    const handlePayment = () => {
        if (boat) {
            const bookingData = {
                boatId: boat.id,
                boatName: boat.name,
                boatImage: boat.image,
                description: boat.description,
                days,
                totalPrice,
                bookingDate: new Date().toISOString()
            };

            fetch('http://localhost:3001/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Booking successful:', data);
                    navigate('/bookings');
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    };

    if (!boat) {
        return <div>Error: Boat data not available</div>;
    }

    return (
        <div className="payment-container">
            <h2>Payment for {boat.name}</h2>
            <img src={boat.image || '/default-image.jpg'} alt={boat.name} className="payment-boat-image" />
            <p>{boat.description || 'No description available.'}</p>
            <div className="payment-details">
                <label htmlFor="days">Number of Days: </label>
                <input
                    type="number"
                    id="days"
                    min="1"
                    value={days}
                    onChange={handleDaysChange}
                />
            </div>
            <p>Total Price: {totalPrice.toFixed(2)} Rs</p>
            <button className="payment-button" onClick={handlePayment}>Proceed to Payment</button>
        </div>
    );
};

export default Payment;
