import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Divider, 
  Chip, 
  Stack, 
  styled 
} from '@mui/material';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Heart, 
  Facebook, 
  Linkedin, 
  Github,
  User,
  Calendar,
  MessageSquare,
  Activity
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

// Styled components
const IconWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: '50%',
  width: 40,
  height: 40,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: theme.spacing(2),
  '& svg': {
    color: theme.palette.primary.contrastText,
  },
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: theme.shadows[3],
  }
}));

const SocialIconWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  borderRadius: '50%',
  width: 36,
  height: 36,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: theme.spacing(2),
  '& svg': {
    color: theme.palette.secondary.main,
  },
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
    '& svg': {
      color: theme.palette.secondary.contrastText,
    },
  }
}));

const StyledLink = styled('a')(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  transition: 'color 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    color: theme.palette.primary.main,
  }
}));

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  transition: 'color 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1),
  '&:hover': {
    color: theme.palette.primary.main,
  }
}));

const ServiceIcon = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(1),
  '& svg': {
    color: theme.palette.primary.main,
  }
}));

// Copyright function
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {'Developed with '}
      <Heart size={16} style={{ margin: '0 4px', color: '#f06292' }} />
      {' by '}
      <strong>
        <a 
          href="#" 
          target="_blank" 
          rel="noreferrer noopener"
          style={{ color: 'inherit', textDecoration: 'none', marginLeft: '4px' }}
        >
          Tanzeel, Tabrej, Mohibullah
        </a>
      </strong>
      {' | Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: '#f5f7fa', color: 'text.secondary', mt: 6, pb: 3, borderTop: '1px solid #e0e0e0' }}>
      <Container maxWidth="xl">
        <Grid container spacing={4} sx={{ py: 4 }}>
          {/* Organization Info */}
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <IconWrapper>
                <Activity size={20} />
              </IconWrapper>
              <Typography variant="h6" component="div">
                Ibn-e-Sina Health Center
              </Typography>
            </Box>
            
            <Divider sx={{ mb: 3 }} />
            
            <Stack spacing={2}>
              <StyledLink href="#" underline="none">
                <IconWrapper>
                  <MapPin size={18} />
                </IconWrapper>
                <Typography variant="body2">MANUU, Hyderabad, India</Typography>
              </StyledLink>
              
              <StyledLink href="mailto:kasalariyaz786@gmail.com" underline="none">
                <IconWrapper>
                  <Mail size={18} />
                </IconWrapper>
                <Typography variant="body2">kasalariyaz786@gmail.com</Typography>
              </StyledLink>
              
              <StyledLink href="tel:+917702135771" underline="none">
                <IconWrapper>
                  <Phone size={18} />
                </IconWrapper>
                <Typography variant="body2">+91 7702135771</Typography>
              </StyledLink>
            </Stack>
          </Grid>

          {/* Services */}
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ mb: 3 }}>
              <Divider>
                <Chip 
                  label="Our Services" 
                  color="primary" 
                  sx={{ fontWeight: 'medium', px: 2 }} 
                />
              </Divider>
            </Box>
            
            <Stack spacing={1}>
              <StyledNavLink to="/doctor">
                <ServiceIcon>
                  <User size={18} />
                </ServiceIcon>
                Find a Doctor
              </StyledNavLink>
              
              <StyledNavLink to="/services">
                <ServiceIcon>
                  <Activity size={18} />
                </ServiceIcon>
                All Services
              </StyledNavLink>
              
              <StyledNavLink to="/doctor">
                <ServiceIcon>
                  <Calendar size={18} />
                </ServiceIcon>
                Make an Appointment
              </StyledNavLink>
              
              <StyledNavLink to="/contact">
                <ServiceIcon>
                  <MessageSquare size={18} />
                </ServiceIcon>
                Contact Us
              </StyledNavLink>
            </Stack>
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ mb: 3 }}>
              <Divider>
                <Chip 
                  label="Find Us on Social Media" 
                  color="primary" 
                  sx={{ fontWeight: 'medium', px: 2 }} 
                />
              </Divider>
            </Box>
            
            <Stack spacing={2}>
              <StyledLink href="#" target="_blank" rel="noopener noreferrer">
                <SocialIconWrapper>
                  <Facebook size={18} />
                </SocialIconWrapper>
                <Typography variant="body2">Facebook</Typography>
              </StyledLink>
              
              <StyledLink href="#" target="_blank" rel="noopener noreferrer">
                <SocialIconWrapper>
                  <Linkedin size={18} />
                </SocialIconWrapper>
                <Typography variant="body2">LinkedIn</Typography>
              </StyledLink>
              
              <StyledLink href="#" target="_blank" rel="noopener noreferrer">
                <SocialIconWrapper>
                  <Github size={18} />
                </SocialIconWrapper>
                <Typography variant="body2">GitHub</Typography>
              </StyledLink>
            </Stack>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 2 }} />
        
        <Copyright />
      </Container>
    </Box>
  );
};

export default Footer;