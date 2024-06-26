// src/AboutUs.js
import React from 'react';
import './About.css';
import Marley from './Assets/marley.jpg';
import Bekee from './Assets/bekee.jpg';
import Lisa from './Assets/Lisa.jpg';

const AboutUs = () => {
    return (
        <div className="container mt-5 header ">
            <h1 className="text-center">About The Shoe Spot</h1>
            <p className="text-center mt-3">
                Welcome to The Shoe Spot! We offer the best selection of shoes for every occasion. Our team is dedicated to providing excellent customer service and the latest in footwear fashion.
            </p>
            <h2 className="text-center mt-5">Meet the Team</h2>
            <div className="about-row mt-4">
                <div className="col-md-4 text-center team-member">
                    <img src={Bekee} className="rounded-circle" alt="Team Member 1" />
                    <h4 className="mt-2">Goddey Bekee</h4>
                    <p>CEO</p>
                </div>
                <div className="col-md-4 text-center team-member">
                    <img src={Lisa} className="rounded-circle" alt="Team Member 2" />
                    <h4 className="mt-2">Lisa Powell-Kuyk</h4>
                    <p>Marketing Director</p>
                </div>
                <div className="col-md-4 text-center team-member">
                    <img src={Marley} className="rounded-circle" alt="Team Member 3" />
                    <h4 className="mt-2">Marley Enogheghase</h4>
                    <p>Lead Designer</p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;