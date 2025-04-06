import React from "react";
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box, 
  Chip,
  Button,
  CardActions
} from "@mui/material";

const DoctorCard = ({ item }) => {
  return (
    <Card 
      elevation={3} 
      sx={{ 
        height: "100%",
        display: "flex", 
        flexDirection: "column",
        borderRadius: "12px",
        overflow: "hidden",
        transition: "box-shadow 0.3s ease",
        "&:hover": {
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
        }
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="220"
          image={item.image || "https://via.placeholder.com/300x220?text=Doctor"}
          alt={item.name}
          sx={{ objectFit: "cover" }}
        />
        {item.specialization && (
          <Chip
            label={item.specialization}
            color="primary"
            sx={{
              position: "absolute",
              bottom: "12px",
              right: "12px",
              fontWeight: "bold",
            }}
          />
        )}
      </Box>
      
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography 
          variant="h6" 
          component="h2" 
          gutterBottom
          sx={{ 
            fontWeight: 600,
            color: "#2c5282",
            mb: 1
          }}
        >
          {item.name}
        </Typography>
        
        {item.description && (
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ mb: 1 }}
          >
            {item.description}
          </Typography>
        )}

        {item.education && (
          <Typography 
            variant="body2" 
            sx={{ 
              fontStyle: "italic",
              color: "#718096",
              mb: 1
            }}
          >
            {item.education}
          </Typography>
        )}

        {/* Display any other fields from your item object here */}
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button 
          variant="contained" 
          fullWidth 
          sx={{ 
            borderRadius: "6px",
            boxShadow: "0 4px 12px rgba(49, 130, 206, 0.2)",
          }}
        >
          Book Appointment
        </Button>
      </CardActions>
    </Card>
  );
};

export default DoctorCard;