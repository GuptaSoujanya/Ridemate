import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BookRide from './pages/Bookride';
import PaymentPage from './pages/PymentPage';
import ProfilePage from './pages/ProfilePage';
import SignUpPage from './pages/SignUpPage';
import './App.css'; // Import the updated CSS

const App = () => {
  const [user, setUser] = useState(null); // Global user state

  return (
    <Router>
      <div className="app-container"> {/* Apply full-height container */}
        <Navbar user={user} setUser={setUser} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book-ride" element={<BookRide />} />
            <Route path="/payments" element={<PaymentPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/signup" element={<SignUpPage user={user} setUser={setUser}/>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
