const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')(functions.config().stripe.secret_key);  // Use the environment variable

admin.initializeApp();

exports.createPaymentIntent = functions.https.onCall(async (data, context) => {
    try {
        const amount = data.amount;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount, // amount in cents
            currency: data.currency || 'usd', // default currency
        });

        return {
            clientSecret: paymentIntent.client_secret, // Send the client secret to the client
        };
    } catch (error) {
        console.error("Error creating payment intent", error);
        throw new functions.https.HttpsError('internal', error.message);
    }
});
