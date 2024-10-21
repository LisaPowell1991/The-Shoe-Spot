// src/firebase.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { loadStripe } from '@stripe/stripe-js';

// Validate environment variables
const requiredEnvVars = [
    'REACT_APP_FIREBASE_API_KEY',
    'REACT_APP_FIREBASE_AUTH_DOMAIN',
    'REACT_APP_FIREBASE_PROJECT_ID',
    'REACT_APP_FIREBASE_STORAGE_BUCKET',
    'REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
    'REACT_APP_FIREBASE_APP_ID',
    'REACT_APP_STRIPE_PUBLISHABLE_KEY'
];

requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
        console.error(`Missing environment variable: ${envVar}`);
    }
});

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase only if it hasn't been initialized already
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const functions = getFunctions(app, 'us-central1'); // Specify your region if different

// Ensure Stripe is loaded only if window is defined (i.e., not in SSR context)
const stripePromise = typeof window !== 'undefined' ? loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY) : null;

// Function to fetch shoes from Firestore
export const getShoes = async () => {
    try {
        const shoesCol = collection(db, 'shoes');
        const shoeSnapshot = await getDocs(shoesCol);
        const shoeList = shoeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return shoeList;
    } catch (error) {
        console.error('Error fetching shoes:', error);
        throw error;
    }
};

export { auth, googleProvider, db, functions, httpsCallable, stripePromise };