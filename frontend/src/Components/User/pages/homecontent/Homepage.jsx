import React,{useState} from "react";
import { Box, Container, Grid, Typography, Avatar, Card, CardContent, Divider, useTheme, useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";
import Departments from "./Departments";
import Slider from "../homecontent/Slider";
import Gallery from "./Gallery";
import { Building, GraduationCap, BookOpen, Award, Users, Code, Database, Server, Globe, ShieldCheck, Microscope, Network } from "lucide-react";

// Import images
import vcImg from "../../assets/VC.png";
import inchargeImg from "../../assets/Dr_Riyaz.jpg";
import bgWelcome from "../../assets/ibne-sina.jpeg";
import Slider2 from "../../../Doctor/components/slider2";
import { useNavigate } from "react-router-dom";

// Styled components for better design consistency
const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: "#5A2F8E",
  marginBottom: theme.spacing(4),
  position: "relative",
  display: "inline-block",
  paddingBottom: theme.spacing(1),
  "&::after": {
    content: '""',
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "60px",
    height: "4px",
    backgroundColor: "#5A2F8E",
  },
}));

const MessageCard = styled(Card)(({ theme }) => ({
  height: "100%",
  borderRadius: theme.spacing(2),
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  overflow: "hidden",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 15px 35px rgba(90, 47, 142, 0.15)",
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(90, 47, 142, 0.1)",
  borderRadius: "50%",
  width: "60px",
  height: "60px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(2),
  transition: "all 0.3s ease",
  "& svg": {
    color: "#5A2F8E",
    transition: "all 0.3s ease",
  },
  "&:hover": {
    backgroundColor: "#5A2F8E",
    transform: "translateY(-5px)",
    boxShadow: "0 10px 20px rgba(90, 47, 142, 0.2)",
    "& svg": {
      color: "white",
    },
  },
}));

const Homepage = () => {
  const navigate=useNavigate()
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ overflow: "hidden" }}>
      {/* Hero Section with Slider */}
      <Box sx={{ mb: 6 }}>
        <Slider />
      </Box>

      <Container maxWidth="lg">
        {/* Welcome Section */}
        <Box
          sx={{
            position: "relative",
            mb: 8,
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "0 15px 50px rgba(0, 0, 0, 0.08)",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${bgWelcome})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.15,
              zIndex: 0,
            }}
          />
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              padding: { xs: 4, md: 6 },
              backgroundColor: "rgba(255, 255, 255, 0.85)",
            }}
          >
            <SectionTitle variant="h4">
              Welcome To <span style={{ color: "#5A2F8E" }}>Ibn-E-Seena Hospital</span>
            </SectionTitle>

            <Typography 
              variant="body1" 
              sx={{ 
                fontSize: "18px", 
                color: "#333", 
                textAlign: "justify",
                lineHeight: 1.8,
                maxWidth: "900px"
              }}
            >
              <strong>Ibn-e-Seena Hospital</strong> combines 25+ years of excellence with compassionate, 
              personalized care. Our state-of-the-art healthcare facility offers exceptional medical 
              services with <strong> 24/7</strong> availability from our highly 
              trained professionals.
              <Box sx={{ my: 2 }} />
              From preventive medicine to basic surgical procedures, our comprehensive range of services 
              ensures a seamless and comfortable healing experience for all patients. We're committed to 
              delivering top-quality healthcare with modern technology and a patient-centered approach.
            </Typography>
          </Box>
        </Box>

        {/* University and Department Section */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ mb: 5 }}>
            <SectionTitle variant="h4" sx={{ textAlign: "center", mb: 5, mx: "auto" }}>
              Our University & Department
              <Box sx={{ 
                "&::after": { 
                  left: "50%", 
                  transform: "translateX(-50%)",
                  width: "80px" 
                } 
              }} />
            </SectionTitle>
          </Box>
          
          <Grid container spacing={4}>
            {/* University Card */}
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                height: "100%", 
                borderRadius: 4, 
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "8px",
                  background: "linear-gradient(90deg, #5A2F8E 0%, #9370DB 100%)",
                }
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <IconWrapper>
                      <Building size={32} />
                    </IconWrapper>
                    <Typography variant="h5" sx={{ ml: 2, fontWeight: "bold", color: "#5A2F8E" }}>
                      About the University
                    </Typography>
                  </Box>
                  
                  <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: "#333" }}>
                    Maulana Azad National Urdu University (MANUU) is a central university established by an Act of the Indian Parliament in 1998, with all India Jurisdiction, to promote and impart research, vocational, and technical education through regular and distance modes.
                  </Typography>
                  
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={6}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Box sx={{ 
                          mr: 1.5, 
                          color: "#5A2F8E",
                          display: "flex",
                          alignItems: "center",
                        }}>
                          <BookOpen size={20} />
                        </Box>
                        <Typography variant="body2" fontWeight="medium">7 Schools of Studies</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Box sx={{ 
                          mr: 1.5, 
                          color: "#5A2F8E",
                          display: "flex",
                          alignItems: "center",
                        }}>
                          <Users size={20} />
                        </Box>
                        <Typography variant="body2" fontWeight="medium">19 Departments</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Box sx={{ 
                          mr: 1.5, 
                          color: "#5A2F8E",
                          display: "flex",
                          alignItems: "center",
                        }}>
                          <GraduationCap size={20} />
                        </Box>
                        <Typography variant="body2" fontWeight="medium">8 Colleges of Teacher Education</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Box sx={{ 
                          mr: 1.5, 
                          color: "#5A2F8E",
                          display: "flex",
                          alignItems: "center",
                        }}>
                          <Award size={20} />
                        </Box>
                        <Typography variant="body2" fontWeight="medium">'A+' Grade from NAAC</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            
            {/* Department Card */}
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                height: "100%", 
                borderRadius: 4, 
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "8px",
                  background: "linear-gradient(90deg, #9370DB 0%, #5A2F8E 100%)",
                }
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <IconWrapper>
                      <Code size={32} />
                    </IconWrapper>
                    <Typography variant="h5" sx={{ ml: 2, fontWeight: "bold", color: "#5A2F8E" }}>
                      About the Department
                    </Typography>
                  </Box>
                  
                  <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: "#333" }}>
                    The Department of Computer Science & Information Technology (CS&IT) under the 'School of Technology' was established in 2006. The department has state-of-the-art ICT infrastructure offering B.Tech, M.Tech, MCA, and PhD programs in CS/IT.
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1, color: "#5A2F8E" }}>
                      Research Areas
                    </Typography>
                    <Grid container spacing={1}>
                      {[
                        { icon: <Globe size={18} />, text: "Machine Translation" },
                        { icon: <Server size={18} />, text: "Adaptive Systems" },
                        { icon: <Database size={18} />, text: "Personalized Learning" },
                        { icon: <Microscope size={18} />, text: "Bio-informatics" },
                        { icon: <ShieldCheck size={18} />, text: "Security" },
                        { icon: <Network size={18} />, text: "Networking" }
                      ].map((item, index) => (
                        <Grid item xs={6} key={index}>
                          <Box sx={{ 
                            display: "flex", 
                            alignItems: "center", 
                            backgroundColor: "rgba(90, 47, 142, 0.05)",
                            p: 1,
                            borderRadius: 1,
                            mb: 1
                          }}>
                            <Box sx={{ 
                              mr: 1, 
                              color: "#5A2F8E",
                              display: "flex",
                              alignItems: "center"
                            }}>
                              {item.icon}
                            </Box>
                            <Typography variant="body2">{item.text}</Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Messages Section */}
        <Box sx={{ mb: 8 }}>
          <SectionTitle variant="h4" sx={{ textAlign: "center", mb: 5, mx: "auto" }}>
            Leadership Insights
            <Box sx={{ 
              "&::after": { 
                left: "50%", 
                transform: "translateX(-50%)",
                width: "80px" 
              } 
            }} />
          </SectionTitle>
          
          <Grid container spacing={4}>
            {/* VC Message */}
            <Grid item xs={12} md={6}>
              <MessageCard elevation={0}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <Avatar 
                      src={vcImg} 
                      alt="Vice Chancellor" 
                      variant="rounded"
                      sx={{ 
                        width: 80, 
                        height: 80, 
                        borderRadius: 2,
                        border: "3px solid #5A2F8E" 
                      }} 
                    />
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="h6" fontWeight="bold">
                        Prof. Vice Chancellor
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary">
                        MANUU
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Divider sx={{ mb: 3 }} />
                  
                  <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#333" }}>
                    It is my privilege to welcome you to <strong>Ibn-e-Seena Hospital</strong>, where we combine
                    cutting-edge medical technology with a team of highly skilled and compassionate 
                    professionals to provide you with unparalleled healthcare.
                    <Box sx={{ my: 2 }} />
                    Our commitment to excellence is driven by our patient-centered values. Thank you 
                    for trusting us on your journey to wellness.
                  </Typography>
                </CardContent>
              </MessageCard>
            </Grid>

            {/* Incharge Message */}
            <Grid item xs={12} md={6}>
              <MessageCard elevation={0}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <Avatar 
                      src={inchargeImg} 
                      alt="Dr. Riyaz" 
                      variant="rounded"
                      sx={{ 
                        width: 80, 
                        height: 80, 
                        borderRadius: 2,
                        border: "3px solid #5A2F8E" 
                      }} 
                    />
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="h6" fontWeight="bold">
                        Dr. Riyaz
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary">
                        Incharge, Ibn-e-Seena Hospital
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Divider sx={{ mb: 3 }} />
                  
                  <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#333" }}>
                    I trust this message finds you in good health and high spirits. As we continue 
                    evolving, our focus remains on delivering exceptional care with compassion.
                    <Box sx={{ my: 2 }} />
                    Your trust and support inspire us to keep striving for excellence every day.
                  </Typography>
                </CardContent>
              </MessageCard>
            </Grid>
          </Grid>
        </Box>

        {/* Departments Section */}
        <Box sx={{ mb: 8 }}>
          <SectionTitle variant="h4" sx={{ textAlign: "center", mb: 5, mx: "auto" }}>
             Gallery
            <Box sx={{ 
              "&::after": { 
                left: "50%", 
                transform: "translateX(-50%)",
                width: "80px" 
              } 
            }} />
            
            <Slider2/>
          </SectionTitle>
          
          <Departments />
        </Box>

        {/* Gallery Section */}
        <Box sx={{ mb: 8 }}>
          <SectionTitle variant="h4" sx={{ textAlign: "center", mb: 5, mx: "auto" }}>
            Gallery
            <Box sx={{ 
              "&::after": { 
                left: "50%", 
                transform: "translateX(-50%)",
                width: "80px" 
              } 
            }} />
          </SectionTitle>
          
          <Box sx={{ 
            p: { xs: 0, md: 2 }, 
            borderRadius: 4, 
            overflow: "hidden",
          }}>
            <Gallery />
          </Box>
        </Box>

        {/* Statistics/Features Section */}
        <Box sx={{ mb: 8 }}>
          <Grid container spacing={3}>
            {[
              { number: "25+", text: "Years of Excellence" },
              { number: "10", text: "Hospital Beds" },
              { number: "24/7", text: "Emergency Service" },
              { number: "100%", text: "Patient Commitment" }
            ].map((item, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box sx={{ 
                  bgcolor: "#f8f5fe", 
                  borderRadius: 3, 
                  p: 3, 
                  textAlign: "center",
                  border: "1px solid rgba(90, 47, 142, 0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 30px rgba(90, 47, 142, 0.1)",
                    bgcolor: "#5A2F8E",
                    "& .statNumber": { color: "white" },
                    "& .statText": { color: "white" }
                  }
                }}>
                  <Typography 
                    variant="h3" 
                    sx={{ fontWeight: "bold", color: "#5A2F8E", mb: 1 }}
                    className="statNumber"
                  >
                    {item.number}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ color: "#666" }}
                    className="statText"
                  >
                    {item.text}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Call to Action */}
        <Box 
          sx={{ 
            mb: 8, 
            textAlign: "center", 
            p: { xs: 4, md: 6 }, 
            borderRadius: 4,
            bgcolor: "#5A2F8E",
            color: "white",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <Box sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage: `url(${bgWelcome})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0
          }} />
          
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
              Your Health Is Our Priority
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, fontWeight: "normal" }}>
              Schedule an appointment today and experience exceptional care at Ibn-E-Seena Hospital
            </Typography>
            <Box 
              component="button"
              sx={{
                bgcolor: "white",
                color: "#5A2F8E",
                py: 1.5,
                px: 4,
                fontSize: "18px",
                fontWeight: "bold",
                borderRadius: "50px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.15)"
                }
              }}
              onClick={()=>navigate('/doctor')}
            >
              Book Appointment
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Homepage;