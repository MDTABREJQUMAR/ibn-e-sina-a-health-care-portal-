import React, { useState, useEffect } from "react";
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Chip,
  InputAdornment,
  TextField,
  Menu,
  MenuItem,
  Button,
  Fade,
  Slide,
  Paper,
  Divider,
  IconButton,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DoctorCard from "./Doctorcard";
import Loading from "../../Loading";
import { getdoctor } from "../../slices/getDoctor";
import { useDispatch, useSelector } from "react-redux";

// Mock imports for icons - replace with your actual imports
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// Styled components
const PageHeader = styled(Box)(({ theme }) => ({
  backgroundImage: "linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)",
  color: "white",
  padding: theme.spacing(8, 0),
  marginBottom: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
}));

const StyledSearchField = styled(TextField)(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: theme.shape.borderRadius,
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const FilterChip = styled(Chip)(({ theme, selected }) => ({
  margin: theme.spacing(0.5),
  fontWeight: selected ? 600 : 400,
  backgroundColor: selected ? theme.palette.primary.main : theme.palette.background.paper,
  color: selected ? "white" : theme.palette.text.primary,
  '&:hover': {
    backgroundColor: selected ? theme.palette.primary.dark : theme.palette.action.hover,
  },
}));

const AnimatedGrid = styled(Grid)(({ theme }) => ({
  transition: "all 0.3s ease-in-out",
}));

const Doctor = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const { doctor, isLoading, error } = useSelector((state) => state.doctor);
  
  // UI state
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  
  // Fetch doctors on component mount
  useEffect(() => {
    dispatch(getdoctor());
  }, [dispatch]);

  // Filter functionality (doesn't affect backend)
  const filteredDoctors = doctor?.doctors?.filter(doc => {
    const matchesSearch = doc.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doc.specialty?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "All" || doc.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  }) || [];

  // Specialty options based on available doctors
  const specialties = doctor?.doctors 
    ? ["All", ...new Set(doctor.doctors.map(doc => doc.specialty).filter(Boolean))]
    : ["All"];

  // Handle menu actions
  const handleSortClick = (event) => setSortAnchorEl(event.currentTarget);
  const handleSortClose = () => setSortAnchorEl(null);
  const handleFilterClick = (event) => setFilterAnchorEl(event.currentTarget);
  const handleFilterClose = () => setFilterAnchorEl(null);

  return (
    <Box sx={{ backgroundColor: "#f5f7fa", minHeight: "100vh", pb: 8 }}>
      <Loading isloading={isLoading} />
      
      {/* Hero Header */}
      <PageHeader>
        <Container maxWidth="lg">
          <Slide direction="down" in={!isLoading} timeout={800}>
            <Box>
              <Typography variant="h2" fontWeight="bold" gutterBottom>
                Meet Our Expert Doctors
              </Typography>
              <Typography variant="h6" sx={{ maxWidth: "700px", opacity: 0.9, mb: 4 }}>
                Our team of highly qualified medical professionals is dedicated to providing 
                exceptional care with compassion and expertise.
              </Typography>
            </Box>
          </Slide>
          
          {/* Search Bar */}
          <Fade in={!isLoading} timeout={1200}>
            <Box sx={{ mt: 4, display: "flex", flexDirection: isMobile ? "column" : "row", gap: 2 }}>
              <StyledSearchField
                fullWidth
                variant="outlined"
                placeholder="Search doctors by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              
              <Box sx={{ display: "flex", gap: 1, flexShrink: 0 }}>
                <Button 
                  variant="contained" 
                  color="secondary"
                  startIcon={<FilterListIcon />}
                  onClick={handleFilterClick}
                >
                  Filter
                </Button>
                <Button 
                  variant="contained" 
                  color="secondary"
                  startIcon={<SortIcon />}
                  onClick={handleSortClick}
                >
                  Sort
                </Button>
                <IconButton 
                  sx={{ bgcolor: "white", ml: 1 }}
                  onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                >
                  {viewMode === "grid" ? <ViewListIcon /> : <GridViewIcon />}
                </IconButton>
              </Box>
            </Box>
          </Fade>
        </Container>
      </PageHeader>

      <Container maxWidth="lg">
        {/* Filter chips */}
        <Box sx={{ display: "flex", flexWrap: "wrap", mb: 4 }}>
          {specialties.map((specialty) => (
            <FilterChip
              key={specialty}
              label={specialty}
              clickable
              selected={selectedSpecialty === specialty}
              onClick={() => setSelectedSpecialty(specialty)}
            />
          ))}
        </Box>

        {/* Results count */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="subtitle1" color="text.secondary">
            Showing {filteredDoctors.length} doctors
            {selectedSpecialty !== "All" && ` in ${selectedSpecialty}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </Typography>
          
          <Button 
            variant="text" 
            color="primary" 
            endIcon={<ChevronRightIcon />}
            disabled={filteredDoctors.length === 0}
          >
            View All
          </Button>
        </Box>

        {/* Error state */}
        {error && (
          <Paper sx={{ p: 4, textAlign: "center", mb: 4 }}>
            <Typography variant="h6" color="error" gutterBottom>
              Unable to load doctors
            </Typography>
            <Typography color="text.secondary">
              Please try again later or contact support if the problem persists.
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => dispatch(getdoctor())}>
              Retry
            </Button>
          </Paper>
        )}

        {/* Empty state */}
        {!isLoading && filteredDoctors.length === 0 && !error && (
          <Paper sx={{ p: 4, textAlign: "center", mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              No doctors found
            </Typography>
            <Typography color="text.secondary">
              Try adjusting your search or filters to find what you're looking for.
            </Typography>
            <Button variant="outlined" sx={{ mt: 2 }} onClick={() => {
              setSearchTerm("");
              setSelectedSpecialty("All");
            }}>
              Clear Filters
            </Button>
          </Paper>
        )}

        {/* Doctor grid */}
        <AnimatedGrid 
          container 
          spacing={viewMode === "grid" ? 3 : 2} 
          sx={{ 
            transition: "all 0.3s ease",
          }}
        >
          {filteredDoctors.map((item, index) => (
            <Fade 
              in={!isLoading} 
              key={item._id || index} 
              timeout={(index % 4 + 1) * 300}
            >
              <Grid item xs={12} sm={viewMode === "grid" ? 6 : 12} md={viewMode === "grid" ? 4 : 12} lg={viewMode === "grid" ? 3 : 12}>
                <DoctorCard item={item} listView={viewMode === "list"} />
              </Grid>
            </Fade>
          ))}
        </AnimatedGrid>
      </Container>

      {/* Sort Menu */}
      <Menu
        anchorEl={sortAnchorEl}
        open={Boolean(sortAnchorEl)}
        onClose={handleSortClose}
      >
        <MenuItem onClick={handleSortClose}>Name (A-Z)</MenuItem>
        <MenuItem onClick={handleSortClose}>Name (Z-A)</MenuItem>
        <MenuItem onClick={handleSortClose}>Experience (High-Low)</MenuItem>
        <MenuItem onClick={handleSortClose}>Experience (Low-High)</MenuItem>
      </Menu>

      {/* Filter Menu */}
      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={handleFilterClose}
      >
        <MenuItem onClick={handleFilterClose}>Available Today</MenuItem>
        <MenuItem onClick={handleFilterClose}>Accepting New Patients</MenuItem>
        <MenuItem onClick={handleFilterClose}>Online Consultation</MenuItem>
        <MenuItem onClick={handleFilterClose}>In-Person Visits</MenuItem>
      </Menu>
    </Box>
  );
};

export default Doctor;