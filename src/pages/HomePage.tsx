import { useState } from 'react';
import Carousel2 from '@/assets/assets/Carousel2.svg';
import Carousel3 from '@/assets/assets/Carousel3.svg';
import Carousel4 from '@/assets/assets/Carousel4.svg';
import CarouselMain from '@/assets/assets/CarouselMain.svg';
import ArrowLeft from '@/assets/assets/_allow-left.svg';
import ArrowRight from '@/assets/assets/_allow-right.svg';

export default function HomePage() {
  const images = [CarouselMain, Carousel2, Carousel3, Carousel4];

  return <Carousel images={images} />;
}

interface CarouselProps {
  images: string[];
}

export const Carousel = ({ images }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  return (
    <div className="relative">
      <button onClick={prevSlide}>
        <img src={ArrowLeft} alt="arrLeft" />
      </button>
      <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
      <button onClick={nextSlide}>
        <img src={ArrowRight} alt="arrRigth" />
      </button>
    </div>
  );
};
