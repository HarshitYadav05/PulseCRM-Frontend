import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar as BsNavbar, Nav, Container, Button } from "react-bootstrap";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, LogOut, LayoutDashboard, Users } from "lucide-react";

const Navbar = () => {
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
        background:
          theme === "dark"
            ? "rgba(20, 20, 35, 0.45)"
            : "rgba(255, 255, 255, 0.35)",
        backdropFilter: "blur(12px)",
        borderBottom:
          theme === "dark"
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid rgba(0,0,0,0.05)",
        transition: "all 0.3s ease",
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
          <span style={{ fontSize: "1.4rem", marginRight: "0.4rem" }}>🚀</span>
          CRM <span style={{ color: "#0dcaf0", marginLeft: "3px" }}>Admin</span>
        </BsNavbar.Brand>

        <BsNavbar.Toggle aria-controls="basic-navbar-nav" />

        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center gap-3">
            {userInfo ? (
              <>
                <Nav.Link
                  as={Link}
                  to="/dashboard"
                  className="d-flex align-items-center gap-1 fw-medium"
                  style={{
                    color: theme === "dark" ? "#e0e0e0" : "#333",
                  }}
                >
                  <LayoutDashboard size={18} /> Dashboard
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/lead"
                  className="d-flex align-items-center gap-1 fw-medium"
                  style={{
                    color: theme === "dark" ? "#e0e0e0" : "#333",
                  }}
                >
                  <Users size={18} /> Leads
                </Nav.Link>

                <Button
                  variant="outline-danger"
                  size="sm"
                  className="d-flex align-items-center gap-1 rounded-pill"
                  onClick={handleLogout}
                  style={{
                    background:
                      theme === "dark"
                        ? "rgba(255, 50, 50, 0.1)"
                        : "rgba(255, 200, 200, 0.3)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    transition: "all 0.3s ease",
                  }}
                >
                  <LogOut size={16} /> Logout
                </Button>
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

            <Button
              variant={theme === "dark" ? "light" : "dark"}
              size="sm"
              className="ms-2 d-flex align-items-center gap-1 rounded-pill"
              onClick={toggleTheme}
              style={{
                backdropFilter: "blur(8px)",
                background:
                  theme === "dark"
                    ? "rgba(255,255,255,0.15)"
                    : "rgba(0,0,0,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                transition: "0.3s ease",
              }}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}{" "}
              {theme === "dark" ? "Light" : "Dark"}
            </Button>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};

export default Navbar;
