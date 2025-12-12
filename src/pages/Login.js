import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Form, Button, Card, Container, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        { email, password }
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      if (setUser) setUser(data);

      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
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
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button
            type="submit"
            className="w-100"
            disabled={loading}
          >
            {loading ? <Spinner size="sm" /> : "Login"}
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
