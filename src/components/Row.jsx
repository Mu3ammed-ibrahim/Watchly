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
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-labelledby={`row-title-${rowId}`}
    >
      {/* Section Header */}
      <header className="flex items-center justify-between mb-2 px-4">
        <motion.h2
          id={`row-title-${rowId}`}
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
      </header>

      <div className="relative group">
        {/* Navigation Arrows */}
        <nav aria-label="Scroll movie list">
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
              aria-label="Scroll left"
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
              aria-label="Scroll right"
            >
              <ChevronRight size={40} className="text-white" />
            </motion.button>
          </motion.div>
        </nav>

        {/* Movie List */}
        <ul
          className="flex gap-2 overflow-x-auto lg:overflow-hidden scrollbar-hide pl-4 py-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
          ref={rowRef}
          onScroll={handleContainerScroll}
          id={`row-${rowId}`}
          aria-label={`${title} movie list`}
          role="list"
        >
          {movies && movies.length > 0 ? (
            movies.map((movie, index) => (
              <motion.li
                key={movie.id || index}
                className="flex-shrink-0 list-none"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                role="listitem"
              >
                <MovieCard movie={movie} />
              </motion.li>
            ))
          ) : (
            <li className="text-gray-400">No movies available</li>
          )}
        </ul>
      </div>
    </motion.section>
  );
}
