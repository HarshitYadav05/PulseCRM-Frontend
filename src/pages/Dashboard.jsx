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

// ✅ Animated Counter Component
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

  const fetchDashboardData = async () => {
    try {
      const [leadRes, custRes] = await Promise.all([
        api.get("/leads"),
        api.get("/customers"),
      ]);
      setLeads(leadRes.data);
      setCustomers(custRes.data);
    } catch (error) {
      console.error(error);
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
      await api.post("/leads", newLead);
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

  const activeLeads = leads.filter(
    (l) => l.status === "Contacted" || l.status === "Qualified"
  ).length;

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
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-5 px-4">
        <h2
          className="fw-bold mb-0"
          style={{ letterSpacing: "1px", color: "#212121" }}
        >
          💼 Dashboard Overview
        </h2>
        <Button
          variant="dark"
          className="px-4 py-2 rounded-pill"
          onClick={() => setShowModal(true)}
          style={{
            background: "#212121",
            color: "#FFEB3B",
            border: "2px solid #FFEB3B",
            fontWeight: "600",
          }}
        >
          ➕ Add Lead
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="container px-4 mb-5">
        <div className="row g-4 justify-content-center">
          {/* Total Leads */}
          <div className="col-md-3">
            <Card className="hsb-card text-center p-4 border-0 hsb-pulse hsb-blue">
              <Card.Body>
                <h4 className="fw-semibold">Total Leads</h4>
                <h2 className="fw-bold">
                  <AnimatedNumber value={leads.length} />
                </h2>
                <Badge bg="light" text="dark" className="mt-2">
                  Updated
                </Badge>
              </Card.Body>
            </Card>
          </div>

          {/* Total Customers */}
          <div className="col-md-3">
            <Card className="hsb-card text-center p-4 border-0 hsb-pulse hsb-green">
              <Card.Body>
                <h4 className="fw-semibold">Total Customers</h4>
                <h2 className="fw-bold">
                  <AnimatedNumber value={customers.length} />
                </h2>
                <Badge bg="light" text="dark" className="mt-2">
                  Active
                </Badge>
              </Card.Body>
            </Card>
          </div>

          {/* Active Leads */}
          <div className="col-md-3">
            <Card className="hsb-card text-center p-4 border-0 hsb-pulse hsb-yellow">
              <Card.Body>
                <h4 className="fw-semibold">Active Leads</h4>
                <h2 className="fw-bold">
                  <AnimatedNumber value={activeLeads} />
                </h2>
                <Badge bg="light" text="dark" className="mt-2">
                  Live
                </Badge>
              </Card.Body>
            </Card>
          </div>

          {/* Conversion Rate */}
          <div className="col-md-3">
            <Card className="hsb-card text-center p-4 border-0 hsb-pulse hsb-red">
              <Card.Body>
                <h4 className="fw-semibold">Conversion Rate</h4>
                <h2 className="fw-bold">
                  <AnimatedNumber value={parseFloat(conversionRate)} />%
                </h2>
                <Badge bg="light" text="dark" className="mt-2">
                  Auto
                </Badge>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>

      {/* Chart */}
      <Card
        className="p-4 border-0 mx-4"
        style={{
          background: "#ffffffd9",
          borderRadius: "20px",
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
        }}
      >
        <h5 className="mb-4 fw-semibold" style={{ color: "#212121" }}>
          📊 Performance Overview
        </h5>
        <div style={{ height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" stroke="#555" />
              <YAxis stroke="#555" />
              <Tooltip
                contentStyle={{
                  background: "#fff",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                }}
              />
              <Bar dataKey="count" fill="hsl(210, 90%, 45%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Add Lead Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        contentClassName="border-0"
      >
        <Modal.Header
          closeButton
          style={{
            background: "#00BCD4",
            color: "#fff",
            borderBottom: "none",
          }}
        >
          <Modal.Title>Add New Lead</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#f7f9fc" }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={newLead.name}
                onChange={(e) =>
                  setNewLead({ ...newLead, name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
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
        <Modal.Footer style={{ background: "#f1f1f1" }}>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            style={{
              backgroundColor: "#00BCD4",
              border: "none",
              color: "#fff",
              fontWeight: "600",
            }}
            onClick={handleAddLead}
          >
            Save Lead
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
