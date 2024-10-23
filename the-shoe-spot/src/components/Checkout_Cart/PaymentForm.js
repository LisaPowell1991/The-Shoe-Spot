import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { functions, httpsCallable } from '../../config/firebase';
import PayPalButton from './PayPalButton';
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
            const createPaymentIntent = httpsCallable(functions, 'api');
            const { data, error: functionError } = await createPaymentIntent({
                amount: Math.round(totalAmount * 100),
                currency: 'usd',
            });

            if (functionError) {
                setError(functionError.message);
                return;
            }

            const { clientSecret } = data;
            if (!clientSecret) {
                throw new Error('Missing client secret.');
            }

            const cardElement = elements.getElement(CardElement);

            const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                },
            });

            if (stripeError) {
                setError(stripeError.message);
                return;
            }

            handlePaymentSuccess();
        } catch (error) {
            setError(error.message);
        } finally {
            setPaymentProcessing(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="payment-form">
                <h3>Pay with Stripe</h3>
                <div className="mb-3">
                    <CardElement />
                </div>
                <button type="submit" className="btn btn-primary btn-lg" disabled={!stripe || paymentProcessing}>
                    {paymentProcessing ? 'Processing…' : 'Pay Now'}
                </button>
                {error && <div className="text-danger mt-3">{error}</div>}
            </form>

            <hr />

            <h3>Pay with PayPal</h3>
            <PayPalButton
                totalAmount={totalAmount}
                handlePaymentSuccess={handlePaymentSuccess} // Use handlePaymentSuccess for PayPal as well
            />
        </>
    );
};

export default PaymentForm;