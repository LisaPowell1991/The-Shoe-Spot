import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

const Cart = ({ cart, updateCartItemQuantity, removeCartItem, user }) => {
    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">My Cart</h1>
            {cart.length === 0 ? (
                <div className='cart-empty'>
                    <p>Your cart is empty.</p>
                    <Link to="/products" className="custom-button-secondary">Explore Our Shoe Collection</Link>
                </div>
            ) : (
                <div>
                    {cart.map((item, index) => (
                        <div className="card mb-3" key={index}>
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src={item.photoUrl} className="img-fluid rounded-start" alt={item.name} />
                                </div>
                                <div className="col-md-8 center">
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="card-text">Size: {item.size}</p>
                                        <p className="card-text">Price: ${item.price.toFixed(2)}</p>
                                        <div className="d-flex center">
                                            <button
                                                className="btn btn-outline-secondary me-2"
                                                onClick={() => updateCartItemQuantity(index, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button
                                                className="btn btn-outline-secondary ms-2"
                                                onClick={() => updateCartItemQuantity(index, item.quantity + 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            className="btn btn-danger mt-3"
                                            onClick={() => removeCartItem(index)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <h3>Total: ${getTotalPrice()}</h3>
                    <Link to="/checkout" className={`btn btn-primary ${!user ? 'disabled' : ''}`}>
                        Proceed to Checkout
                    </Link>
                    {!user && <div className="text-danger mt-3">Please sign up or log in before proceeding to checkout.</div>}
                </div>
            )}
        </div>
    );
};

export default Cart;