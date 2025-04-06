import React, { useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import charminar from '../../User/assets/charminar-img.jpg'
import department from '../../User/assets/department-img.png'
import hitech from '../../User/assets/hi-tec-city-building.jpg'
import manuu from '../../User/assets/manuu-img.jpg'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

const Slider2 = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState();

  // Images data
  const images = [
    
    {
      id: 1,
      url:manuu,
      title: 'MANUU Building',
      description: 'Historic architecture in Hyderabad'
    },

    {
      id: 2,
      url:department,
      title: 'University Building',
      description: 'Educational institution in Hyderabad'
    },
    {
      id: 3,
      url:charminar,
      title: 'Charminar Night View',
      description: 'Close-up night view of the iconic monument'
    },
    {
      id: 4,
      url:hitech,
      title: 'Hyderabad City View',
      description: 'Night view of Charminar with colorful surroundings'
    },
   
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ position: 'relative', width: '100%', bgcolor: '#111', borderRadius: 2, overflow: 'hidden' }}>
        {/* Main Slider */}
        <Swiper
          modules={[Navigation, Pagination, Thumbs]}
          navigation
          pagination={{ 
            clickable: true,
            type: 'bullets',
            bulletActiveClass: 'swiper-pagination-bullet-active',
            bulletClass: 'swiper-pagination-bullet',
          }}
          thumbs={{ swiper: thumbsSwiper }}
          spaceBetween={0}
          slidesPerView={1}
          style={{ 
            width: '100%', 
            borderRadius: '8px',
            height: '500px'
          }}
        >
          {images.map((image) => (
            <SwiperSlide key={image.id}>
              <Box 
                sx={{
                  height: '100%',
                  width: '100%',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '40%',
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                    zIndex: 1
                  }
                }}
              >
                <img 
                  src={image.url} 
                  alt={image.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <Box 
                  sx={{
                    position: 'absolute',
                    bottom: 40,
                    left: 40,
                    color: 'white',
                    zIndex: 2
                  }}
                >
                  <Typography variant="h4" fontWeight="bold">
                    {image.title}
                  </Typography>
                  <Typography variant="body1">
                    {image.description}
                  </Typography>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Thumbnail Slider */}
        <Box sx={{ mt: 2 }}>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[Navigation, Thumbs]}
            style={{ height: '100px' }}
          >
            {images.map((image) => (
              <SwiperSlide key={image.id}>
                <Box
                  sx={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 1,
                    overflow: 'hidden',
                    border: '2px solid transparent',
                    cursor: 'pointer',
                    '&.swiper-slide-thumb-active': {
                      border: '2px solid #3f51b5',
                    }
                  }}
                >
                  <img
                    src={image.url}
                    alt={`Thumbnail ${image.id}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Box>
    </Container>
  );
};

export default Slider2;