import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularMovies } from "../app/features/movies/moviesSlice";
import { Link } from "react-router-dom";

const AUTO_PLAY_INTERVAL = 6000; // 6 seconds
const AUTO_PLAY_PAUSE = 10000; // 10 seconds pause after manual interaction

const Hero = () => {
  const dispatch = useDispatch();
  const { popular, loading, error } = useSelector((state) => state.movies);
  const [current, setCurrent] = useState(0);
  const autoPlayRef = useRef(null);
  const pauseTimeoutRef = useRef(null);
  const isPausedRef = useRef(false);

  useEffect(() => {
    if (popular.length === 0) {
      dispatch(fetchPopularMovies());
    }
  }, [dispatch, popular.length]);

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      clearInterval(autoPlayRef.current);
      clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  // Auto play logic
  useEffect(() => {
    if (popular.length === 0) return;

    if (!isPausedRef.current) {
      autoPlayRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % popular.length);
      }, AUTO_PLAY_INTERVAL);
    }

    return () => clearInterval(autoPlayRef.current);
  }, [popular.length, current]);

  // Pause auto play on manual slide and resume after pause timeout
  const pauseAutoPlay = () => {
    isPausedRef.current = true;
    clearInterval(autoPlayRef.current);
    clearTimeout(pauseTimeoutRef.current);

    pauseTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false;
      setCurrent((prev) => prev); // trigger effect to restart interval
    }, AUTO_PLAY_PAUSE);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % popular.length);
    pauseAutoPlay();
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? popular.length - 1 : prev - 1));
    pauseAutoPlay();
  };

  if (loading) {
    return (
      <div className="w-full h-[90vh] flex items-center justify-center bg-black text-white">
        Loading popular movies...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[90vh] flex items-center justify-center bg-black text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!popular.length) {
    return (
      <div className="w-full h-[90vh] flex items-center justify-center bg-black text-white">
        No popular movies found.
      </div>
    );
  }

  const movie = popular[current];

  return (
    <div className="relative w-full h-[90vh]  mt-10 bg-black overflow-hidden font-sans select-none">
      {/* Arrows */}
      <button
        className="absolute top-1/2 left-4 z-30 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full -translate-y-1/2 transition-colors"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        className="absolute top-1/2 right-4 z-30 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full -translate-y-1/2 transition-colors"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide */}
      <AnimatePresence mode="wait">
        <motion.div
          key={movie.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full relative"
        >
          <Link to={`/movie/${movie.id}`}>
            {/* Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent z-10" />

            {/* Background image */}
            <img
              src={`https://image.tmdb.org/t/p/original${
                movie.backdrop_path || movie.poster_path
              }`}
              alt={movie.title || movie.name}
              className="absolute w-full h-full object-cover object-center"
              loading="lazy"
              draggable={false}
            />

            {/* Content */}
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
                      {(movie.release_date || movie.first_air_date || "").slice(
                        0,
                        4
                      )}
                    </span>
                    <span className="text-white/80">
                      <span className="text-yellow-400 font-bold mr-1">
                        {movie.vote_average?.toFixed(1)}
                      </span>
                      • {movie.genre_ids?.join(", ") || movie.media_type} •{" "}
                      {movie.runtime
                        ? `${Math.floor(movie.runtime / 60)}h ${
                            movie.runtime % 60
                          }m`
                        : movie.media_type === "tv"
                        ? "TV Series"
                        : ""}
                    </span>
                  </div>

                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 drop-shadow-md tracking-tight">
                    {movie.title || movie.name}
                  </h1>

                  <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl">
                    {movie.overview}
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
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Hero;
