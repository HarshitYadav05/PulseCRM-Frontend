// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Lead";
import Customer from "./pages/Customer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import LogoutButton from "./components/LogoutButton";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

function App() {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("userInfo");
      return storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const storedUser = localStorage.getItem("userInfo");
        setUser(storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null);
      } catch {
        setUser(null);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <Router>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        className="shadow-sm fixed-top"
        style={{
          backdropFilter: "none",
          background: "rgba(33, 37, 41, 1)",
        }}
      >
        <Container>
          <Navbar.Brand as={Link} to="/dashboard">
            🚀 <span className="fw-bold text-info">CRM Admin</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {user && (
                <>
                  <Nav.Link as={Link} to="/dashboard">
                    Dashboard
                  </Nav.Link>
                  <Nav.Link as={Link} to="/leads">
                    Leads
                  </Nav.Link>
                  <Nav.Link as={Link} to="/customers">
                    Customers
                  </Nav.Link>
                </>
              )}
            </Nav>

            <Nav>
              {user ? (
                <>
                  <Navbar.Text className="me-3">
                    👋 Welcome, <strong>{user.name || "User"}</strong>
                  </Navbar.Text>
                  <LogoutButton onLogout={handleLogout} />
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/signup">
                    Signup
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* main-container ensures enough top padding for fixed navbar */}
      <main>
        <Container className="main-container mt-3">
          <Routes>
            {/* Dashboard — accept both "/" and "/dashboard" */}
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

            {/* Other protected routes */}
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

            {/* Public routes */}
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup />} />

            {/* Fallback: send to dashboard if logged in, else to login */}
            <Route path="*" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          </Routes>
        </Container>
      </main>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar theme="colored" />
    </Router>
  );
}

export default App;
