import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { getFunctions, httpsCallable } from 'firebase/functions';  // Correct way to import Firebase Functions
import 'bootstrap/dist/css/bootstrap.min.css';
import './Checkout_Cart.css';

const PaymentForm = ({ totalAmount, handlePaymentSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setPaymentProcessing(true);
        setError(null);

        try {
            // Set up Firebase Functions
            const functions = getFunctions();
            const createPaymentIntent = httpsCallable(functions, 'createPaymentIntent'); // Call the Firebase function

            // Call Firebase function to create the PaymentIntent
            const { data } = await createPaymentIntent({
                amount: Math.round(totalAmount * 100),  // Convert total amount to cents
                currency: 'usd',  // Set the default currency
            });

            if (!data.clientSecret) {
                throw new Error('Missing client secret from Firebase function.');
            }

            const { clientSecret } = data;

            // Get the CardElement and confirm the payment with Stripe
            const cardElement = elements.getElement(CardElement);

            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                },
            });

            if (stripeError) {
                setError(stripeError.message);
                return;
            }

            // Check if payment was successful and call handlePaymentSuccess
            if (paymentIntent.status === 'succeeded') {
                handlePaymentSuccess(paymentIntent);
            } else {
                setError('Payment failed. Please try again.');
            }
        } catch (error) {
            setError(error.message || 'An error occurred. Please try again.');
        } finally {
            setPaymentProcessing(false);
        }
    };

    console.log("Stripe Publishable Key:", process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

    return (
        <div>
            <form onSubmit={handleSubmit} className="payment-form">
                <h3>Pay with Stripe</h3>
                <div className="mb-3">
                    <CardElement />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={!stripe || paymentProcessing}
                >
                    {paymentProcessing ? 'Processing…' : 'Pay Now'}
                </button>
                {error && <div className="text-danger mt-3">{error}</div>}
            </form>

            <hr />

            {/* Optionally, include PayPal payment method here */}
            <h3>Pay with PayPal</h3>
            {/* <PayPalButton totalAmount={totalAmount} handlePaymentSuccess={handlePaymentSuccess} /> */}

        </div>

    );
};
export default PaymentForm;