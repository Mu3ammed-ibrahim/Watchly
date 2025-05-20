import { useState } from 'react';
import { Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react';

const defaultMovie = {
  id: 1,
  title: "Stranger Things",
  posterUrl: "/src/assets/stranger things.jpg",
  rating: 4.5,
  year: 2016,
  maturityRating: "TV-14",
  duration: "50m",
  genres: ["Sci-Fi", "Horror", "Drama"],
  description:
    "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
};

export default function MovieCard({ movie }) {
  const [isHovered, setIsHovered] = useState(false);

  const movieData = movie || defaultMovie;

  return (
    <div
      className="relative rounded-md overflow-hidden hover:z-10 w-40 sm:w-48 md:w-52 transition-transform duration-300 hover:scale-105 focus:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0} // makes card focusable for keyboard users
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      {/* Base Card */}
      <div className="bg-gray-900 text-white rounded-md overflow-hidden shadow-lg">
        {/* Movie Poster */}
        <div className="relative aspect-[2/3]">
          <img
            src={movieData.posterUrl}
            alt={`${movieData.title} poster`}
            className="w-full h-full object-fill absolute inset-0"
            loading="lazy"
          />
        </div>

        {/* Expanded Info (shows on hover/focus) */}
        {isHovered && (
          <div
            className="absolute inset-0 bg-gray-900 bg-opacity-90 flex flex-col gap-4 p-3 opacity-100 transition-opacity duration-200"
          >
            <div className="flex flex-col h-full">
              {/* Title */}
              <h3 className="text-sm font-bold mb-1">{movieData.title}</h3>

              {/* Controls */}
              <div className="flex flex-wrap gap-1 mb-1">
                <button
                  aria-label="Play"
                  className="bg-white text-black p-1 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
                >
                  <Play size={14} />
                </button>
                <button
                  aria-label="Add to List"
                  className="border border-gray-400 p-1 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
                >
                  <Plus size={14} />
                </button>
                <button
                  aria-label="Thumbs Up"
                  className="border border-gray-400 p-1 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
                >
                  <ThumbsUp size={14} />
                </button>
                <button
                  aria-label="More Info"
                  className="border border-gray-400 p-1 rounded-full flex items-center justify-center ml-auto hover:scale-105 active:scale-95 transition-transform"
                >
                  <ChevronDown size={14} />
                </button>
              </div>

              {/* Info */}
              <div className="mt-2 overflow-y-auto flex-grow">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-green-500 font-bold">
                    {(movieData.rating * 20).toFixed(0)}% Match
                  </span>
                  <span className="border px-1 text-xs">{movieData.maturityRating}</span>
                  <span>{movieData.duration}</span>
                  <span className="border border-white rounded px-1 text-xs">HD</span>
                </div>

                <div className="flex flex-wrap gap-1 text-xs mb-1">
                  {movieData.genres.map((genre, index) => (
                    <span key={index}>
                      {genre}
                      {index < movieData.genres.length - 1 ? " • " : ""}
                    </span>
                  ))}
                </div>

                {/* Description with scrolling */}
                {movieData.description && (
                  <p className="text-xs text-gray-300 overflow-y-auto max-h-16">
                    {movieData.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Title (shows when not hovered) */}
      {!isHovered && (
        <div
          className="p-2 opacity-100 transition-opacity duration-300"
        >
          <h3 className="font-medium text-white text-xs">{movieData.title}</h3>
        </div>
      )}
    </div>
  );
}