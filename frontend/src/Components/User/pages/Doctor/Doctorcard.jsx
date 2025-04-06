import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Skeleton from '@mui/material/Skeleton';
import { Link } from 'react-router-dom';

// Replace these with your actual imports
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import StarIcon from '@mui/icons-material/Star';
import VerifiedIcon from '@mui/icons-material/Verified';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import MessageIcon from '@mui/icons-material/Message';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Styled components for custom elements
const StyledCard = styled(Card)(({ theme, listView }) => ({
  display: listView ? 'flex' : 'block',
  height: '100%',
  overflow: 'hidden',
  position: 'relative',
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 8px 40px rgba(0, 0, 0, 0.08)',
  background: theme.palette.background.paper,
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.12)',
    '& .hover-reveal': {
      opacity: 1,
    },
  },
}));

const ImageOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: '200px',
  background: 'linear-gradient(0deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.4) 100%)',
  zIndex: 1,
}));

const StyledCardMedia = styled(CardMedia)(({ theme, listView }) => ({
  height: listView ? '100%' : 260,
  maxHeight: listView ? 'none' : 260,
  width: listView ? 180 : '100%',
  position: 'relative',
  transition: 'transform 0.6s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)',
  },
}));

const ContentBox = styled(Box)(({ theme, listView }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: listView ? '100%' : 'auto',
  position: 'relative',
  ...(listView ? { paddingRight: theme.spacing(2) } : {})
}));

const RatingChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  fontWeight: 'bold',
  height: 26,
  fontSize: '0.75rem',
  '& .MuiChip-icon': {
    color: '#FFD700',
  },
}));

const StatusTag = styled(Box)(({ theme, available }) => ({
  position: 'absolute',
  top: 16,
  right: 16,
  padding: '5px 10px',
  backgroundColor: available ? theme.palette.success.main : theme.palette.grey[300],
  color: available ? 'white' : theme.palette.text.secondary,
  borderRadius: 12,
  fontSize: '0.75rem',
  fontWeight: 'bold',
  zIndex: 2,
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  boxShadow: '0 2px 8px rgba(0,0,0,0.16)',
}));

const BadgeGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
  flexWrap: 'wrap',
}));

const SpecialtyBadge = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
  fontWeight: 500,
  borderRadius: 8,
}));

const ActionButton = styled(Button)(({ theme, primary }) => ({
  borderRadius: 25,
  padding: '10px 20px',
  fontWeight: 'bold',
  boxShadow: primary ? '0 4px 12px rgba(25, 118, 210, 0.3)' : 'none',
  transition: 'all 0.2s',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: primary ? '0 6px 16px rgba(25, 118, 210, 0.4)' : 'none',
  },
}));

export default function DoctorCard({ item, listView = false }) {
  const [loading, setLoading] = React.useState(true);
  const [favorite, setFavorite] = React.useState(false);
  
  // Extract or define properties with fallbacks
  const {
    name = 'Dr. Name Missing',
    image,
    _id,
    expertise = '',
    specialty = 'General Physician',
    location = 'New York Medical Center',
    experience = '10+ years',
    languages = ['English', 'Spanish'],
    available = true,
    nextAvailable = 'Today',
    acceptingNew = true
  } = item || {};
  
  // Rating for display
  const rating = item?.rating || 4.8;
  
  // Simulating image load
  React.useEffect(() => {
    if (image) {
      const img = new Image();
      img.src = image;
      img.onload = () => setLoading(false);
      
      // Fallback if image doesn't load after 3 seconds
      const timer = setTimeout(() => setLoading(false), 3000);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [image]);
  
  // Handle favorite toggle
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorite(!favorite);
  };

  // Grid card view (default)
  if (!listView) {
    return (
      <StyledCard elevation={2}>
        {/* Status indicator */}
        <StatusTag available={available}>
          {available ? (
            <>
              <CheckCircleIcon sx={{ fontSize: 16 }} />
              Available {nextAvailable}
            </>
          ) : 'Currently Unavailable'}
        </StatusTag>
        
        {/* Image with overlay */}
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          <ImageOverlay />
          {loading ? (
            <Skeleton 
              variant="rectangular" 
              width="100%" 
              height={260} 
              animation="wave" 
            />
          ) : (
            <StyledCardMedia
              component="img"
              image={image || 'https://via.placeholder.com/300x260?text=Doctor+Image'}
              alt={name}
              sx={{ objectFit: 'cover' }}
            />
          )}
          
          {/* Floating action buttons on image */}
          <Box 
            className="hover-reveal"
            sx={{ 
              position: 'absolute', 
              bottom: 12, 
              right: 12, 
              display: 'flex',
              gap: 1,
              opacity: 0.4,
              transition: 'opacity 0.3s ease'
            }}
          >
            <Tooltip title={favorite ? "Remove from favorites" : "Add to favorites"}>
              <IconButton 
                size="small"
                onClick={handleFavoriteClick}
                sx={{ 
                  backgroundColor: 'white', 
                  '&:hover': { backgroundColor: 'white' }
                }}
              >
                {favorite ? 
                  <FavoriteIcon fontSize="small" color="error" /> :
                  <FavoriteBorderIcon fontSize="small" />
                }
              </IconButton>
            </Tooltip>
            <Tooltip title="Share profile">
              <IconButton 
                size="small"
                sx={{ 
                  backgroundColor: 'white',
                  '&:hover': { backgroundColor: 'white' }
                }}
              >
                <ShareIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        
        {/* Content area */}
        <CardContent sx={{ pt: 3, pb: 2 }}>
          {/* Doctor basic info with rating */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Box>
              <Typography variant="h6" fontWeight="700" gutterBottom>
                {name}
                {acceptingNew && (
                  <Tooltip title="Accepting new patients">
                    <VerifiedIcon 
                      sx={{ 
                        ml: 1, 
                        verticalAlign: 'middle',
                        color: 'primary.main',
                        fontSize: 20
                      }} 
                    />
                  </Tooltip>
                )}
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
              >
                <LocationOnIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.disabled' }} />
                {location}
              </Typography>
            </Box>
            <RatingChip
              size="small"
              icon={<StarIcon />}
              label={rating}
            />
          </Box>
          
          {/* Specialty badges */}
          <BadgeGroup>
            <SpecialtyBadge
              label={specialty || expertise}
              size="small"
            />
            <Chip 
              label={`${experience} exp`} 
              size="small" 
              variant="outlined"
            />
          </BadgeGroup>
          
          {/* Languages */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
              Languages:
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {languages.map((lang, index) => (
                <Chip 
                  key={index}
                  label={lang}
                  size="small"
                  variant="outlined"
                  sx={{ height: 20, fontSize: '0.65rem' }}
                />
              ))}
            </Box>
          </Box>
          
          {/* Brief bio text */}
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {expertise || `Specialized in ${specialty} with ${experience} of experience in patient care, diagnosis and comprehensive treatment.`}
          </Typography>
          
          {/* Action buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto' }}>
            <ActionButton
              startIcon={<MessageIcon />}
              variant="outlined"
              size="small"
            >
              Message
            </ActionButton>
            <ActionButton
              startIcon={<CalendarTodayIcon />}
              variant="contained"
              primary="true"
              component={Link}
              to={`/form/${_id}`}
              size="small"
            >
              Book Now
            </ActionButton>
          </Box>
        </CardContent>
      </StyledCard>
    );
  }
  
  // List view layout
  return (
    <StyledCard listView={true} elevation={2}>
      {/* Image section */}
      <Box sx={{ position: 'relative', width: { xs: 120, sm: 180 }, flexShrink: 0 }}>
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height="100%" animation="wave" />
        ) : (
          <StyledCardMedia
            component="img"
            image={image || 'https://via.placeholder.com/180x240?text=Doctor+Image'}
            alt={name}
            listView={true}
            sx={{ objectFit: 'cover' }}
          />
        )}
        
        {/* Favorite button */}
        <IconButton 
          size="small"
          onClick={handleFavoriteClick}
          sx={{ 
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'white',
            '&:hover': { backgroundColor: 'white' },
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          {favorite ? 
            <FavoriteIcon fontSize="small" color="error" /> :
            <FavoriteBorderIcon fontSize="small" />
          }
        </IconButton>
      </Box>
      
      {/* Content section */}
      <ContentBox listView={true}>
        <CardContent sx={{ flex: '1 0 auto', py: 2 }}>
          {/* Header with name and rating */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Box>
              <Typography variant="h6" fontWeight="700">
                {name}
                {acceptingNew && (
                  <VerifiedIcon 
                    sx={{ 
                      ml: 1, 
                      verticalAlign: 'middle',
                      color: 'primary.main',
                      fontSize: 20
                    }} 
                  />
                )}
              </Typography>
              <Typography variant="body2" color="primary.main" gutterBottom>
                {specialty || expertise}
              </Typography>
            </Box>
            <RatingChip
              size="small"
              icon={<StarIcon />}
              label={rating}
            />
          </Box>
          
          {/* Info section */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Experience
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {experience}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Location
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {location}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Next Available
              </Typography>
              <Typography variant="body2" fontWeight={available ? "bold" : "medium"} color={available ? "success.main" : "text.primary"}>
                {nextAvailable}
              </Typography>
            </Box>
          </Box>
          
          {/* Tags */}
          <BadgeGroup sx={{ mb: 1 }}>
            {languages.map((lang, index) => (
              <Chip 
                key={index}
                label={lang}
                size="small"
                variant="outlined"
                sx={{ height: 24, fontSize: '0.7rem' }}
              />
            ))}
            <Chip 
              label="Online Consultation"
              size="small"
              color="primary"
              variant="outlined"
              sx={{ height: 24, fontSize: '0.7rem' }}
            />
          </BadgeGroup>
        </CardContent>
        
        {/* Actions */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'flex-end',
          p: 2,
          pt: 0,
          gap: 2
        }}>
          <ActionButton
            variant="outlined"
            size="small"
            startIcon={<MessageIcon />}
          >
            Message
          </ActionButton>
          <ActionButton
            variant="contained"
            primary="true"
            component={Link}
            to={`/form/${_id}`}
            startIcon={<CalendarTodayIcon />}
            size="small"
          >
            Book Appointment
          </ActionButton>
        </Box>
      </ContentBox>
    </StyledCard>
  );
}