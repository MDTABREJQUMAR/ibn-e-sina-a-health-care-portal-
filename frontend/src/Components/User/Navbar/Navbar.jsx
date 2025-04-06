import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  useTheme,
  useMediaQuery,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  Container,
  Divider,
  Badge,
  IconButton,
  Fade,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Drawer from "./Drawor";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../slices/Loginslice";
import logo from "../assets/logo.png";

// Import Material UI Icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HomeIcon from '@mui/icons-material/Home';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AmbulanceIcon from '@mui/icons-material/DirectionsCar';
import InfoIcon from '@mui/icons-material/Info';
import ContactsIcon from '@mui/icons-material/Contacts';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

// Custom styled components
const NavButton = styled(Button)(({ theme, active }) => ({
  borderRadius: '8px',
  padding: '8px 16px',
  textTransform: 'none',
  fontWeight: active ? 600 : 500,
  color: active ? theme.palette.primary.main : theme.palette.text.primary,
  backgroundColor: active ? `${theme.palette.primary.main}10` : 'transparent',
  '&:hover': {
    backgroundColor: `${theme.palette.primary.main}15`,
    color: theme.palette.primary.main,
  },
  transition: 'all 0.2s ease-in-out',
}));

const ActionButton = styled(Button)(({ theme, variant }) => ({
  borderRadius: '28px',
  padding: variant === 'contained' ? '8px 24px' : '6px 20px',
  textTransform: 'none',
  fontWeight: 500,
  boxShadow: variant === 'contained' ? '0 4px 14px rgba(76, 175, 80, 0.25)' : 'none',
  '&:hover': {
    boxShadow: variant === 'contained' ? '0 6px 18px rgba(76, 175, 80, 0.35)' : 'none',
  },
  transition: 'all 0.2s ease-in-out',
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    fontSize: 10,
    height: 18,
    minWidth: 18,
    padding: '0 5px',
  },
}));

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((state) => state.login);
  
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const open = Boolean(anchorEl);
  const notificationsOpen = Boolean(notificationAnchor);

  const token = localStorage.getItem("jwt");
  const is_admin = localStorage.getItem("is_admin");
  const username = localStorage.getItem("user");
  
  // Check if the current path matches the nav item path
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    handleClose();
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // In a real app, you'd dispatch an action to change the theme
  };

  // Main navigation items with icons
  const navItems = [
    { name: "Home", path: "/", icon: <HomeIcon fontSize="small" /> },
    { name: "Doctors", path: "/doctor", icon: <LocalHospitalIcon fontSize="small" /> },
    { name: "Services", path: "/services", icon: <MedicalServicesIcon fontSize="small" /> },
    { name: "Ambulance", path: "/ambulance-booking", icon: <AmbulanceIcon fontSize="small" /> },
    { name: "About", path: "/about", icon: <InfoIcon fontSize="small" /> },
    { name: "Contact", path: "/contact", icon: <ContactsIcon fontSize="small" /> },
  ];

  // Sample notifications
  const notifications = [
    { id: 1, title: "Appointment Confirmed", message: "Your appointment with Dr. Smith is confirmed for tomorrow at 10:00 AM", read: false },
    { id: 2, title: "Lab Results Available", message: "Your recent lab test results are now available", read: false },
    { id: 3, title: "Prescription Refill", message: "Your prescription refill request has been processed", read: true },
  ];

  // Color palette - Soothing Healthcare Green
  const primaryColor = "#4CAF50"; // Vibrant green
  const secondaryColor = "#FAFFF8"; // Very light green tint
  
  return (
    <AppBar 
      elevation={scrolled ? 2 : 0} 
      sx={{ 
        background: secondaryColor,
        position: "sticky", 
        top: 0,
        transition: 'all 0.3s ease',
        borderBottom: scrolled ? 'none' : '1px solid #E0E0E0',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: scrolled ? '68px' : '76px', transition: 'height 0.3s ease' }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
            <img
              style={{
                width: 150,
                height: 30,
                transition: 'all 0.3s ease',
              }}
              src={logo}
              alt="Healthcare Logo"
            />
          </Box>

          {isMatch ? (
            <Drawer />
          ) : (
            <>
              {/* Navigation Links */}
              <Box sx={{ display: 'flex', gap: 1 }}>
                {navItems.map((item) => (
                  <NavButton
                    key={item.name}
                    component={NavLink}
                    to={item.path}
                    active={isActive(item.path) ? 1 : 0}
                    startIcon={item.icon}
                  >
                    {item.name}
                  </NavButton>
                ))}
              </Box>

              {/* Authentication Section */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 'auto' }}>
                {/* Theme Toggle */}
                <IconButton 
                  onClick={toggleDarkMode} 
                  size="small" 
                  sx={{ 
                    color: 'text.secondary',
                    backgroundColor: 'rgba(0,0,0,0.04)',
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.08)' },
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                  }}
                >
                  {darkMode ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
                </IconButton>

                {token && is_admin === "false" ? (
                  <>
                    {/* Notifications */}
                    <Tooltip title="Notifications">
                      <IconButton 
                        onClick={handleNotificationClick}
                        size="small"
                        sx={{ 
                          color: 'text.secondary',
                          backgroundColor: notificationsOpen ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.04)',
                          '&:hover': { backgroundColor: 'rgba(0,0,0,0.08)' },
                          borderRadius: '50%',
                          width: 40,
                          height: 40,
                        }}
                      >
                        <StyledBadge badgeContent={notifications.filter(n => !n.read).length}>
                          <NotificationsIcon fontSize="small" />
                        </StyledBadge>
                      </IconButton>
                    </Tooltip>
                    
                    <Menu
                      id="notification-menu"
                      anchorEl={notificationAnchor}
                      open={notificationsOpen}
                      onClose={handleNotificationClose}
                      TransitionComponent={Fade}
                      PaperProps={{
                        elevation: 3,
                        sx: { 
                          width: 320,
                          maxHeight: 400,
                          mt: 1.5,
                          borderRadius: '12px',
                          overflow: 'hidden',
                        }
                      }}
                      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                      <Box sx={{ p: 2, borderBottom: '1px solid #eaeaea' }}>
                        <Typography variant="subtitle1" fontWeight={600}>Notifications</Typography>
                      </Box>
                      
                      {notifications.length === 0 ? (
                        <Box sx={{ p: 3, textAlign: 'center' }}>
                          <Typography variant="body2" color="text.secondary">No new notifications</Typography>
                        </Box>
                      ) : (
                        <>
                          {notifications.map((notification) => (
                            <MenuItem 
                              key={notification.id} 
                              onClick={handleNotificationClose}
                              sx={{ 
                                p: 2, 
                                borderLeft: notification.read ? 'none' : `3px solid ${primaryColor}`,
                                backgroundColor: notification.read ? 'inherit' : 'rgba(76, 175, 80, 0.05)',
                              }}
                            >
                              <Box>
                                <Typography variant="subtitle2" fontWeight={notification.read ? 500 : 600}>
                                  {notification.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                  {notification.message}
                                </Typography>
                              </Box>
                            </MenuItem>
                          ))}
                          
                          <Box sx={{ p: 1.5, borderTop: '1px solid #eaeaea', textAlign: 'center' }}>
                            <Typography 
                              variant="body2" 
                              color="primary" 
                              sx={{ 
                                cursor: 'pointer', 
                                '&:hover': { textDecoration: 'underline' } 
                              }}
                            >
                              View all notifications
                            </Typography>
                          </Box>
                        </>
                      )}
                    </Menu>

                    {/* User Profile Button */}
                    <Tooltip title={username || "User Profile"}>
                      <Button
                        id="profile-button"
                        aria-controls={open ? "profile-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                        endIcon={<KeyboardArrowDownIcon sx={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none' }} />}
                        sx={{ 
                          borderRadius: "28px",
                          padding: "6px 8px 6px 6px",
                          backgroundColor: open ? `${primaryColor}15` : `${primaryColor}08`,
                          color: 'text.primary',
                          "&:hover": {
                            backgroundColor: `${primaryColor}15`,
                          },
                          textTransform: 'none',
                        }}
                      >
                        <Avatar 
                          sx={{ 
                            width: 32, 
                            height: 32, 
                            bgcolor: primaryColor,
                            fontSize: '1rem',
                            mr: 1
                          }}
                        >
                          {username?.charAt(0).toUpperCase() || 'U'}
                        </Avatar>
                        <Typography variant="body2" fontWeight={500} sx={{ display: { xs: 'none', sm: 'block' } }}>
                          {username ? username.split(' ')[0] : "Profile"}
                        </Typography>
                      </Button>
                    </Tooltip>

                    <Menu
                      id="profile-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      TransitionComponent={Fade}
                      PaperProps={{
                        elevation: 3,
                        sx: { 
                          minWidth: '220px',
                          mt: 1.5,
                          borderRadius: '12px',
                          overflow: 'hidden',
                        }
                      }}
                      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                      <Box sx={{ p: 2.5, textAlign: 'center', borderBottom: '1px solid #eaeaea' }}>
                        <Avatar 
                          sx={{ 
                            width: 60, 
                            height: 60, 
                            bgcolor: primaryColor,
                            fontSize: '1.5rem',
                            mx: 'auto',
                            mb: 1
                          }}
                        >
                          {username?.charAt(0).toUpperCase() || 'U'}
                        </Avatar>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {username || "User"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Patient
                        </Typography>
                      </Box>
                      
                      <MenuItem 
                        component={NavLink} 
                        to="/appointment"
                        onClick={handleClose}
                        sx={{ py: 1.5, px: 2.5, gap: 2 }}
                      >
                        <CalendarTodayIcon fontSize="small" color="action" />
                        <Typography variant="body2">My Appointments</Typography>
                      </MenuItem>
                      
                      <MenuItem 
                        component={NavLink} 
                        to="/userprofile"
                        onClick={handleClose}
                        sx={{ py: 1.5, px: 2.5, gap: 2 }}
                      >
                        <AccountCircleIcon fontSize="small" color="action" />
                        <Typography variant="body2">Profile Settings</Typography>
                      </MenuItem>
                      
                      <Divider sx={{ my: 1 }} />
                      
                      <MenuItem 
                        onClick={handleLogout}
                        sx={{ py: 1.5, px: 2.5, color: 'error.main' }}
                      >
                        <Typography variant="body2" fontWeight={500}>Sign Out</Typography>
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Box sx={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <ActionButton
                      variant="outlined"
                      color="primary"
                      onClick={handleClick}
                      startIcon={<LoginIcon />}
                      sx={{ 
                        borderColor: 'rgba(76, 175, 80, 0.5)',
                        color: primaryColor,
                        '&:hover': {
                          borderColor: primaryColor,
                          backgroundColor: 'rgba(76, 175, 80, 0.08)',
                        }
                      }}
                    >
                      Login
                    </ActionButton>
                    
                    <Menu
                      id="login-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      TransitionComponent={Fade}
                      PaperProps={{
                        elevation: 3,
                        sx: { 
                          minWidth: '200px',
                          mt: 1.5,
                          borderRadius: '12px',
                          overflow: 'hidden',
                        }
                      }}
                      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                      <Box sx={{ p: 2, borderBottom: '1px solid #eaeaea' }}>
                        <Typography variant="subtitle2" fontWeight={600}>Choose an Account Type</Typography>
                      </Box>
                      
                      <MenuItem
                        component={NavLink}
                        to="/login"
                        onClick={handleClose}
                        sx={{ py: 2, px: 2.5 }}
                      >
                        <Typography variant="body2">Login as Patient</Typography>
                      </MenuItem>
                      
                      <MenuItem
                        component={NavLink}
                        to="/doctorlogin"
                        onClick={handleClose}
                        sx={{ py: 2, px: 2.5 }}
                      >
                        <Typography variant="body2">Login as Doctor</Typography>
                      </MenuItem>
                    </Menu>
                    
                    <ActionButton
                      variant="contained"
                      color="primary"
                      component={Link}
                      to="/SignUp"
                      startIcon={<PersonAddIcon />}
                      sx={{ 
                        backgroundColor: primaryColor,
                        '&:hover': {
                          backgroundColor: '#3d8b40',
                        }
                      }}
                    >
                      Sign Up
                    </ActionButton>
                  </Box>
                )}
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;