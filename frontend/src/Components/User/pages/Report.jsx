import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import {
  Typography,
  Container,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Grid,
  Divider,
  Box,
  Card,
  CardContent,
  Chip,
  Button
} from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MedicationIcon from '@mui/icons-material/Medication';
import PaymentIcon from '@mui/icons-material/Payment';
import DownloadIcon from '@mui/icons-material/Download';

const Report = () => {
  const [datas, setDatas] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const token = localStorage.getItem('jwt');
  const reportRef = useRef(null);

  const doctorDetails = async (id) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/patient/single-appointment/${id}`,
        {
          headers: {
            authorization: token,
          },
        }
      );

      console.log(data.appointment);

      setDatas(data?.appointment);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    doctorDetails(id);
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const generatePDF = async () => {
    if (!reportRef.current) return;
    
    setIsLoading(true);
    
    try {
      // Get patient name for filename
      const patientName = datas?.user?.username || 'patient';
      const date = datas?.date ? new Date(datas.date).toISOString().split('T')[0] : '';
      const filename = `Medical_Report_${patientName}_${date}.pdf`;
      
      const reportElement = reportRef.current;
      
      // Create canvas from the report div
      const canvas = await html2canvas(reportElement, {
        scale: 2, // Increase resolution
        logging: false,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });
      
      // The PDF dimension
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Convert to PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(filename);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      {/* Download Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<DownloadIcon />}
          onClick={generatePDF}
          disabled={isLoading || !datas}
          sx={{ borderRadius: 2 }}
        >
          {isLoading ? "Generating PDF..." : "Download Medical Report"}
        </Button>
      </Box>
      
      <Paper ref={reportRef} elevation={3} sx={{ p: 4, borderRadius: 2, position: 'relative', overflow: 'hidden' }}>
        {/* Watermark */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-30deg)',
            opacity: 0.05,
            fontSize: '120px',
            fontWeight: 'bold',
            color: '#000',
            pointerEvents: 'none',
            whiteSpace: 'nowrap'
          }}
        >
          IBNE-SINA MANUU
        </Box>
        
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, borderBottom: '2px solid #1976d2', pb: 2 }}>
          <LocalHospitalIcon sx={{ fontSize: 40, color: '#1976d2', mr: 2 }} />
          <Box>
            <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
              IBNE-SINA HEALTH CENTER
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Maulana Azad National Urdu University (MANUU)
            </Typography>
          </Box>
        </Box>

        <Typography variant="h5" color="primary" sx={{ textAlign: 'center', mb: 3, fontWeight: 'medium' }}>
          MEDICAL EXAMINATION REPORT
        </Typography>

        {/* Report ID and Date */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="body1">
            <strong>Report ID:</strong> {id}
          </Typography>
          <Typography variant="body1">
            <strong>Date:</strong> {datas?.date ? formatDate(datas.date) : 'N/A'}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Patient Information */}
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ height: '100%', borderLeft: '4px solid #1976d2' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PersonIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6" color="primary">Patient Information</Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ display: 'flex', mb: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', width: '120px' }}>Name:</Typography>
                  <Typography variant="body1">{datas?.user?.username || 'N/A'}</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', mb: 1, alignItems: 'center' }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', width: '120px' }}>Age:</Typography>
                  <Typography variant="body1">{datas?.user?.age || 'N/A'}</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', mb: 1, alignItems: 'center' }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', width: '120px' }}>Email:</Typography>
                  <Typography variant="body1">{datas?.user?.email || 'N/A'}</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', mb: 1, alignItems: 'center' }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', width: '120px' }}>Phone:</Typography>
                  <Typography variant="body1">{datas?.user?.phone || 'N/A'}</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', mb: 1, alignItems: 'center' }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', width: '120px' }}>Location:</Typography>
                  <Typography variant="body1">{datas?.user?.location || 'N/A'}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Diagnosis and Treatment */}
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ height: '100%', borderLeft: '4px solid #1976d2' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <MedicalServicesIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6" color="primary">Diagnosis & Treatment</Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ display: 'flex', mb: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', width: '120px' }}>Disease:</Typography>
                  <Typography variant="body1">{datas?.disease || 'N/A'}</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', mb: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', width: '120px' }}>Doctor:</Typography>
                  <Typography variant="body1">{datas?.doctor?.name || 'N/A'}</Typography>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>About Disease:</Typography>
                  <Typography variant="body1" sx={{ backgroundColor: '#f5f5f5', p: 1, borderRadius: 1 }}>
                    {datas?.about || 'N/A'}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Medication */}
          <Grid item xs={12}>
            <Card elevation={2} sx={{ borderLeft: '4px solid #1976d2' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <MedicationIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6" color="primary">Prescribed Medication</Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                
                {datas?.medicine && datas.medicine.length > 0 ? (
                  <Grid container spacing={1}>
                    {datas.medicine.map((med, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Paper 
                          elevation={1} 
                          sx={{ 
                            p: 1.5, 
                            display: 'flex', 
                            alignItems: 'center',
                            borderLeft: '3px solid #4caf50'
                          }}
                        >
                          <MedicationIcon sx={{ mr: 1, color: '#4caf50' }} />
                          <Typography>{med}</Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography variant="body1">No medications prescribed</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Billing Information */}
          <Grid item xs={12}>
            <Card elevation={2} sx={{ borderLeft: '4px solid #1976d2' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AttachMoneyIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6" color="primary">Billing Information</Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', mb: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', width: '120px' }}>Invoice:</Typography>
                      <Typography variant="body1">{datas?.doctor?.ammount || 'N/A'}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', mb: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', width: '120px' }}>Payment:</Typography>
                      <Chip 
                        label={datas?.payment || 'N/A'} 
                        color={datas?.payment === 'Paid' ? 'success' : 'warning'}
                        size="small"
                      />
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        {/* Footer */}
        <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            This is an official medical document from Ibne-Sina Health Center, MANUU
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Page 1 of 1
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Report;