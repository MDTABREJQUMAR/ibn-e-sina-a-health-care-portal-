import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Skeleton from "@mui/material/Skeleton";
import { Link, useNavigate } from "react-router-dom";

// Icons
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import StarIcon from "@mui/icons-material/Star";
import VerifiedIcon from "@mui/icons-material/Verified";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import MessageIcon from "@mui/icons-material/Message";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// Enhanced styled components
const StyledCard = styled(Card)(({ theme, listView }) => ({
  display: listView ? "flex" : "block",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  borderRadius: theme.shape.borderRadius * 2,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
  border: `1px solid ${alpha(theme.palette.divider, 0.05)}`,
  background: theme.palette.background.paper,
  "&:hover": {
    transform: "translateY(-6px)",
    boxShadow: "0 16px 40px rgba(0, 0, 0, 0.09)",
    "& .hover-content": {
      opacity: 1,
    },
    "& .card-media": {
      transform: "scale(1.04)",
    },
  },
}));

const ImageOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: "100%",
  background: "linear-gradient(0deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.5) 100%)",
  zIndex: 1,
}));

const StyledCardMedia = styled(CardMedia)(({ theme, listView }) => ({
  height: listView ? "100%" : 240,
  maxHeight: listView ? "none" : 240,
  width: listView ? 200 : "100%",
  position: "relative",
  transition: "transform 0.6s ease-in-out",
  "&.card-media": {
    transition: "transform 0.5s ease-out",
  },
}));

const ContentBox = styled(Box)(({ theme, listView }) => ({
  display: "flex",
  flexDirection: "column",
  width: listView ? "100%" : "auto",
  position: "relative",
  justifyContent: "space-between",
  ...(listView ? { paddingRight: theme.spacing(2) } : {}),
}));

const RatingChip = styled(Chip)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.main, 0.9),
  color: theme.palette.primary.contrastText,
  fontWeight: "bold",
  height: 28,
  fontSize: "0.75rem",
  "& .MuiChip-icon": {
    color: "#FFD700",
  },
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
}));

const StatusTag = styled(Box)(({ theme, available }) => ({
  position: "absolute",
  top: 16,
  right: 16,
  padding: "6px 12px",
  backgroundColor: available
    ? alpha(theme.palette.success.main, 0.9)
    : alpha(theme.palette.grey[700], 0.7),
  color: theme.palette.common.white,
  borderRadius: 16,
  fontSize: "0.75rem",
  fontWeight: "bold",
  zIndex: 2,
  display: "flex",
  alignItems: "center",
  gap: 4,
  backdropFilter: "blur(4px)",
  boxShadow: "0 2px 8px rgba(0,0,0,0.16)",
}));

const BadgeGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
  flexWrap: "wrap",
}));

const SpecialtyBadge = styled(Chip)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  fontWeight: 600,
  borderRadius: 12,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
}));

const ActionButton = styled(Button)(({ theme, primary }) => ({
  borderRadius: 30,
  padding: "8px 16px",
  fontWeight: 600,
  textTransform: "none",
  boxShadow: primary ? "0 4px 10px rgba(25, 118, 210, 0.2)" : "none",
  transition: "all 0.2s",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: primary ? "0 6px 12px rgba(25, 118, 210, 0.3)" : "none",
  },
}));

const FloatingActionsContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 12,
  right: 12,
  display: "flex",
  gap: 8,
  opacity: 0,
  transition: "opacity 0.3s ease",
  zIndex: 5,
}));

const FloatingActionButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.common.white, 0.9),
  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
  "&:hover": {
    backgroundColor: theme.palette.common.white,
    transform: "scale(1.1)",
  },
  transition: "transform 0.2s ease",
}));

// Enhanced component
export default function DoctorCard({ item, listView = false }) {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [favorite, setFavorite] = React.useState(false);

  // Extract properties with fallbacks
  const {
    name = "Dr. Name Missing",
    image,
    _id,
    expertise = "",
    specialty = "",
    location = "MANUU Hyderabad",
    experience = "10+ years",
    languages = ["English", "Hindi", "Urdu"],
    available = true,
    nextAvailable = "Today",
    acceptingNew = true,
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
      <StyledCard elevation={1}>
        {/* Status indicator */}
        <StatusTag available={available}>
          {available ? (
            <>
              <CheckCircleIcon sx={{ fontSize: 14 }} />
              Available {nextAvailable}
            </>
          ) : (
            "Currently Unavailable"
          )}
        </StatusTag>

        {/* Image with overlay */}
        <Box sx={{ position: "relative", overflow: "hidden" }}>
          <ImageOverlay />
          {loading ? (
            <Skeleton
              variant="rectangular"
              width="100%"
              height={240}
              animation="wave"
            />
          ) : (
            <StyledCardMedia
  component="img"
  image={
    image || "https://via.placeholder.com/300x240?text=Doctor+Image"
  }
  alt={name}
  className="card-media"
  sx={{ 
    height: "240px", 
    objectFit: "cover", 
    objectPosition: "top"  // This ensures the top of the image is always visible
  }}
/>
          )}

          {/* Floating action buttons on image */}
          <FloatingActionsContainer className="hover-content">
            <Tooltip
              title={favorite ? "Remove from favorites" : "Add to favorites"}
            >
              <FloatingActionButton size="small" onClick={handleFavoriteClick}>
                {favorite ? (
                  <FavoriteIcon fontSize="small" color="error" />
                ) : (
                  <FavoriteBorderIcon fontSize="small" />
                )}
              </FloatingActionButton>
            </Tooltip>
            <Tooltip title="Share profile">
              <FloatingActionButton size="small">
                <ShareIcon fontSize="small" />
              </FloatingActionButton>
            </Tooltip>
          </FloatingActionsContainer>
        </Box>

        {/* Content area */}
        <CardContent sx={{ pt: 2.5, pb: 2.5 }}>
          {/* Doctor basic info with rating */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 1.5,
              alignItems: "flex-start",
            }}
          >
            <Box>
              <Typography
                variant="h6"
                fontWeight="700"
                sx={{ lineHeight: 1.3 }}
              >
                {name}
                {acceptingNew && (
                  <Tooltip title="Accepting new patients">
                    <VerifiedIcon
                      sx={{
                        ml: 0.5,
                        verticalAlign: "text-top",
                        color: "primary.main",
                        fontSize: 18,
                      }}
                    />
                  </Tooltip>
                )}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center", mt: 0.5 }}
              >
                <LocationOnIcon
                  sx={{ fontSize: 16, mr: 0.5, color: "text.disabled" }}
                />
                {location}
              </Typography>
            </Box>
            <RatingChip
              size="small"
              icon={<StarIcon sx={{ fontSize: 16 }} />}
              label={rating}
            />
          </Box>

          {/* Specialty badges */}
          <BadgeGroup>
            <SpecialtyBadge label={specialty || expertise} size="small" />
            <Chip
              label={`${experience} exp`}
              size="small"
              variant="outlined"
              sx={{ fontWeight: 500 }}
            />
          </BadgeGroup>

          {/* Languages */}
          <Box sx={{ mb: 2.5 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mb: 0.75, fontWeight: 500 }}
            >
              Languages:
            </Typography>
            <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap" }}>
              {languages.map((lang, index) => (
                <Chip
                  key={index}
                  label={lang}
                  size="small"
                  variant="outlined"
                  sx={{ height: 22, fontSize: "0.7rem" }}
                />
              ))}
            </Box>
          </Box>

          {/* Brief bio text */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 3,
              lineHeight: 1.5,
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
            }}
          >
            {`Specialized in ${expertise} with ${experience} of experience in patient care, diagnosis and comprehensive treatment.`}
          </Typography>

          {/* Action buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: "auto",
              gap: 1.5,
            }}
          >
            <ActionButton
              startIcon={<MessageIcon />}
              variant="outlined"
              size="medium"
              sx={{ flex: 1 }}
              onClick={() =>
                window.open(`https://wa.me/${item?.contact}`, "_blank")
              }
            >
              Message
            </ActionButton>
            <ActionButton
              startIcon={<CalendarTodayIcon />}
              variant="contained"
              primary="true"
              component={Link}
              to={`/form/${_id}`}
              size="medium"
              sx={{ flex: 1.2 }}
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
    <StyledCard listView={true} elevation={1}>
      {/* Image section */}
      <Box
        sx={{
          position: "relative",
          width: { xs: 140, sm: 200 },
          flexShrink: 0,
        }}
      >
        {loading ? (
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            animation="wave"
          />
        ) : (
          <StyledCardMedia
            component="img"
            image={
              image || "https://via.placeholder.com/200x240?text=Doctor+Image"
            }
            alt={name}
            listView={true}
            className="card-media"
            sx={{ objectFit: "cover" }}
          />
        )}

        {/* Favorite button */}
        <FloatingActionButton
          size="small"
          onClick={handleFavoriteClick}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
          }}
        >
          {favorite ? (
            <FavoriteIcon fontSize="small" color="error" />
          ) : (
            <FavoriteBorderIcon fontSize="small" />
          )}
        </FloatingActionButton>

        {/* Available status for list view */}
        {available && (
          <Box
            sx={{
              position: "absolute",
              bottom: 12,
              left: 12,
              backgroundColor: alpha(
                (theme) => theme.palette.success.main,
                0.9
              ),
              color: "white",
              fontSize: "0.7rem",
              fontWeight: "bold",
              borderRadius: 6,
              padding: "3px 8px",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              backdropFilter: "blur(4px)",
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 12 }} />
            {nextAvailable}
          </Box>
        )}
      </Box>

      {/* Content section */}
      <ContentBox listView={true}>
        <CardContent sx={{ flex: "1 0 auto", py: 2.5, px: 3 }}>
          {/* Header with name and rating */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 1.5,
              alignItems: "flex-start",
            }}
          >
            <Box>
              <Typography
                variant="h6"
                fontWeight="700"
                sx={{ lineHeight: 1.3 }}
              >
                {name}
                {acceptingNew && (
                  <Tooltip title="Accepting new patients">
                    <VerifiedIcon
                      sx={{
                        ml: 0.5,
                        verticalAlign: "text-top",
                        color: "primary.main",
                        fontSize: 18,
                      }}
                    />
                  </Tooltip>
                )}
              </Typography>
              <Typography
                variant="body2"
                color="primary.main"
                sx={{ fontWeight: 500, mt: 0.5 }}
              >
                {specialty || expertise}
              </Typography>
            </Box>
            <RatingChip
              size="small"
              icon={<StarIcon sx={{ fontSize: 16 }} />}
              label={rating}
            />
          </Box>

          {/* Info section */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: { xs: 1, sm: 3 },
              mb: 2,
            }}
          >
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontWeight: 500 }}
              >
                Experience
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {experience}
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontWeight: 500 }}
              >
                Location
              </Typography>
              <Typography
                variant="body2"
                fontWeight="medium"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <LocationOnIcon
                  sx={{ fontSize: 14, mr: 0.5, color: "text.disabled" }}
                />
                {location}
              </Typography>
            </Box>
          </Box>

          {/* Tags */}
          <BadgeGroup sx={{ mb: 0 }}>
            {languages.map((lang, index) => (
              <Chip
                key={index}
                label={lang}
                size="small"
                variant="outlined"
                sx={{ height: 24, fontSize: "0.7rem" }}
              />
            ))}
            <Chip
              label="Online Consultation"
              size="small"
              color="primary"
              variant="outlined"
              sx={{ height: 24, fontSize: "0.7rem", fontWeight: 500 }}
            />
          </BadgeGroup>
        </CardContent>

        {/* Actions */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: 3,
            pb: 2.5,
            gap: 2,
          }}
        >
          <ActionButton
            variant="outlined"
            size="medium"
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
            size="medium"
          >
            Book Appointment
          </ActionButton>
        </Box>
      </ContentBox>
    </StyledCard>
  );
}
