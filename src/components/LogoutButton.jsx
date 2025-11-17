import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.info("Logged out successfully!");
    navigate("/login");
  };

  return (
    <Button
      variant="outline-light"
      size="sm"
      onClick={handleLogout}
      className="ms-2"
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
