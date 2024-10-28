import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './contact.css';

const ContactSuccessPopup = ({ message }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/home');
        }, 3000);
        return () => clearTimeout(timer);
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

export default ContactSuccessPopup;