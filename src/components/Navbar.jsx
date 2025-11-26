// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar as BsNavbar, Nav, Container, Button } from "react-bootstrap";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, LogOut, LayoutDashboard, Users } from "lucide-react";

const CustomNavbar = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <BsNavbar
      expand="lg"
      fixed="top"
      className="py-3 px-4 shadow-sm"
      style={{
        margin: "12px auto",
        width: "92%",
        borderRadius: "45px",
        paddingLeft: "25px",
        paddingRight: "25px",

        // 🎨 Glassmorphism
        background:
          theme === "dark"
            ? "rgba(20, 20, 35, 0.40)"
            : "rgba(255, 255, 255, 0.40)",
        backdropFilter: "blur(22px) saturate(180%)",
        WebkitBackdropFilter: "blur(22px) saturate(180%)",

        // Initial shadow
        boxShadow:
          theme === "dark"
            ? "0 10px 32px rgba(0,0,0,0.55)"
            : "0 10px 32px rgba(0,0,0,0.20)",

        border:
          theme === "dark"
            ? "1px solid rgba(0, 255, 255, 0.12)"
            : "1px solid rgba(0, 170, 170, 0.18)",

        transition: "all 0.35s ease",
      }}

      // ⭐ Hover Scale + Neon Glow
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.018)";

        // Neon glow in dark/light theme
        e.currentTarget.style.boxShadow =
          theme === "dark"
            ? "0 0 22px rgba(0,255,255,0.55), 0 10px 40px rgba(0,0,0,0.75)"
            : "0 0 22px rgba(0,200,255,0.40), 0 10px 40px rgba(0,0,0,0.25)";

        e.currentTarget.style.border =
          theme === "dark"
            ? "1px solid rgba(0,255,255,0.35)"
            : "1px solid rgba(0,200,255,0.45)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow =
          theme === "dark"
            ? "0 10px 32px rgba(0,0,0,0.55)"
            : "0 10px 32px rgba(0,0,0,0.20)";
        e.currentTarget.style.border =
          theme === "dark"
            ? "1px solid rgba(0,255,255,0.12)"
            : "1px solid rgba(0,170,170,0.18)";
      }}
    >
      <Container fluid>
        <BsNavbar.Brand
          as={Link}
          to="/dashboard"
          className="fw-bold d-flex align-items-center"
          style={{
            color: theme === "dark" ? "#fff" : "#111",
            letterSpacing: "1px",
          }}
        >
          <img
            src="/logo.png"
            alt="PulseCRM Logo"
            style={{
              width: "38px",
              height: "38px",
              objectFit: "contain",
              marginRight: "10px",
            }}
          />

          <span style={{ fontSize: "1.45rem" }}>
            Pulse<span style={{ color: "#0dcaf0" }}>CRM</span>
          </span>
        </BsNavbar.Brand>

        <BsNavbar.Toggle aria-controls="basic-navbar-nav" />

        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center gap-4">
            {userInfo ? (
              <>
                <Nav.Link as={Link} to="/dashboard" className="fw-medium">
                  <LayoutDashboard size={18} /> Dashboard
                </Nav.Link>

                <Nav.Link as={Link} to="/leads" className="fw-medium">
                  <Users size={18} /> Leads
                </Nav.Link>

                <Nav.Link as={Link} to="/customers" className="fw-medium">
                  <Users size={18} /> Customers
                </Nav.Link>

                <Button
                  variant="outline-danger"
                  size="sm"
                  className="d-flex align-items-center gap-1 rounded-pill px-3"
                  onClick={handleLogout}
                >
                  <LogOut size={16} /> Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
              </>
            )}

            <Button
              variant={theme === "dark" ? "light" : "dark"}
              size="sm"
              className="d-flex align-items-center gap-1 rounded-pill px-3"
              onClick={toggleTheme}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              {theme === "dark" ? "Light" : "Dark"}
            </Button>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};

export default CustomNavbar;
