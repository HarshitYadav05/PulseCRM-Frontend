import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user data from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data);
      } catch (err) {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // ✅ Update password
  const handleUpdatePassword = async () => {
    if (!password) return toast.warn("Please enter a new password");
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "/api/users/update-password",
        { password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Password updated successfully");
      setPassword("");
    } catch {
      toast.error("Failed to update password");
    }
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );

  return (
    <Box
      sx={{
        p: 4,
        background: "linear-gradient(135deg, #00BCD4, #E91E63, #FFEB3B)",
        backgroundSize: "400% 400%",
        minHeight: "100vh",
        animation: "gradientMove 15s ease infinite",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          maxWidth: 420,
          width: "100%",
          borderRadius: "20px",
          backdropFilter: "blur(12px)",
          background: "rgba(255,255,255,0.7)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
        }}
      >
        <CardContent>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            👤 My Profile
          </Typography>
          <Typography variant="body1" mb={1}>
            <strong>Name:</strong> {user?.name}
          </Typography>
          <Typography variant="body1" mb={3}>
            <strong>Email:</strong> {user?.email}
          </Typography>

          <TextField
            fullWidth
            type="password"
            label="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleUpdatePassword}
            sx={{
              background: "linear-gradient(90deg, #673ab7, #512da8)",
              color: "white",
              borderRadius: "20px",
              "&:hover": { background: "linear-gradient(90deg, #512da8, #311b92)" },
            }}
          >
            Update Password
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
