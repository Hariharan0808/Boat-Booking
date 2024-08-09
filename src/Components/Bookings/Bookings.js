import React, { useEffect, useState } from 'react';
import './Bookings.css';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3001/bookings')
            .then(response => response.json())
            .then(data => {
                setBookings(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching bookings:', error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;

    if (!bookings || bookings.length === 0) return <div>No bookings available</div>;

    return (
        <div className="bookings-container">
            {bookings.map(booking => (
                <div key={booking.id} className="booking-card">
                    <h3>{booking.boatName}</h3>
                    <img src={booking.boatImage || '/default-image.jpg'} alt={booking.boatName} className="booking-image" />
                    <p>{booking.description}</p>
                    <p>Days: {booking.days}</p>
                    <p>Total Price: {booking.totalPrice.toFixed(2)} Rs</p>
                    <p>Booking Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
};

export default Bookings;
