import React, { useEffect, useState } from "react";
import { Card, Button, Modal, Form, Badge } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import api from "../api/axiosConfig";

// Animated Counter
const AnimatedNumber = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 800;
    const increment = value / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayValue(value);
        clearInterval(counter);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [value]);

  return <>{displayValue}</>;
};

const Dashboard = () => {
  const [leads, setLeads] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newLead, setNewLead] = useState({ name: "", email: "", status: "" });

  // ✅ FIXED API ROUTES
  const fetchDashboardData = async () => {
    try {
      const [leadRes, custRes] = await Promise.all([
        api.get("/api/leads"),
        api.get("/api/customers"),
      ]);

      setLeads(Array.isArray(leadRes.data) ? leadRes.data : []);
      setCustomers(Array.isArray(custRes.data) ? custRes.data : []);
    } catch (error) {
      console.error("Dashboard Fetch Error:", error);
      toast.error("Failed to fetch dashboard data");
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleAddLead = async () => {
    if (!newLead.name || !newLead.email || !newLead.status) {
      toast.warn("Please fill all fields");
      return;
    }

    try {
      await api.post("/api/leads", newLead);
      toast.success("Lead added successfully!");
      setShowModal(false);
      setNewLead({ name: "", email: "", status: "" });
      fetchDashboardData();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add lead");
    }
  };

  const chartData = [
    { name: "Leads", count: leads.length },
    { name: "Customers", count: customers.length },
  ];

  // Prevent crash if leads is not an array
  const activeLeads = Array.isArray(leads)
    ? leads.filter(
        (l) => l.status === "Contacted" || l.status === "Qualified"
      ).length
    : 0;

  const conversionRate =
    leads.length > 0 ? ((customers.length / leads.length) * 100).toFixed(1) : 0;

  return (
    <div
      className="container-fluid py-5 main-container"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #00BCD4, #E91E63, #FFEB3B)",
        backgroundSize: "400% 400%",
        animation: "gradientMove 15s ease infinite",
        color: "#212121",
      }}
    >
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-5 px-4">
        <h2 className="fw-bold mb-0">💼 Dashboard Overview</h2>
        <Button
          variant="dark"
          className="px-4 py-2 rounded-pill"
          onClick={() => setShowModal(true)}
        >
          ➕ Add Lead
        </Button>
      </div>

      {/* STATS */}
      <div className="container px-4 mb-5">
        <div className="row g-4 justify-content-center">

          {/* Total Leads */}
          <div className="col-md-3">
            <Card className="hsb-card text-center p-4 border-0 hsb-blue">
              <Card.Body>
                <h4>Total Leads</h4>
                <h2><AnimatedNumber value={leads.length} /></h2>
              </Card.Body>
            </Card>
          </div>

          {/* Total Customers */}
          <div className="col-md-3">
            <Card className="hsb-card text-center p-4 border-0 hsb-green">
              <Card.Body>
                <h4>Total Customers</h4>
                <h2><AnimatedNumber value={customers.length} /></h2>
              </Card.Body>
            </Card>
          </div>

          {/* Active Leads */}
          <div className="col-md-3">
            <Card className="hsb-card text-center p-4 border-0 hsb-yellow">
              <Card.Body>
                <h4>Active Leads</h4>
                <h2><AnimatedNumber value={activeLeads} /></h2>
              </Card.Body>
            </Card>
          </div>

          {/* Conversion Rate */}
          <div className="col-md-3">
            <Card className="hsb-card text-center p-4 border-0 hsb-red">
              <Card.Body>
                <h4>Conversion Rate</h4>
                <h2><AnimatedNumber value={parseFloat(conversionRate)} />%</h2>
              </Card.Body>
            </Card>
          </div>

        </div>
      </div>

      {/* CHART */}
      <Card className="p-4 border-0 mx-4">
        <h5>📊 Performance Overview</h5>
        <div style={{ height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#2196F3" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* MODAL */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Lead</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={newLead.name}
                onChange={(e) =>
                  setNewLead({ ...newLead, name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={newLead.email}
                onChange={(e) =>
                  setNewLead({ ...newLead, email: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={newLead.status}
                onChange={(e) =>
                  setNewLead({ ...newLead, status: e.target.value })
                }
              >
                <option value="">Select status</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => setShowModal(false)}>Cancel</Button>
          <Button onClick={handleAddLead}>Save Lead</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
