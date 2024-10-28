import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AboutUs from "./components/About/About";
import Headers from "./components/header/header";
import Signup from './components/Login_Signup/Signup';
import Login from './components/Login_Signup/Login';
import Footer from './components/footer/footer';
import Contact from './components/contact/contact';
import HomePage from './components/Home/Home';
import ProductPage from './components/Product/ProductPage';
import ProductDetail from './components/Product/ProductDetail';
import Cart from './components/Checkout_Cart/Cart';
import CheckoutPage from './components/Checkout_Cart/CheckoutPage';
import { auth, getShoes } from './config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { searchPhotos } from './unsplashService';

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [shoes, setShoes] = useState([]);
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart(prevCart => [...prevCart, item]);
    toast.success('Item added to cart!');
  };

  const updateCartItemQuantity = (index, quantity) => {
    setCart(prevCart => {
      const updatedCart = [...prevCart];
      if (quantity <= 0) {
        updatedCart.splice(index, 1); // Remove item if quantity is zero or less
      } else {
        updatedCart[index].quantity = quantity;
      }
      return updatedCart;
    });
  };

  const removeCartItem = (index) => {
    setCart(prevCart => prevCart.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchShoes = async () => {
      try {
        const shoesData = await getShoes();
        const photos = await searchPhotos('shoes');

        const updatedShoes = shoesData.map((shoe, index) => ({
          ...shoe,
          photoUrl: photos[index] ? photos[index].urls.small : 'https://via.placeholder.com/300x200'
        }));

        setShoes(updatedShoes);
      } catch (error) {
        console.error('Error fetching shoes:', error);
      }
    };

    fetchShoes();
  }, []);

  const handleShowLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);

  const handleShowSignup = () => setShowSignup(true);
  const handleCloseSignup = () => setShowSignup(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setCart([]); // Clear the cart
      toast.success('User logged out successfully!');
    } catch (error) {
      toast.error('Error logging out: ' + error.message);
    }
  };
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Router>
      <div id="root">
        <Headers
          user={user}
          handleShowLogin={handleShowLogin}
          handleShowSignup={handleShowSignup}
          handleLogout={handleLogout}
          cartItemCount={cartItemCount}
        />

        <Login show={showLogin} handleClose={handleCloseLogin} />
        <Signup show={showSignup} handleClose={handleCloseSignup} />

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage shoes={shoes} />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<ProductPage shoes={shoes} setShoes={setShoes} />} />
            <Route path="/product/:id" element={<ProductDetail shoes={shoes} addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} updateCartItemQuantity={updateCartItemQuantity} removeCartItem={removeCartItem} user={user} />} />
            <Route path="/checkout" element={<CheckoutPage cart={cart} setCart={setCart} user={user} />} />
          </Routes>
        </div>

        <Footer />

        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </div>
    </Router>
  );
}

export default App;