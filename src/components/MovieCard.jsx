import { useState } from "react";
import { Calendar, Star } from "lucide-react";
import { Link } from "react-router-dom";

const defaultMovie = {
  id: 0,
  title: "No Title",
  poster_path: null,
  posterUrl: null,
};

export default function MovieCard({ movie }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const movieData = movie || defaultMovie;
  //
  const getPosterUrl = (movie) => {
    if (!movie) return null;
    if (movie.posterUrl) return movie.posterUrl;
    if (movie.poster_path)
      return `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    if (movie.image) return movie.image;
    if (movie.poster) return movie.poster;
    return null;
  };

  const posterUrl = getPosterUrl(movieData);
  const movieTitle = movieData.title || movieData.name || "No Title";
  const movieDate =
    movieData.release_date || movieData.first_air_date || "No Release Date";
  const Rating = Number(movieData.vote_average) || 0;
  const movieDescription = movieData.overview || "No Description";

  return (
    <Link to={`/movie/${movieData.id}`} className="block">
      <div
        className="relative rounded-md overflow-hidden hover:z-10 w-40 sm:w-48 md:w-52 transition-all duration-300 hover:scale-105 focus:scale-105"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        tabIndex={0}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
      >
        {/* Poster Section */}
        <section className="bg-gray-900 text-white rounded-md overflow-hidden shadow-lg">
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
              <div className="w-full h-full absolute inset-0 bg-gray-700 flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="text-4xl mb-2">🎬</div>
                  <p className="text-xs text-gray-300">{movieTitle}</p>
                </div>
              </div>
            )}

            {/* Hover Overlay */}
            <div
              className={`absolute inset-0 bg-black bg-opacity-80 transition-opacity duration-300 ease-in-out ${
                isHovered ? "opacity-100" : "opacity-0"
              } flex items-end p-3`}
            >
              <p className="text-xs line-clamp-4 text-white">
                {movieDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Info always visible */}
        <section className="p-2">
          <h3
            className={`font-medium text-xs transition-colors duration-300 ${
              isHovered ? "text-red-500" : "text-white"
            }`}
          >
            {movieTitle}
          </h3>
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center text-gray-400 text-xs">
              <Calendar size={16} />
              <span className="ml-1">
                {movieDate ? new Date(movieDate).getFullYear() : "Unknown"}
              </span>
            </div>
            {Rating > 0 && (
              <div className="flex items-center text-gray-400 text-xs">
                <Star size={10} className="text-yellow-400 mr-1" />
                <span className="ml-1">
                  {" "}
                  {Rating > 0 ? parseFloat(Rating).toFixed(1) : "N/A"}
                </span>
              </div>
            )}
          </div>
        </section>
      </div>
    </Link>
  );
}
