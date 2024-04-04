import { useState } from 'react';
import { Link } from 'react-router-dom';
import KeepyUppyIcon from '@/assets/KeepyUppyIcon';
import KeepyUppyLogo from '@/assets/KeepyUppyLogo';
import Carousel2 from '@/assets/assets/Carousel2.svg';
import Carousel3 from '@/assets/assets/Carousel3.svg';
import Carousel4 from '@/assets/assets/Carousel4.svg';
import CarouselMain from '@/assets/assets/CarouselMain.svg';
import ArrowLeft from '@/assets/assets/_allow-left.svg';
import ArrowRight from '@/assets/assets/_allow-right.svg';
import circleDark from '@/assets/assets/circleDark.svg';
import circleLight from '@/assets/assets/circleLight.svg';

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
    <div className="m-0 h-[108rem]  bg-gray20">
      <nav className="fixed top-0 flex w-[192rem] items-center justify-center gap-3 bg-gray10 pb-[1.9rem] pt-[2.2rem]">
        <KeepyUppyIcon />
        <KeepyUppyLogo size="sm" />
      </nav>
      <main className="h-100vh flex items-center justify-center bg-gray20">
        <div className="relative ">
          <button
            onClick={prevSlide}
            className=" right:88% absolute left-[2%] top-1/2 -translate-x-1/2 transform"
          >
            <img src={ArrowLeft} alt="arrLeft" />
          </button>
          <section className=" mb-[15.9rem] mt-[12.8rem] flex h-[60rem] w-[112rem]  flex-col gap-0">
            <img
              className="h-full w-full "
              src={images[currentIndex]}
              alt={`Slide ${currentIndex}`}
            />
            <div className="w-fulll flex h-full  rounded-b-[2.4rem] bg-white">
              <div className="ml-[52.6rem] flex items-center gap-[1.2rem]">
                {images.map((_, index) => (
                  <Link key={index} to={`/carousel/${index + 1}`}>
                    <img
                      key={index}
                      src={index === currentIndex ? circleDark : circleLight}
                      alt={`circle ${index}`}
                    />
                  </Link>
                ))}
              </div>
              <a
                href="/signin"
                className="mb-12 ml-[43.5rem] mr-12 mt-12 whitespace-nowrap  text-body3-medium text-black"
              >
                로그인하기
              </a>
            </div>
          </section>
          <button
            onClick={nextSlide}
            className="absolute left-[97.5%] top-1/2 -translate-x-1/2 transform"
          >
            <img src={ArrowRight} alt="arrRigth" />
          </button>
        </div>
      </main>
      <footer className="fixed bottom-0 m-0 w-full bg-gray30 py-9 text-center text-body4-bold text-gray50">
        All Rights Reserved ⓒ 2024 Project Team8-Codeit KEEPY UPPY.
      </footer>
    </div>
  );
};
