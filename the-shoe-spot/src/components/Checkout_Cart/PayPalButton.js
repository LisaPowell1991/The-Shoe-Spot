import React, { useState } from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import SuccessPopup from './SuccessPopup';

const PayPalButton = ({ totalAmount, setCart }) => {
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const handlePaymentSuccess = () => {
        setPaymentSuccess(true);
        setCart([]); // Clear the cart on successful payment
    };

    return (
        <>
            <PayPalScriptProvider options={{ "client-id": "AR6CkV-jwBD2RKO9kiFRM5pEoXIurdK3p8324ZEWkrrYyy07iIEp1916157O35sp29LCPBE0WFW1Ip-F" }}>
                <PayPalButtons
                    style={{ layout: 'vertical' }}
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    value: totalAmount.toString(),
                                },
                            }],
                        });
                    }}
                    onApprove={(data, actions) => {
                        return actions.order.capture().then((details) => {
                            handlePaymentSuccess();
                        });
                    }}
                    onError={(err) => {
                        console.error(err);
                    }}
                />
            </PayPalScriptProvider>

            {paymentSuccess && <SuccessPopup message="Payment Successful!" />}
        </>
    );
};

export default PayPalButton;
