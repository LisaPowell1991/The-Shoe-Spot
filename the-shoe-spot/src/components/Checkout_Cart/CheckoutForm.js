import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Checkout_Cart.css';

const CheckoutForm = ({ handleInputChange, formData }) => {
    return (
        <form className="checkout-form">
            <h3>Contact</h3>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="contact" className="form-label">Phone Number</label>
                <input
                    type="text"
                    id="contact"
                    name="contact"
                    className="form-control"
                    value={formData.contact}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <h3>Delivery</h3>
            <div className="mb-3">
                <label htmlFor="country" className="form-label">Country</label>
                <input
                    type="text"
                    id="country"
                    name="country"
                    className="form-control"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="form-control"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="form-control"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <textarea
                    id="address"
                    name="address"
                    className="form-control"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="suburb" className="form-label">Suburb</label>
                <input
                    type="text"
                    id="suburb"
                    name="suburb"
                    className="form-control"
                    value={formData.suburb}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="city" className="form-label">City</label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    className="form-control"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="province" className="form-label">Province</label>
                <input
                    type="text"
                    id="province"
                    name="province"
                    className="form-control"
                    value={formData.province}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="postalCode" className="form-label">Postal Code</label>
                <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    className="form-control"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <h3>Shipping Method</h3>
            <div className="mb-3 form-check">
                <input
                    type="radio"
                    id="courier"
                    name="shippingMethod"
                    value="courier"
                    className="form-check-input"
                    checked={formData.shippingMethod === 'courier'}
                    onChange={handleInputChange}
                />
                <label htmlFor="courier" className="form-check-label">Courier Delivery</label>
            </div>
            <div className="mb-3 form-check">
                <input
                    type="radio"
                    id="pickup"
                    name="shippingMethod"
                    value="pickup"
                    className="form-check-input"
                    checked={formData.shippingMethod === 'pickup'}
                    onChange={handleInputChange}
                />
                <label htmlFor="pickup" className="form-check-label">Pickup at Warehouse</label>
            </div>
        </form>
    );
};

export default CheckoutForm;