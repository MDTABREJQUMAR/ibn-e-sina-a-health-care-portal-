import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getservice } from "../slices/getService";
import { NavLink } from "react-router-dom";
import Loading from "../Loading";

const OurServicesPage = () => {
  const dispatch = useDispatch();
  const datas = useSelector((state) => state.service);
  const { service, isLoading, error } = datas;

  // Manually added services (Healthcare Services)
  const healthcareServices = [
    {
      image: "/images/cardiology.jpg",
      title: "Cardiology",
      description: "Advanced cardiac care and diagnostics for heart-related conditions.",
      features: ["ECG", "Echo", "Stress Test", "Angiography"],
      price: "Free",
    },
    {
      image: "/images/orthopedics.jpg",
      title: "Orthopedics",
      description: "Comprehensive orthopedic care and joint replacement.",
      features: ["Knee Replacement", "Hip Replacement", "Fracture Treatment"],
      price: "Free",
    },
    {
      image: "/images/neurology.jpg",
      title: "Neurology",
      description: "Expert care for neurological disorders and brain health.",
      features: ["EEG", "Stroke Treatment", "Brain Surgery"],
      price: "Free",
    },
    {
      image: "/images/Pediatrics.jpg",
      title: "Pediatrics",
      description: "Child healthcare services from newborn to adolescence.",
      features: ["Vaccination", "Growth Monitoring", "Pediatric Surgery"],
      price: "Free",
    },
  ];

  // Manually added services (Student Special Services)
  const studentServices = [
    {
      image: "/images/Library_Assistance.jpg",
      title: "Library Assistance",
      description: "Guidance and support for library resources and book search.",
      features: ["Digital Catalog", "Book Reservations", "Study Rooms"],
      price: "Free",
    },
    {
      image: "/images/Career_Counseling.jpg",
      title: "Career Counseling",
      description: "Helping students make informed career choices and prepare for placements.",
      features: ["Resume Building", "Mock Interviews", "Job Search Strategies"],
      price: "Free",
    },
    {
      image: "/images/mental_health.jpg",
      title: "Mental Health Support",
      description: "Psychological support and counseling for students.",
      features: ["One-on-One Counseling", "Group Therapy", "Stress Management Workshops"],
      price: "Free",
    },
    {
      image: "/images/skill_development.png",
      title: "Skill Development",
      description: "Technical and soft skills training for better career opportunities.",
      features: ["Coding Bootcamps", "Soft Skills Training", "Workshop Sessions"],
      price: "Free",
    },
  ];

  useEffect(() => {
    dispatch(getservice());
  }, [dispatch]);

  const combinedServices = [
    ...(service?.user_service || []),
    ...healthcareServices,
    ...studentServices,
  ];

  return (
    <>
      <Loading isloading={isLoading} />
      <Box py={6} sx={{ bgcolor: "#f5f5f5" }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4, fontWeight: "bold" }}>
            Our Specialty Services
          </Typography>
          <Grid container spacing={4}>
            {combinedServices.map((service, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    transition: "transform 0.3s",
                    cursor: "pointer",
                    "&:hover": { transform: "scale(1.05)" },
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                    borderRadius: "16px",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={service.image}
                    alt={service.title}
                    sx={{ borderRadius: "16px 16px 0 0" }}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                      {service.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                      {service.description}
                    </Typography>
                    <Typography variant="subtitle2" color="primary" sx={{ mb: 1 }}>
                      Features:
                    </Typography>
                    <ul>
                      {service.features.map((feature, index) => (
                        <li key={index}>
                          <Typography variant="body2">{feature}</Typography>
                        </li>
                      ))}
                    </ul>
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                      Price: {service.price}
                    </Typography>
                    <Box sx={{ p: 2 }}>
                      <NavLink
                        className='text-style'
                        to='/doctor'
                        style={{ textDecoration: 'none', color: 'blue', textTransform: 'lowercase' }}
                      >
                        consult with our experts
                      </NavLink>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default OurServicesPage;
