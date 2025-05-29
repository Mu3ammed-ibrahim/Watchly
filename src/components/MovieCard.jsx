import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Play, Plus } from 'lucide-react';

// Default movie fallback
const defaultMovie = {
  id: 0,
  title: 'No Title',
  poster_path: null,
  posterUrl: null
};

export default function MovieCard({ movie }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.watchlist);
  const movieData = movie || defaultMovie;

  // Handle different API response formats
  // TMDB API typically returns 'poster_path', adjust based on your API
  const getPosterUrl = (movie) => {
    if (!movie) return null;
    
    // If your API returns posterUrl directly
    if (movie.posterUrl) return movie.posterUrl;
    
    // If using TMDB API (returns poster_path)
    if (movie.poster_path) {
      return `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    }
    
    // If using different API format, adjust accordingly
    if (movie.image) return movie.image;
    if (movie.poster) return movie.poster;
    
    return null;
  };

  const posterUrl = getPosterUrl(movieData);
  const movieTitle = movieData.title || movieData.name || 'No Title';

  // Debug: Console log to see the movie data structure
  console.log('Movie data:', movieData);

  return (
    <div
      className="relative rounded-md overflow-hidden hover:z-10 w-40 sm:w-48 md:w-52 transition-all duration-300 hover:scale-105 focus:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      {/* Poster */}
      <div className="bg-gray-900 text-white rounded-md overflow-hidden shadow-lg">
        <div className="relative aspect-[2/3]">
          {posterUrl && !imageError ? (
            <img
              src={posterUrl}
              alt={`${movieTitle} poster`}
              className="w-full h-full object-cover absolute inset-0"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            // Fallback when no image or image fails to load
            <div className="w-full h-full absolute inset-0 bg-gray-700 flex items-center justify-center">
              <div className="text-center p-4">
                <div className="text-4xl mb-2">🎬</div>
                <p className="text-xs text-gray-300">{movieTitle}</p>
              </div>
            </div>
          )}
          
          {/* Hover Overlay */}
          <div
            className={`absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-end p-3
              transition-opacity duration-300 ease-in-out ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          >
            <h3 className="text-white font-bold mb-3 text-sm">{movieTitle}</h3>
            <div className="flex gap-2">
              <button
                aria-label="Play"
                className="bg-white text-black p-2 rounded-full flex items-center justify-center 
                hover:bg-opacity-80 transition-all duration-200"
              >
                <Play size={16} />
              </button>
              <button
                aria-label="Add to List"
                className="border border-white p-2 rounded-full flex items-center justify-center
                hover:bg-white hover:bg-opacity-20 transition-all duration-200"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Title when not hovering */}
      <div
        className={`p-2 transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
      >
        <h3 className="font-medium text-white text-xs">{movieTitle}</h3>
      </div>
    </div>
  );
}