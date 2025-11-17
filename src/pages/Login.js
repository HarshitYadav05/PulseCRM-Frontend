import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Form, Button, Card, Container, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const Login = ({ setUser }) => {

  // 🔥 DEBUG LINE — CONFIRM THIS FILE IS ACTUALLY BEING USED
  console.log("🔥 LOGIN COMPONENT RENDERED — FILE IS ACTIVE");

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("📤 Sending login request:", formData);

      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      console.log("✅ Login successful:", data);

      // ================================
      // 🔥 ALWAYS SAVE CLEAN STRUCTURE
      // ================================
      const userInfo = {
        token: data.token,
        user: data.user,
      };

      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      if (setUser) setUser(userInfo);

      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Login failed:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "22rem" }} className="p-3 shadow-sm">
        <h3 className="text-center mb-3">Login</h3>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100"
            disabled={loading}
          >
            {loading ? <Spinner animation="border" size="sm" /> : "Login"}
          </Button>
        </Form>

        <div className="text-center mt-3">
          <small>
            Don’t have an account? <Link to="/signup">Signup</Link>
          </small>
        </div>
      </Card>
    </Container>
  );
};

export default Login;
