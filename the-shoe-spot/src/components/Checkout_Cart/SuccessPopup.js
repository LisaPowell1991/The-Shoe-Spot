import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout_Cart.css'; // Add styles for your popup if needed

const SuccessPopup = ({ message }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/'); // Redirect to the home page after 3 seconds
        }, 3000);
        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, [navigate]);

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h3>{message}</h3>
                <p>You will be redirected to the home page shortly...</p>
            </div>
        </div>
    );
};

export default SuccessPopup;
