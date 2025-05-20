import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: "Inception",
    image: "/src/assets/inception.jpg",
    description: "Your mind is the scene of the crime.",
    year: "2010",
    rating: "8.8",
    genre: "Sci-Fi, Action",
    duration: "2h 28m"
  },
  {
    id: 2,
    title: "The Dark Knight",
    image: "/src/assets/the dark knight.jpg",
    description: "Why so serious?",
    year: "2008",
    rating: "9.0",
    genre: "Action, Crime, Drama",
    duration: "2h 32m"
  },
  {
    id: 3,
    title: "Stranger Things",
    image: "/src/assets/stranger things.jpg",
    description: "The world is turning upside down.",
    year: "2016",
    rating: "8.7",
    genre: "Drama, Fantasy, Horror",
    duration: "TV Series"
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
    pauseAutoPlay();
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    pauseAutoPlay();
  };

  const pauseAutoPlay = () => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
      }, 6000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <div className="relative w-full h-[90vh] bg-black overflow-hidden font-sans">
      {/* Arrows */}
      <button 
        className="absolute top-1/2 left-4 z-30 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full -translate-y-1/2"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button 
        className="absolute top-1/2 right-4 z-30 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full -translate-y-1/2"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full relative"
        >
          {/* Dark gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent z-10" />

          {/* Background image */}
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="absolute w-full h-full object-cover object-center"
          />

          {/* Slide content */}
          <div className="absolute inset-0 flex items-end z-20">
            <div className="container mx-auto px-4 md:px-8 pb-16 md:pb-24">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-2xl"
              >
                <div className="flex items-center mb-3 text-sm md:text-base">
                  <span className="bg-red-600 text-white px-2 py-0.5 rounded mr-3 font-semibold">
                    {slides[current].year}
                  </span>
                  <span className="text-white/80">
                    <span className="text-yellow-400 font-bold mr-1">
                      {slides[current].rating}
                    </span>
                    • {slides[current].genre} • {slides[current].duration}
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 drop-shadow-md tracking-tight">
                  {slides[current].title}
                </h1>

                <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl">
                  {slides[current].description}
                </p>

                <div className="flex flex-wrap gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-medium flex items-center shadow-lg"
                  >
                    <Play size={20} className="mr-2" />
                    Play
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 py-3 rounded-md font-medium flex items-center"
                  >
                    <Plus size={20} className="mr-2" />
                    Add to My List
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrent(index);
              pauseAutoPlay();
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === index ? "bg-red-600 w-6" : "bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
