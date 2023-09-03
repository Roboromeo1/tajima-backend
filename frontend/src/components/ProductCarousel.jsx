import { Carousel, Image } from 'react-bootstrap';
import img2 from '../assets/img2.png';
import c1 from '../assets/final.png';

const ProductCarousel = () => {
  const images = [
    { src: c1, alt: '' },
    { src: img2, alt: '' },
  ];

  return (
    <Carousel pause='hover' className='bg-primary mb-4'>
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <Image
            src={image.src}
            alt={image.alt}
            fluid
            style={{ width: '100%', objectFit: 'cover' }} 
          />
          <Carousel.Caption className='carousel-caption'>
            <h2 className='text-white text-right'>{image.alt}</h2>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
