import React, { useState } from "react";
import "./contact.css";
import "../../App.css";
import ContactSuccessPopup from './ContactSuccessPopup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';

const ContactPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
  };

  return (
    <div className="contact-page">
      <h1>Get in Touch</h1>
      <div className="contact-info">
        <p>
          <FontAwesomeIcon icon={faPhone} aria-hidden="true" /> Phone: <i>+1 234 567 890 </i>
        </p>
        <p>
          <FontAwesomeIcon icon={faEnvelope} aria-hidden="true" /> Email: <i>support@the-shoe-spot.com</i>
        </p>
        <p>
          <FontAwesomeIcon icon={faMapMarkerAlt} aria-hidden="true" /> Address:
          <i> 123 E-commerce St, Business City, Country</i>
        </p>
        <p>
          <FontAwesomeIcon icon={faClock} aria-hidden="true" /> Support Hours: <i>Mon - Fri, 9 AM - 5 PM</i>
        </p>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" required />
        </label>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <label>
          Subject:
          <input type="text" name="subject" />
        </label>
        <label>
          Message:
          <textarea name="message" rows="5" required></textarea>
        </label>
        <button type="submit">Submit</button>
      </form>
      {isSubmitted && <ContactSuccessPopup message="Your message has been sent successfully!" />}
    </div>
  );
};

export default ContactPage;