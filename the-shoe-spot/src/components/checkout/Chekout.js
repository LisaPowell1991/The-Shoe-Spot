import React from "react";
import Headers from "../header/header";
import Lock from './Assets/checkout-lock-icon.png';
import Product from "./Assets/men-athletic-shoes-green.jpg";

const Payment = () => {
  return(
    <div>
      <Headers/>
      <div className="checkout-header-middle-section">
        Checkout
      </div>
    <div className="checkout-header-right-section">
      <img src ={Lock}/>
    </div>
    <main className="main">
      <div className="page-title">
        Review your order
      </div>
      <div className="checkout-grid">
        <div className="order-summery">
          <div className="cart-item-container">
            <div className="delivery-date">
              Delivery date: Tuesday, June 24
            </div>
            
            <div className="cart-item-details-grid">
              <img className="product-image" src={Product}/>

              <div className="cart-item-details">
                <div className="product-name">
                  Green Trainers
                </div>
                <div className="Product-price">
                  $10.90
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </main>
    </div>
  );
};

export default Payment;