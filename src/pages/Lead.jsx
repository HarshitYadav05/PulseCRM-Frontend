import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Modal,
  Box,
  TextField,
  MenuItem,
  Chip,
  CircularProgress,
  Fade,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { toast } from "react-toastify";
import { getLeads, createLead, updateLead, deleteLead } from "../api/leadAPI";

const Lead = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentLead, setCurrentLead] = useState(null);

  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    phone: "",
    status: "",
  });

  const [editLead, setEditLead] = useState({
    name: "",
    email: "",
    phone: "",
    status: "",
  });

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const data = await getLeads();
      const leadsArray = Array.isArray(data)
        ? data
        : Array.isArray(data?.leads)
        ? data.leads
        : [];
      setLeads(leadsArray);
    } catch (error) {
      console.error("❌ Error fetching leads:", error);
      toast.error("Failed to load leads");
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleAddLead = async () => {
    if (!newLead.name || !newLead.email || !newLead.status) {
      toast.warn("Please fill all required fields");
      return;
    }
    try {
      await createLead(newLead);
      toast.success("Lead added successfully!");
      setShowModal(false);
      setNewLead({ name: "", email: "", phone: "", status: "" });
      fetchLeads();
    } catch {
      toast.error("Failed to add lead");
    }
  };

  const handleEditModal = (lead) => {
    setCurrentLead(lead);
    setEditLead(lead);
    setShowEditModal(true);
  };

  const handleUpdateLead = async () => {
    try {
      await updateLead(currentLead._id, editLead);
      toast.success("Lead updated successfully!");
      setShowEditModal(false);
      fetchLeads();
    } catch {
      toast.error("Failed to update lead");
    }
  };

  const handleDeleteLead = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    try {
      await deleteLead(id);
      toast.success("Lead deleted successfully");
      fetchLeads();
    } catch {
      toast.error("Failed to delete lead");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "primary";
      case "Contacted":
        return "info";
      case "Qualified":
      case "Converted":
        return "success";
      case "Lost":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box
      sx={{
        p: 4,
        background: "linear-gradient(135deg, #14b6ccff, #80d5ebdb)",
        minHeight: "100vh",
      }}
    >
      {/* ===== Header ===== */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="bold">
          Leads Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setShowModal(true)}
          sx={{
            background: "linear-gradient(90deg, #673ab7, #512da8)",
            color: "white",
            borderRadius: "20px",
            px: 3,
            py: 1,
            fontWeight: 600,
            "&:hover": {
              background: "linear-gradient(90deg, #512da8, #311b92)",
              transform: "scale(1.05)",
            },
          }}
        >
          Add Lead
        </Button>
      </Box>

      {/* ===== Lead Cards ===== */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" mt={6}>
          <CircularProgress />
        </Box>
      ) : leads.length === 0 ? (
        <Typography align="center" color="text.secondary">
          No leads found.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {leads.map((lead) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={lead._id}>
              <Card
                sx={{
                  backdropFilter: "blur(10px)",
                  background: "rgba(255, 255, 255, 0.65)",
                  borderRadius: "18px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                  transition: "transform 0.25s, box-shadow 0.25s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 12px 25px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {lead.name}
                  </Typography>
                  <Typography color="text.secondary">{lead.email}</Typography>
                  <Typography color="text.secondary">{lead.phone}</Typography>

                  <Chip
                    label={lead.status || "Unknown"}
                    color={getStatusColor(lead.status)}
                    sx={{ mt: 1 }}
                  />

                  {lead.createdAt && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Added on:{" "}
                      {new Date(lead.createdAt).toLocaleDateString("en-IN")}
                    </Typography>
                  )}

                  {/* 🎨 Updated Action Buttons */}
                  <Box mt={2} display="flex" gap={1}>
                    <Button
                      size="small"
                      variant="contained"
                      startIcon={<Edit />}
                      onClick={() => handleEditModal(lead)}
                      sx={{
                        background: "linear-gradient(90deg, #42a5f5, #1e88e5)",
                        color: "white",
                        borderRadius: "20px",
                        fontWeight: 600,
                        "&:hover": {
                          background: "linear-gradient(90deg, #1e88e5, #1565c0)",
                          transform: "scale(1.05)",
                        },
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      size="small"
                      variant="contained"
                      startIcon={<Delete />}
                      onClick={() => handleDeleteLead(lead._id)}
                      sx={{
                        background: "linear-gradient(90deg, #ef5350, #e53935)",
                        color: "white",
                        borderRadius: "20px",
                        fontWeight: 600,
                        "&:hover": {
                          background: "linear-gradient(90deg, #e53935, #b71c1c)",
                          transform: "scale(1.05)",
                        },
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* ➕ Add Lead Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)} closeAfterTransition>
        <Fade in={showModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 420,
              backdropFilter: "blur(16px)",
              background: "rgba(255,255,255,0.3)",
              border: "1px solid rgba(255,255,255,0.4)",
              borderRadius: 4,
              boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
              p: 4,
            }}
          >
            <Typography variant="h6" mb={2} fontWeight="bold">
              Add New Lead
            </Typography>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={newLead.name}
              onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
            />
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={newLead.email}
              onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
            />
            <TextField
              label="Phone"
              fullWidth
              margin="normal"
              value={newLead.phone}
              onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
            />
            <TextField
              select
              label="Status"
              fullWidth
              margin="normal"
              value={newLead.status}
              onChange={(e) => setNewLead({ ...newLead, status: e.target.value })}
            >
              <MenuItem value="New">New</MenuItem>
              <MenuItem value="Contacted">Contacted</MenuItem>
              <MenuItem value="Qualified">Qualified</MenuItem>
              <MenuItem value="Converted">Converted</MenuItem>
              <MenuItem value="Lost">Lost</MenuItem>
            </TextField>
            <Box display="flex" justifyContent="flex-end" gap={1} mt={3}>
              <Button onClick={() => setShowModal(false)}>Cancel</Button>
              <Button
                variant="contained"
                onClick={handleAddLead}
                sx={{
                  background: "linear-gradient(90deg, #2196f3, #21cbf3)",
                  color: "white",
                  borderRadius: "20px",
                  px: 3,
                  fontWeight: 600,
                  "&:hover": {
                    background: "linear-gradient(90deg, #1976d2, #00bcd4)",
                    transform: "scale(1.05)",
                  },
                }}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* ✏️ Edit Lead Modal */}
      <Modal open={showEditModal} onClose={() => setShowEditModal(false)} closeAfterTransition>
        <Fade in={showEditModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 420,
              backdropFilter: "blur(16px)",
              background: "rgba(222, 61, 61, 0.3)",
              border: "1px solid rgba(132, 17, 17, 0.4)",
              borderRadius: 4,
              boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
              p: 4,
            }}
          >
            <Typography variant="h6" mb={2} fontWeight="bold">
              Edit Lead
            </Typography>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={editLead.name}
              onChange={(e) => setEditLead({ ...editLead, name: e.target.value })}
            />
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={editLead.email}
              onChange={(e) => setEditLead({ ...editLead, email: e.target.value })}
            />
            <TextField
              label="Phone"
              fullWidth
              margin="normal"
              value={editLead.phone}
              onChange={(e) => setEditLead({ ...editLead, phone: e.target.value })}
            />
            <TextField
              select
              label="Status"
              fullWidth
              margin="normal"
              value={editLead.status}
              onChange={(e) => setEditLead({ ...editLead, status: e.target.value })}
            >
              <MenuItem value="New">New</MenuItem>
              <MenuItem value="Contacted">Contacted</MenuItem>
              <MenuItem value="Qualified">Qualified</MenuItem>
              <MenuItem value="Converted">Converted</MenuItem>
              <MenuItem value="Lost">Lost</MenuItem>
            </TextField>
            <Box display="flex" justifyContent="flex-end" gap={1} mt={3}>
              <Button onClick={() => setShowEditModal(false)}>Cancel</Button>
              <Button
                variant="contained"
                onClick={handleUpdateLead}
                sx={{
                  background: "linear-gradient(90deg, #ab47bc, #8e24aa)",
                  color: "white",
                  borderRadius: "20px",
                  px: 3,
                  fontWeight: 600,
                  "&:hover": {
                    background: "linear-gradient(90deg, #8e24aa, #6a1b9a)",
                    transform: "scale(1.05)",
                  },
                }}
              >
                Update
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default Lead;
