import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchMovies } from "../app/features/movies/moviesSlice";
import { Search, ArrowLeft, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const SearchedMovies = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const query = searchParams.get("q");
  const { searchResults, searchLoading, error } = useSelector(
    (state) => state.movies
  );

  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 20;

  useEffect(() => {
    if (query && query.length >= 3) {
      dispatch(fetchSearchMovies(query));
    }
  }, [query, dispatch]);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = searchResults.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );
  const totalPages = Math.ceil(searchResults.length / moviesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!query) {
    return (
      <main className="min-h-screen bg-[#141414] text-white pt-20">
        <section className="container mx-auto px-4 py-8 text-center">
          <Search size={64} className="mx-auto mb-4 text-gray-500" aria-hidden="true" />
          <h1 className="text-2xl font-bold mb-2">No search query provided</h1>
          <p className="text-gray-400 mb-6">
            Please enter a search term to find movies.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-[#e50914] hover:bg-[#b8070f] px-6 py-3 rounded-lg transition-colors"
          >
            Go Back Home
          </button>
        </section>
      </main>
    );
  }

  if (query.length < 3) {
    return (
      <main className="min-h-screen bg-[#141414] text-white pt-20">
        <section className="container mx-auto px-4 py-8 text-center">
          <Search size={64} className="mx-auto mb-4 text-gray-500" aria-hidden="true" />
          <h1 className="text-2xl font-bold mb-2">Search term too short</h1>
          <p className="text-gray-400 mb-6">
            Please enter at least 3 characters to search for movies.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-[#e50914] hover:bg-[#b8070f] px-6 py-3 rounded-lg transition-colors"
          >
            Go Back Home
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#141414] text-white pt-20">
      <section className="container mx-auto px-4 py-8">
        <header className="flex items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-400 hover:text-white transition-colors mr-4"
            aria-label="Go back"
          >
            <ArrowLeft size={20} className="mr-2" aria-hidden="true" />
            Back
          </button>
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Search Results for "{query}"
            </h1>
            {!searchLoading && (
              <p className="text-gray-400" aria-live="polite">
                {searchResults.length} {searchResults.length === 1 ? "movie" : "movies"} found
              </p>
            )}
          </div>
        </header>

        {/* Loading State */}
        {searchLoading && (
          <section
            className="flex items-center justify-center py-20"
            aria-live="assertive"
            aria-busy="true"
          >
            <Loader2 size={40} className="animate-spin text-[#e50914]" aria-hidden="true" />
            <span className="ml-3 text-lg">Searching movies...</span>
          </section>
        )}

        {/* Error State */}
        {error && !searchLoading && (
          <section className="text-center py-20" role="alert">
            <Search size={64} className="mx-auto mb-4" aria-hidden="true" />
            <h2 className="text-2xl font-bold mb-2">Search Error</h2>
            <p className="text-gray-400">
              There was an error searching for movies. Please try again.
            </p>
            <button
              onClick={() => dispatch(fetchSearchMovies(query))}
              className="bg-[#e50914] hover:bg-[#b8070f] px-6 py-3 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </section>
        )}

        {/* No Results */}
        {!searchLoading && !error && searchResults.length === 0 && (
          <section className="text-center py-20">
            <Search size={64} className="mx-auto mb-4 text-gray-500" aria-hidden="true" />
            <h2 className="text-2xl font-bold mb-2">No movies found</h2>
            <p className="text-gray-400 mb-6">
              Try different keywords or check your spelling.
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-[#e50914] hover:bg-[#b8070f] px-6 py-3 rounded-lg transition-colors"
            >
              Browse Popular Movies
            </button>
          </section>
        )}

        {/* Movies Grid */}
        {!searchLoading && !error && currentMovies.length > 0 && (
          <>
            <section aria-label="Search results">
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {currentMovies.map((movie, index) => (
                  <article key={movie.id} aria-label={`Movie: ${movie.title || "Untitled"}`}>
                    <MovieCard movie={movie} index={index} />
                  </article>
                ))}
              </motion.div>
            </section>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav
                className="flex justify-center mt-12"
                aria-label="Pagination Navigation"
              >
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
                    aria-disabled={currentPage === 1}
                  >
                    Previous
                  </button>

                  {/* Page Numbers */}
                  {[...Array(Math.min(5, totalPages))].map((_, index) => {
                    const pageNumber = Math.max(1, currentPage - 2) + index;
                    if (pageNumber > totalPages) return null;

                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          currentPage === pageNumber
                            ? "bg-[#e50914] text-white"
                            : "bg-gray-800 text-white hover:bg-gray-700"
                        }`}
                        aria-current={currentPage === pageNumber ? "page" : undefined}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
                    aria-disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </nav>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default SearchedMovies;
