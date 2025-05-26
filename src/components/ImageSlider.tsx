'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useGesture } from '@use-gesture/react';

const images = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5gISJsSXFE5-AOv3Gn4Uvpmhv6fV7YriodQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0Y8dvWjLBBkM8jFmBCAE_PkIznqaukygbkA&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmvplXPaHMQ0UpdehnAJV644j3s5DumdtEnQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEQvV-nY8RfcvSe_myPsrhEmSMW_WsIZoVfw&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKCbLLYh-9bUeL4uBL_GDsaPRGfvxNl1nygA&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ7ma8M0MI7yL5V7i8PzSwNmqCSUDzSy1QEA&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4l4B0KUGaHU4m9VqdbXa3eAIgE7WGq0RngQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThPMCuKU-G6HB_di267HjCBaz12xLXmq1RkQ&s",
];

export default function ImageSlider() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [[current, direction], setCurrent] = useState([0, 0]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto play ทุก 5 วิ
  useEffect(() => {
    if (isAnimating) return; // อย่ากดขณะ animating
    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, 2000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, isAnimating]);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(([prev]) => [(prev + 1) % images.length, 1]);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(([prev]) => [(prev - 1 + images.length) % images.length, -1]);
  };

  // เลือกภาพจาก dot navigation
  const selectSlide = (index: number) => {
    if (isAnimating || index === current) return;
    setIsAnimating(true);
    // หาทิศทางการเลื่อน
    const dir = index > current ? 1 : -1;
    setCurrent([index, dir]);
  };

  // Swipe gesture
  const bind = useGesture({
    onDragEnd: ({ swipe: [swipeX] }) => {
      if (swipeX === 1) {
        prevSlide();
      } else if (swipeX === -1) {
        nextSlide();
      }
    },
  });

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <div
      {...bind()}
      className="relative w-full h-64 md:h-84 mx-auto overflow-hidden shadow-lg touch-none"
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5 }}
          onAnimationComplete={() => setIsAnimating(false)}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={images[current]}
            alt={`Slide ${current}`}
            fill
            style={{ objectFit: "cover" }}
            priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Prev/Next Buttons */}
      <button
        disabled={isAnimating}
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 p-2 bg-white/60 hover:bg-white rounded-full shadow-md"
      >
        <ChevronLeft />
      </button>
      <button
        disabled={isAnimating}
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 p-2 bg-white/60 hover:bg-white rounded-full shadow-md"
      >
        <ChevronRight />
      </button>

      {/* Dot navigation */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => selectSlide(i)}
            disabled={isAnimating}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === current ? "bg-white" : "bg-white/50 hover:bg-white"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
