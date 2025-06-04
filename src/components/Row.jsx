import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "./MovieCard";

export default function Row({ title, movies, rowId }) {
  // ✅ Accept movies prop
  const rowRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // ✅ Use the movies prop instead of Redux selector
  // const movies = useSelector((state) => state.movies.movies); // Remove this line

  const handleScroll = (direction) => {
    const container = rowRef.current;
    if (!container) return;

    const scrollAmount = 1000;
    const currentScroll = container.scrollLeft;

    if (direction === "left") {
      container.scrollTo({
        left: currentScroll - scrollAmount,
        behavior: "smooth",
      });
    } else {
      container.scrollTo({
        left: currentScroll + scrollAmount,
        behavior: "smooth",
      });
    }

    setTimeout(() => {
      const newScrollLeft = container.scrollLeft;
      setHasPrevious(newScrollLeft > 0);
      setHasMore(
        newScrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }, 500);
  };

  const handleContainerScroll = () => {
    const container = rowRef.current;
    if (!container) return;

    setHasPrevious(container.scrollLeft > 0);
    setHasMore(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-2 px-4">
        <motion.h2
          className="text-xl font-bold text-white"
          animate={{
            scale: isHovered ? 1.05 : 1,
            x: isHovered ? 10 : 0,
            color: isHovered ? "#E50914" : "#FFFFFF",
          }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h2>
      </div>

      <div className="relative group">
        {/* Left Arrow */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 z-10 flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered && hasPrevious ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            className="bg-black bg-opacity-50 h-full px-2 flex items-center justify-center"
            onClick={() => handleScroll("left")}
            whileHover={{ backgroundColor: "rgba(229, 9, 20, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            disabled={!hasPrevious}
          >
            <ChevronLeft size={40} className="text-white" />
          </motion.button>
        </motion.div>

        {/* Right Arrow */}
        <motion.div
          className="absolute right-0 top-0 bottom-0 z-10 flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered && hasMore ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            className="bg-black bg-opacity-50 h-full px-2 flex items-center justify-center"
            onClick={() => handleScroll("right")}
            whileHover={{ backgroundColor: "rgba(229, 9, 20, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            disabled={!hasMore}
          >
            <ChevronRight size={40} className="text-white" />
          </motion.button>
        </motion.div>

        {/* Movies */}
        <div
          className="flex gap-2 overflow-x-hidden scrollbar-hide pl-4 py-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
          ref={rowRef}
          onScroll={handleContainerScroll}
          id={`row-${rowId}`}
        >
          {movies && movies.length > 0 ? (
            movies.map((movie, index) => (
              <motion.div
                key={movie.id || index}
                className="flex-shrink-0"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))
          ) : (
            <div className="text-gray-400">No movies available</div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
