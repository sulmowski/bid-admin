import logo from './logo.svg';
// import './App.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./htmls/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from './pages/Login'
import Footer from "./htmls/Footer";

function App() {
  const [language, setLanguage] = useState("en");

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <Router>
      <Header language={language} handleLanguageChange={handleLanguageChange} />
      <Container>
        <Routes>
          <Route path="/" element={<Home language={language} />} />
          <Route path="/about" element={<About language={language} />} />
          <Route path="/contact" element={<Contact language={language} />} />
          <Route path="/login" element={<Login language={language} />} />
        </Routes>
      </Container>
      <Footer language={language} />
    </Router>
  );
}

export default App;
