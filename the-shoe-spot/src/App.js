
import React, { useState, useEffect } from 'react';
import AboutUs from "../src/components/About";
import Headers from "./components/header/header";
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import { auth } from './config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

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
        <div>
          <Button variant="primary" onClick={handleShowLogin}>
            Login
          </Button>
          <Button variant="secondary" onClick={handleShowSignup}>
            Signup
          </Button>
        </div>
      )}

      <Login show={showLogin} handleClose={handleCloseLogin} />
      <Signup show={showSignup} handleClose={handleCloseSignup} />
      <Headers />
      <AboutUs />

    </div>
  );
}

export default App;
