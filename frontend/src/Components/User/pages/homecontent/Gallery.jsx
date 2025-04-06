import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/system';

const Overlay = styled('div')({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'rgba(0, 0, 255, 0.6)',
  color: 'white',
  padding: '12px',
  textAlign: 'center',
  borderBottomLeftRadius: '12px',
  borderBottomRightRadius: '12px',
  opacity: 0,
  transition: 'opacity 0.4s ease',
});

const StyledCard = styled(Card)({
  position: 'relative',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '3px 3px 8px rgba(0, 0, 0, 0.3)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.03)',
  },
  '&:hover div': {
    opacity: 1,
  },
});

const StyledCardMedia = styled(CardMedia)({
  height: 250,
  width: '100%',
  objectFit: 'cover',
});

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '12px',
};

export default function EnhancedGallery() {
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);

  const handleOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3, backgroundColor: '#f4f4f4' }}>
      <Grid container spacing={3} justifyContent="center">
        {itemData.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.title}>
            <StyledCard>
              <StyledCardMedia
                component="img"
                image={item.img}
                alt={item.title}
              />
              <Overlay>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{item.title}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 1 }}
                  onClick={() => handleOpen(item)}
                >
                  View Details
                </Button>
              </Overlay>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      {/* Modal for displaying details */}
      {selectedItem && (
        <Modal open={open} onClose={handleClose}>
          <Box sx={modalStyle}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
              {selectedItem.title}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {selectedItem.detail}
            </Typography>
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Modal>
      )}
    </Box>
  );
}

const itemData = [
  { 
    img: 'https://cdn.pixabay.com/photo/2020/03/14/17/05/virus-4931227_640.jpg', 
    title: 'Aesthetic Clinic',
    detail: 'Advanced skincare treatments and cosmetic procedures to enhance your natural beauty.',
  },
  { 
    img: 'https://cdn.pixabay.com/photo/2013/02/09/04/19/surgery-79584_640.jpg', 
    title: 'Dermatology',
    detail: 'Comprehensive skincare services including acne treatment, allergy care, and mole analysis.',
  },
  { 
    img: 'https://cdn.pixabay.com/photo/2016/11/08/05/29/operation-1807543_640.jpg', 
    title: 'Dental',
    detail: 'Expert dental care including cleaning, whitening, and oral surgery.',
  },
  { 
    img: 'https://cdn.pixabay.com/photo/2017/07/23/10/44/dentist-2530990_640.jpg', 
    title: 'General Medicine',
    detail: 'Primary care services including routine check-ups and medical consultations.',
  },
  { 
    img: 'https://cdn.pixabay.com/photo/2013/02/24/01/17/surgery-85574_640.jpg', 
    title: 'Surgery',
    detail: 'Modern surgical procedures performed by experienced surgeons with post-operative care.',
  },
  { 
    img: 'https://cdn.pixabay.com/photo/2017/06/28/14/03/dental-2450751_640.jpg', 
    title: 'Dental Care',
    detail: 'Comprehensive oral hygiene and dental procedures for a healthy smile.',
  },
  { 
    img: 'https://cdn.pixabay.com/photo/2017/10/04/09/56/laboratory-2815641_640.jpg', 
    title: 'Laboratory',
    detail: 'State-of-the-art diagnostic and clinical laboratory tests for accurate results.',
  },
  { 
    img: 'https://cdn.pixabay.com/photo/2020/04/19/20/10/test-tube-5065426_640.jpg', 
    title: 'Testing',
    detail: 'Accurate and reliable medical testing services to monitor your health.',
  },
  { 
    img: 'https://cdn.pixabay.com/photo/2018/08/02/07/50/medical-procedures-3579029_640.jpg', 
    title: 'Procedures',
    detail: 'Safe and minimally invasive medical procedures conducted by skilled professionals.',
  },
  { 
    img: 'https://cdn.pixabay.com/photo/2014/11/12/19/25/diabetes-528678_640.jpg', 
    title: 'Diabetes Care',
    detail: 'Comprehensive diabetes management and monitoring to keep your health on track.',
  },
  { 
    img: 'https://cdn.pixabay.com/photo/2017/05/23/21/01/jar-2338584_640.jpg', 
    title: 'Pharmacy',
    detail: 'Quality medicines and healthcare essentials available at affordable prices.',
  },
];
