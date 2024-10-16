// React related imports
import React from 'react';

// Asset imports
import bekeeImage from '../../assets/images/bekee.jpg';
import lisaImage from '../../assets/images/lisa.jpg';
import marleyImage from '../../assets/images/marley.jpg';

// CSS imports
import './About.css';

// TeamMember component
const TeamMember = ({ image, name, role, desc }) => (
    <div className="team-card">
        <div className="team-card__image">
            <img src={image} className="team-image" alt={name} />
        </div>
        <div className="team-card__info">
            <h2 className="team-card__name">{name}</h2>
            <p className="team-card__desc">{desc}</p>
        </div>
        <div className="team-card__role">
            <h2 className="team-role">{role}</h2>
        </div>
    </div>
);

// AboutUs component
const AboutUs = () => (
    <div className="container mt-5 header">
        <h1 className="text-center">About The Shoe Spot</h1>
        <p className="text-center mt-3">
            Welcome to The Shoe Spot! We offer the best selection of shoes for every occasion. Our team is dedicated to providing excellent customer service and the latest in footwear fashion.
        </p>
        <h2 className="text-center mt-5 about-title">Meet the Team</h2>
        <div className="team-container mt-4">
            <TeamMember
                image={bekeeImage}
                name="Goddey Bekee"
                role="CEO"
                desc="Goddey leads our team with a vision for the future and a commitment to excellence."
            />
            <TeamMember
                image={lisaImage}
                name="Lisa Powell-Kuyk"
                role="Marketing Director"
                desc="Lisa is the mastermind behind our marketing strategies and brand awareness."
            />
            <TeamMember
                image={marleyImage}
                name="Marley Enogheghase"
                role="Lead Designer"
                desc="Marley brings our shoe designs to life with creativity and precision."
            />
        </div>
    </div>
);

export default AboutUs;