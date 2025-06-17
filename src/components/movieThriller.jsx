import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";

const MovieTrailer = ({
  trailerUrl,
  title,
  thumbnail,
  isLoading,
  isModalOpen,
  setIsLoading,
  setIsModalOpen,
}) => {
  // Open trailer modal with smooth animation
  const openTrailer = () => {
    if (!trailerUrl) {
      console.error("No trailer URL provided");
      return;
    }
    setIsLoading(true);
    setIsModalOpen(true);
    // Simulate loading delay for better UX
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // Close trailer modal and reset all states
  const closeTrailer = () => {
    setIsModalOpen(false);
    setIsLoading(false);
  };

  // Keyboard shortcuts for video control
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isModalOpen) return;

      switch (e.code) {
        case "Escape":
          closeTrailer();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isModalOpen]);

  // Don't render if no trailer URL
  if (!trailerUrl) {
    return (
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Watch Trailer
          </h2>
          <p className="text-gray-400">No trailer available for this movie</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Section Header with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Watch Trailer
        </h2>
        <p className="text-gray-400">Experience the thrill before you watch</p>
      </motion.div>

      {/* Trailer Thumbnail with Interactive Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.02 }}
        className="relative cursor-pointer group overflow-hidden rounded-xl"
        onClick={openTrailer}
      >
        <div className="w-full h-64 md:h-80 lg:h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden relative">
          {/* Background Thumbnail or Gradient */}
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={`${title} trailer thumbnail`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-red-900/20 via-gray-900 to-black" />
          )}

          {/* Dark Overlay for Better Text Visibility */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />

          {/* Animated Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600/90 hover:bg-red-600 rounded-full p-6 backdrop-blur-sm transition-all duration-300 shadow-2xl"
            >
              <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" />
            </motion.div>
          </div>

          {/* Floating Info Card */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                  HD TRAILER
                </span>
                <span className="text-gray-300 text-sm">• Official</span>
              </div>
              <h3 className="text-white text-lg md:text-xl font-semibold">
                {title}
              </h3>
              <p className="text-gray-300 text-sm">
                Click to watch the official trailer
              </p>
            </div>
          </div>

          {/* Subtle Animation Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>

      {/* YouTube Video Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={closeTrailer}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl  aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeTrailer}
                className="absolute top-4 right-4 z-20 bg-black/70 hover:bg-zinc-500 p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Loading State with Spinner */}
              {isLoading ? <LoadingSpinner /> : null}

              <iframe
                src={`${trailerUrl}?autoplay=1&modestbranding=1&rel=0`}
                title={`${title} Trailer`}
                className={`w-full h-full ${isLoading ? "hidden" : "block"}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                onLoad={() => setIsLoading(false)} // ✅ This hides spinner once trailer is ready
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MovieTrailer;
