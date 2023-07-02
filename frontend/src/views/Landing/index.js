import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import carousel1 from 'assets/images/carousel/20230323_171701.jpg';
import carousel2 from 'assets/images/carousel/20230326_082038.jpg';
import carousel3 from 'assets/images/carousel/JPEG_20230326_095437_8125080500982386498.jpg';
import carousel4 from 'assets/images/carousel/JPEG_20230326_101109_5097561306606584259.jpg';
import carousel5 from 'assets/images/carousel/JPEG_20230326_131156_5934062720191431023.jpg';
import carousel6 from 'assets/images/carousel/JPEG_20230326_132009_7402386068224784980.jpg';
import carousel7 from 'assets/images/carousel/JPEG_20230326_133008_8977776685096644627.jpg';
import carousel8 from 'assets/images/carousel/JPEG_20230326_133241_3200766287346809448.jpg';
import carousel9 from 'assets/images/carousel/JPEG_20230326_133720_8238953998702825054.jpg';
import carousel10 from 'assets/images/carousel/JPEG_20230326_133829_8848801794550363302.jpg';
import Footer from 'components/Footer';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
export default function Landing() {
  return (
    <Box sx={{ width: 350, height: 500}}>
      <ImageList variant="masonry" cols={3} gap={8}>
       
          <ImageListItem>
            <img
              src={carousel1}
              srcSet={`${carousel1}?w=200&fit=crop&auto=format&dpr=2 2x`}
            
              loading="lazy"
            />
          </ImageListItem>
          <ImageListItem>
            <img
              src={carousel2}
              srcSet={`${carousel2}?w=200&fit=crop&auto=format&dpr=2 2x`}
            
              loading="lazy"
            />
          </ImageListItem>
          <ImageListItem>
            <img
              src={carousel3}
              srcSet={`${carousel3}?w=200&fit=crop&auto=format&dpr=2 2x`}
            
              loading="lazy"
            />
          </ImageListItem>
          <ImageListItem>
            <img
              src={carousel4}
              srcSet={`${carousel4}?w=200&fit=crop&auto=format&dpr=2 2x`}
            
              loading="lazy"
            />
          </ImageListItem>
          <ImageListItem>
            <img
              src={carousel5}
              srcSet={`${carousel5}?w=200&fit=crop&auto=format&dpr=2 2x`}
            
              loading="lazy"
            />
          </ImageListItem>
          <ImageListItem>
            <img
              src={carousel6}
              srcSet={`${carousel6}?w=200&fit=crop&auto=format&dpr=2 2x`}
            
              loading="lazy"
            />
          </ImageListItem>
          <ImageListItem>
            <img
              src={carousel7}
              srcSet={`${carousel7}?w=200&fit=crop&auto=format&dpr=2 2x`}
            
              loading="lazy"
            />
          </ImageListItem>
          <ImageListItem>
            <img
              src={carousel8}
              srcSet={`${carousel8}?w=200&fit=crop&auto=format&dpr=2 2x`}
            
              loading="lazy"
            />
          </ImageListItem>
          <ImageListItem>
            <img
              src={carousel9}
              srcSet={`${carousel9}?w=200&fit=crop&auto=format&dpr=2 2x`}
            
              loading="lazy"
            />
          </ImageListItem>
          <ImageListItem>
            <img
              src={carousel10}
              srcSet={`${carousel10}?w=200&fit=crop&auto=format&dpr=2 2x`}
            
              loading="lazy"
            />
          </ImageListItem>

          

      
      </ImageList>
      <Stack spacing={2} direction="row">
      <Button variant="contained">Login</Button>
      <Button variant="contained">Register</Button>
    </Stack>
      <Footer/>
    </Box>
  );
}

