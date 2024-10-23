import React, { useState } from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import SuccessPopup from './SuccessPopup'; // Import the popup component

const PayPalButton = ({ totalAmount }) => {
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const handlePaymentSuccess = () => {
        setPaymentSuccess(true); // Show the success popup
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
                            handlePaymentSuccess(); // Trigger the success popup
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