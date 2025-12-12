// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Lead";
import Customer from "./pages/Customer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import ProtectedRoute from "./components/ProtectedRoute";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";

// ⭐ Navbar
import CustomNavbar from "./components/Navbar";

// ⭐ TEST: Check if .env is working
console.log("🔍 API URL FROM ENV =", process.env.REACT_APP_API_URL);

function App() {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("userInfo");
      return storedUser && storedUser !== "undefined"
        ? JSON.parse(storedUser)
        : null;
    } catch {
      return null;
    }
  });

  return (
    <Router>
      <CustomNavbar />

      <main>
        <Container className="main-container mt-4">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Navigate to="/dashboard" replace />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/leads"
              element={
                <ProtectedRoute>
                  <Leads />
                </ProtectedRoute>
              }
            />

            <Route
              path="/customers"
              element={
                <ProtectedRoute>
                  <Customer />
                </ProtectedRoute>
              }
            />

            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup />} />

            <Route
              path="*"
              element={
                user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </Container>
      </main>

      <ToastContainer autoClose={3000} theme="colored" />
    </Router>
  );
}

export default App;
