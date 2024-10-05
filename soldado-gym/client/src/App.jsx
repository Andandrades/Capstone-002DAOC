<<<<<<< HEAD
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/Login/LoginPage';
import LandingPage from './Pages/LandingPage/LandingPage';
import RegisterPage from './Pages/Register/RegisterPage';
=======
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { RegisterPage } from "./Pages/Register/RegisterPage";
import { LandingPage } from "./Pages/LandingPage/LandingPage";
import { useEffect, useState } from "react";
import {LoginPage} from "./Pages/Login/LoginPage"
import { Menu } from "./Pages/Menu/Menu";

>>>>>>> 5dd5d45ed51a49eeb7cbbad30ef212d8ec316e17

function App() {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Register" element={<RegisterPage />} />
=======
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/inicio" element={<Menu/>}/>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
>>>>>>> 5dd5d45ed51a49eeb7cbbad30ef212d8ec316e17
      </Routes>
    </Router>
  );
}

export default App;