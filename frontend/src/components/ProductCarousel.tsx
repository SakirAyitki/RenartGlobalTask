import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Mousewheel } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Swiper as SwiperType } from 'swiper';

// Swiper styles will be loaded via CDN or handled differently

import ProductCard from './ProductCard';
import type { Product } from '../types/product';

interface ProductCarouselProps {
  products: Product[];
  title: string;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products, title }) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [progress, setProgress] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const [currentSlidesPerView, setCurrentSlidesPerView] = React.useState(4);
  const animationFrameRef = useRef<number | null>(null);
  
  // Calculate if navigation is needed
  const isNavigationNeeded = products.length > currentSlidesPerView;

  // Cleanup animation frame on unmount
  React.useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handlePrevClick = () => {
    swiperRef.current?.slidePrev();
    // Update progress manually for arrow clicks
    setTimeout(() => {
      if (swiperRef.current && !isDragging) {
        const totalSlides = swiperRef.current.slides.length;
        const activeIndex = swiperRef.current.activeIndex;
        const progressPercent = totalSlides > 1 ? (activeIndex / (totalSlides - 1)) * 100 : 0;
        setProgress(Math.min(progressPercent, 100));
      }
    }, 100);
  };

  const handleNextClick = () => {
    swiperRef.current?.slideNext();
    // Update progress manually for arrow clicks
    setTimeout(() => {
      if (swiperRef.current && !isDragging) {
        const totalSlides = swiperRef.current.slides.length;
        const activeIndex = swiperRef.current.activeIndex;
        const progressPercent = totalSlides > 1 ? (activeIndex / (totalSlides - 1)) * 100 : 0;
        setProgress(Math.min(progressPercent, 100));
      }
    }, 100);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging || !isNavigationNeeded) return; // Prevent click during drag or when navigation not needed
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const progressPercent = (clickX / rect.width) * 100;
    setProgress(progressPercent);
    
    // Calculate which slide to go to based on progress
    const totalSlides = products.length;
    const slideIndex = Math.floor((progressPercent / 100) * (totalSlides - 1));
    
    swiperRef.current?.slideTo(slideIndex);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isNavigationNeeded) return; // Don't allow dragging when navigation not needed
    
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    
    const container = e.currentTarget.parentElement;
    if (!container) return;
    
    const updateProgress = (clientX: number, shouldUpdateCarousel = false) => {
      const rect = container.getBoundingClientRect();
      const moveX = clientX - rect.left;
      const progressPercent = Math.max(0, Math.min(100, (moveX / rect.width) * 100));
      setProgress(progressPercent);
      
      if (shouldUpdateCarousel) {
        // Cancel previous animation frame
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        
        // Throttle carousel updates using requestAnimationFrame
        animationFrameRef.current = requestAnimationFrame(() => {
          const totalSlides = products.length;
          const slideIndex = Math.floor((progressPercent / 100) * (totalSlides - 1));
          swiperRef.current?.slideTo(slideIndex);
        });
      }
    };
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      updateProgress(moveEvent.clientX, true);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };



  return (
    <div className="w-full min-h-screen bg-white pt-4 pb-8 sm:pt-8 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Title centered */}
        <div className="text-center mb-8 sm:mb-16">
          <h1 className="text-2xl sm:text-3xl lg:text-[45px] font-avenir font-normal text-black">
            {title}
          </h1>
        </div>

        {/* Products Carousel with side navigation */}
        <div className="relative mb-8 sm:mb-16">
          {/* Left Navigation Button - Only show when navigation is needed */}
          {isNavigationNeeded && (
            <button
              onClick={handlePrevClick}
              className="absolute left-0 sm:left-0 top-[35%] transform -translate-y-1/2 z-10 flex items-center justify-center transition-all duration-200 hover:opacity-70"
              aria-label="Previous products"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" />
            </button>
          )}

          {/* Right Navigation Button - Only show when navigation is needed */}
          {isNavigationNeeded && (
            <button
              onClick={handleNextClick}
              className="absolute right-0 sm:right-0 top-[35%] transform -translate-y-1/2 z-10 flex items-center justify-center transition-all duration-200 hover:opacity-70"
              aria-label="Next products"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" />
            </button>
          )}

          {/* Carousel */}
          <div className={isNavigationNeeded ? "mx-8 sm:mx-16" : "mx-0"}>
            <Swiper
              modules={[Navigation, Mousewheel]}
              spaceBetween={48}
              slidesPerView={4}
              slidesPerGroup={1}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                // Set initial progress
                const totalSlides = swiper.slides.length;
                const progressPercent = totalSlides > 1 ? (0 / (totalSlides - 1)) * 100 : 0;
                setProgress(progressPercent);
              }}
              onSlideChange={(swiper) => {
                if (!isDragging) {
                  const totalSlides = swiper.slides.length;
                  const activeIndex = swiper.activeIndex;
                  const progressPercent = totalSlides > 1 ? (activeIndex / (totalSlides - 1)) * 100 : 0;
                  setProgress(Math.min(progressPercent, 100));
                }
              }}
              onBreakpoint={(_, breakpointParams) => {
                // Update current slides per view when breakpoint changes
                setCurrentSlidesPerView(breakpointParams.slidesPerView as number);
              }}
              mousewheel={{
                forceToAxis: true,
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 24,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 32,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 32,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 48,
                },
              }}
              className="product-carousel"
            >
              {products.map((product, index) => (
                <SwiperSlide key={`${product.name}-${index}`}>
                  <div className="flex justify-center">
                    <ProductCard product={product} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Progress Bar - Only show when navigation is needed */}
        {isNavigationNeeded && (
          <div className="mx-8 sm:mx-16 mt-4 sm:mt-8">
            <div className="relative w-full h-3 sm:h-4 bg-gray-200 rounded-full cursor-pointer" onClick={handleProgressClick}>
              <div
                className={`absolute h-full bg-gray-400 rounded-full cursor-grab active:cursor-grabbing ${
                  isDragging ? '' : 'transition-all duration-300'
                }`}
                style={{ 
                  width: `50%`,
                  left: `${Math.min(progress * 0.8, 50)}%`
                }}
                onMouseDown={handleMouseDown}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCarousel; 