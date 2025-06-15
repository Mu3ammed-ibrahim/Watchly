import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeMovie, removeTvSeries } from "../app/features/watchlist/watchlistSlice"; // Update this path
import MovieCard from "../components/MovieCard";


const Watchlist = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.watchlist.movies);
  const tvSeries = useSelector((state) => state.watchlist.tvSeries);

  const isEmpty = movies.length === 0 && tvSeries.length === 0;

  const handleRemoveMovie = (movieId, e) => {
    e.preventDefault(); // Prevent Link navigation
    dispatch(removeMovie(movieId));
  };

  const handleRemoveTvSeries = (seriesId, e) => {
    e.preventDefault(); // Prevent Link navigation
    dispatch(removeTvSeries(seriesId));
  };

  return (
    <section className="min-h-screen p-4 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">My Watchlist</h2>

        {isEmpty ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-4">Your watchlist is empty.</p>
            <Link 
              to="/" 
              className="text-white hover:text-red-600 font-semibold"
            >
              Browse movies and TV shows
            </Link>
          </div>
        ) : (
          <>
            {/* Movies Section */}
            {movies.length > 0 && (
              <div className="mb-10">
                <h3 className="text-2xl font-semibold mb-4">
                  Movies ({movies.length})
                </h3>
                <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {movies.map((movie) => (
                    <div key={movie.id} className="group relative">
                      <Link
                        to={`/movie/${movie.id}`}
                        className="block"
                      >
                        <img
                          src={movie.poster || movie.image || "/fallback.jpg"}
                          alt={movie.title}
                          className="w-full h-auto rounded-lg object-cover group-hover:opacity-80 transition"
                        />
                        <div className="mt-2 text-sm text-center">{movie.title}</div>
                      </Link>
                      
                      {/* Remove Button */}
                      <button
                        onClick={(e) => handleRemoveMovie(movie.id, e)}
                        className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove from watchlist"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TV Series Section */}
            {tvSeries.length > 0 && (
              <div>
                <h3 className="text-2xl font-semibold mb-4">
                  TV Series ({tvSeries.length})
                </h3>
                <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {tvSeries.map((Series) => (
                    <div key={Series.id} className="group relative">
                      <Link
                        to={`/tv/${Series.id}`}
                        className="block"
                      >
                        <img
                          src={Series.poster || Series.image || "/fallback.jpg"}
                          alt={Series.name || Series.title}
                          className="w-full h-auto rounded-lg object-cover group-hover:opacity-80 transition"
                        />
                        <div className="mt-2 text-sm text-center">
                          {Series.name || Series.title}
                        </div>
                      </Link>
                      
                      {/* Remove Button */}
                      <button
                        onClick={(e) => handleRemoveTvSeries(Series.id, e)}
                        className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove from watchlist"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Watchlist;