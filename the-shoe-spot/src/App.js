
import React, { useState, useEffect } from 'react';
import AboutUs from "../src/components/About";
import Headers from "./components/header/header";
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import Footer from './components/footer/footer';
import Contact from './components/contact/contact';
import ProductPage from './components/ProductPage';
import { auth } from './config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Payment from './components/checkout/Chekout';

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleShowLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);

  const handleShowSignup = () => setShowSignup(true);
  const handleCloseSignup = () => setShowSignup(false);

  return (
    <div className="App">
      {user ? (
        <div>
          <h1>Welcome, {user.email}</h1>
          <Logout />
        </div>
      ) : (
        <div className="d-flex justify-content-end mt-3">
          <Button variant="primary" onClick={handleShowLogin} className="me-2">
            Login
          </Button>
          <Button
            variant="secondary"
            onClick={handleShowSignup}
            className="me-2"
          >
            Signup
          </Button>
        </div>
      )}

      <Login show={showLogin} handleClose={handleCloseLogin} />
      <Signup show={showSignup} handleClose={handleCloseSignup} />
      <Headers />
      <AboutUs />
      <ProductPage />
      <Contact />
      <Payment/>
      <Footer />
    </div>
  );
}

export default App;
