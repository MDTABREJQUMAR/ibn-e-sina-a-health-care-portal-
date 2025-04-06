import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  Divider,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Chip
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import EmergencyIcon from "@mui/icons-material/LocalPharmacy";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import AmbulanceImage from "../assets/ambulance-img.jpg";

const AmbulanceBooking = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pickupLocation: "",
    destination: "",
    date: "",
    time: "",
    emergencyType: "Minor",
    notes: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add your form submission logic here
    console.log("Form submitted:", formData);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Emergency types with corresponding colors and descriptions
  const emergencyTypes = [
    {
      value: "Minor",
      label: "Minor Injury/Condition",
      color: "#4caf50",
      description: "Non-critical conditions requiring basic medical attention (sprains, minor cuts, fever)"
    },
    {
      value: "Moderate",
      label: "Moderate Medical Emergency",
      color: "#ff9800",
      description: "Conditions requiring prompt medical care (fractures, dehydration, non-life-threatening conditions)"
    },
    {
      value: "Critical",
      label: "Critical Emergency/Accident",
      color: "#f44336",
      description: "Life-threatening emergencies requiring immediate care (severe accidents, cardiac issues, stroke)"
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper 
        elevation={4} 
        sx={{ 
          overflow: "hidden",
          borderRadius: 3,
          backgroundColor: "#fff",
        }}
      >
        {/* Enhanced Hero Section */}
        <Box 
          sx={{ 
            position: "relative",
            height: { xs: "300px", md: "280px" },
            backgroundImage: `url(${AmbulanceImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "67%",
              background: "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(95, 90, 90, 0.6) 100%)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: { xs: "center", md: "flex-start" },
              padding: { xs: 3, md: 6 },
              textAlign: { xs: "center", md: "left" }
            }}
          >
            <Box sx={{ maxWidth: { xs: "100%", md: "60%" } }}>
              <Typography 
                variant="h2" 
                component="h1" 
                gutterBottom 
                sx={{ 
                  fontWeight: "bold", 
                  color: "white",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3.2rem" }
                }}
              >
                Emergency Medical Services
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: "white", 
                  mb: 3,
                  textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                  fontWeight: 400
                }}
              >
                Fast & Professional Emergency Response Available 24/7
              </Typography>
              <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: { xs: "center", md: "flex-start" } }}>
                <Chip 
                  icon={<EmergencyIcon sx={{ color: "white !important" }} />} 
                  label="24/7 Emergency Response" 
                  sx={{ 
                    bgcolor: "rgba(255,255,255,0.2)", 
                    color: "white", 
                    fontWeight: "bold",
                    backdropFilter: "blur(5px)"
                  }} 
                />
                <Chip 
                  icon={<HealthAndSafetyIcon sx={{ color: "white !important" }} />} 
                  label="Professional Medical Staff" 
                  sx={{ 
                    bgcolor: "rgba(255,255,255,0.2)", 
                    color: "white", 
                    fontWeight: "bold",
                    backdropFilter: "blur(5px)"
                  }} 
                />
              </Stack>
            </Box>
          </Box>
        </Box>

        {/* Emergency Stats Cards - New Section */}
        <Box sx={{ mt: -4, pt:10, px: { xs: 2, md: 4 }, mb: 4 }}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={4}>
              <Card 
                elevation={4} 
                sx={{ 
                  borderRadius: 2, 
                  height: "100%",
                  bgcolor: "#fff",
                  transition: "transform 0.3s",
                  "&:hover": { transform: "translateY(-5px)" }
                }}
              >
                <CardContent sx={{ p: 3, textAlign: "center" }}>
                  <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                    <Box 
                      sx={{ 
                        p: 1.5, 
                        borderRadius: "50%", 
                        bgcolor: "rgba(220,53,69,0.1)", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center" 
                      }}
                    >
                      <EmergencyIcon sx={{ fontSize: 40, color: "#dc3545" }} />
                    </Box>
                  </Box>
                  <Typography variant="h5" gutterBottom fontWeight={600}>5 Min</Typography>
                  <Typography variant="body2" color="text.secondary">Average Response Time</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card 
                elevation={4} 
                sx={{ 
                  borderRadius: 2, 
                  height: "100%",
                  bgcolor: "#fff",
                  transition: "transform 0.3s",
                  "&:hover": { transform: "translateY(-5px)" }
                }}
              >
                <CardContent sx={{ p: 3, textAlign: "center" }}>
                  <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                    <Box 
                      sx={{ 
                        p: 1.5, 
                        borderRadius: "50%", 
                        bgcolor: "rgba(25,118,210,0.1)", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center" 
                      }}
                    >
                      <MedicalServicesIcon sx={{ fontSize: 40, color: "#1976d2" }} />
                    </Box>
                  </Box>
                  <Typography variant="h5" gutterBottom fontWeight={600}>50+</Typography>
                  <Typography variant="body2" color="text.secondary">Advanced Medical Units</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card 
                elevation={4} 
                sx={{ 
                  borderRadius: 2, 
                  height: "100%",
                  bgcolor: "#fff",
                  transition: "transform 0.3s",
                  "&:hover": { transform: "translateY(-5px)" }
                }}
              >
                <CardContent sx={{ p: 3, textAlign: "center" }}>
                  <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                    <Box 
                      sx={{ 
                        p: 1.5, 
                        borderRadius: "50%", 
                        bgcolor: "rgba(76,175,80,0.1)", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center" 
                      }}
                    >
                      <LocalHospitalIcon sx={{ fontSize: 40, color: "#4caf50" }} />
                    </Box>
                  </Box>
                  <Typography variant="h5" gutterBottom fontWeight={600}>24/7</Typography>
                  <Typography variant="body2" color="text.secondary">Emergency Medical Support</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ px: { xs: 2, md: 4 }, pb: 4 }}>
          {/* Emergency Condition Types */}
          <Box sx={{ mb: 5, mt: 3 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: "#1976d2" }}>
              <MedicalServicesIcon sx={{ mr: 1, verticalAlign: "middle" }} />
              Emergency Types We Handle
            </Typography>
            <Grid container spacing={3}>
              {emergencyTypes.map((type) => (
                <Grid item xs={12} md={4} key={type.value}>
                  <Paper 
                    elevation={2} 
                    sx={{ 
                      p: 2, 
                      height: "100%", 
                      borderLeft: `4px solid ${type.color}`,
                      transition: "transform 0.3s",
                      "&:hover": { transform: "translateY(-5px)" }
                    }}
                  >
                    <Typography variant="h6" gutterBottom>{type.label}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {type.description}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Booking Form */}
          <Typography variant="h5" sx={{ mb: 4, fontWeight: 600, color: "#1976d2" }}>
            <LocalHospitalIcon sx={{ mr: 1, verticalAlign: "middle" }} />
            Book An Ambulance
          </Typography>
          
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Personal Information */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                  <PersonIcon sx={{ mr: 1 }} /> Personal Information
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  InputProps={{
                    startAdornment: <EmailIcon color="action" sx={{ mr: 1 }} />,
                  }}
                />
              </Grid>
              
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  InputProps={{
                    startAdornment: <PhoneIcon color="action" sx={{ mr: 1 }} />,
                  }}
                />
              </Grid>
              
              {/* Transport Information */}
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                  <LocationOnIcon sx={{ mr: 1 }} /> Transport Information
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Pickup Location"
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  InputProps={{
                    startAdornment: <LocationOnIcon color="action" sx={{ mr: 1 }} />,
                  }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  InputProps={{
                    startAdornment: <LocationOnIcon color="action" sx={{ mr: 1 }} />,
                  }}
                />
              </Grid>
              
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: <EventIcon color="action" sx={{ mr: 1 }} />,
                  }}
                />
              </Grid>
              
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              
              <Grid item xs={12} md={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Patient Condition</InputLabel>
                  <Select
                    name="emergencyType"
                    value={formData.emergencyType}
                    onChange={handleChange}
                    label="Patient Condition"
                  >
                    {emergencyTypes.map((type) => (
                      <MenuItem value={type.value} key={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Additional Medical Information"
                  placeholder="Please describe the condition, any symptoms, or relevant medical history"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <Box sx={{ mt: 1.5, mr: 1 }}>
                        <NoteAltIcon color="action" />
                      </Box>
                    ),
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sx={{ mt: 3, textAlign: "center" }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="error"
                  size="large"
                  sx={{ 
                    px: 5, 
                    py: 1.5, 
                    borderRadius: 2,
                    fontWeight: "bold",
                    boxShadow: 3,
                    "&:hover": { transform: "scale(1.03)" },
                    transition: "transform 0.3s"
                  }}
                >
                  Book Ambulance Now
                </Button>
              </Grid>
            </Grid>
          </form>
          
          {/* Emergency Contact Info */}
          <Box sx={{ mt: 5, p: 3, bgcolor: "#f8f9fa", borderRadius: 2, border: "1px dashed #ccc" }}>
            <Typography variant="h6" color="error" gutterBottom fontWeight="bold">
              Need Immediate Assistance?
            </Typography>
            <Typography variant="body1">
              <strong>Call our emergency hotline:</strong> 1-800-AMBULANCE
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Our operators are available 24/7 to handle emergency situations with minimal response time.
            </Typography>
          </Box>
        </Box>
      </Paper>
      
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Your ambulance booking request has been received. We will contact you shortly!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AmbulanceBooking;