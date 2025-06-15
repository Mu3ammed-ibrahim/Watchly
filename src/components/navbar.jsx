import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSearchMovies,
  clearSearchResults,
} from "../app/features/movies/moviesSlice";
import { Menu, X, Film, Search, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // Add useNavigate

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showResults, setShowResults] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Add navigate hook
  const { searchResults, searchLoading } = useSelector((state) => state.movies);

  const searchRef = useRef(null);
  const timeoutRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
    if (!showSearch) {
      // Focus the input when opening search
      setTimeout(() => searchRef.current?.focus(), 100);
    } else {
      // Clear search when closing
      handleClearSearch();
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // If less than 3 characters, clear results and go back to home
    if (value.length < 3) {
      dispatch(clearSearchResults());
      setShowResults(false);
      // Only navigate to home if we're currently on search page and search is empty
      if (value.length === 0 && window.location.pathname === "/search") {
        navigate("/");
      }
      return;
    }

    // Navigate to search page immediately when user starts typing (3+ chars)
    navigate(`/search?q=${encodeURIComponent(value)}`);

    // Debounce search - wait 500ms after user stops typing
    timeoutRef.current = setTimeout(() => {
      dispatch(fetchSearchMovies(value));
      setShowResults(true);
    }, 500);
  };

  // Alternative: Handle form submission for Enter key
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.length >= 3) {
      navigate(`/search?q=${encodeURIComponent(searchValue)}`);
      setShowSearch(false); // Close search dropdown
      setShowResults(false);
    }
  };

  const handleClearSearch = () => {
    setSearchValue("");
    setShowResults(false);
    dispatch(clearSearchResults());
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // Navigate back to home when clearing search
    if (window.location.pathname === "/search") {
      navigate("/");
    }
  };

  const handleMovieSelect = () => {
    setShowSearch(false);
    setShowResults(false);
    handleClearSearch();
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const menuVariants = {
    hidden: {
      x: "-100%",
      transition: { type: "tween", duration: 0.3 },
    },
    visible: {
      x: 0,
      transition: { type: "tween", duration: 0.3 },
    },
  };

  const searchVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.2 },
    },
  };

  return (
  <header className="fixed top-0 left-0 w-full bg-[#141414] text-white z-50 font-sans shadow-md">
    <nav
      className="flex items-center justify-between p-4"
      role="navigation"
      aria-label="Main Navigation"
    >
      {/* Logo & Toggle */}
      <div className="flex items-center space-x-4">
        <button
          className="md:hidden z-50"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <a href="/" className="flex items-center space-x-2" aria-label="Homepage">
          <img src="/src/assets/Logo.png" alt="Watchly Logo" className="w-10 h-10" />
          <h1 className="text-xl md:text-4xl font-bold text-white text-center">Watchly</h1>
        </a>
      </div>

      {/* Desktop Links + Search */}
      <div className="flex items-center space-x-4 md:space-x-6">
        <ul className="hidden md:flex items-center space-x-6 font-sans" role="menubar">
          <li role="none">
            <Link to="/" role="menuitem" className="hover:text-[#e50914] transition-colors">
              Home
            </Link>
          </li>
          <li role="none">
            <Link to="/watchlist" role="menuitem" className="hover:text-[#e50914] transition-colors">
              Watchlist
            </Link>
          </li>
          <li role="none">
            <Link to="/about" role="menuitem" className="hover:text-[#e50914] transition-colors">
              About
            </Link>
          </li>
        </ul>

        {/* Search Area */}
        <div className="relative" ref={searchRef}>
          <button
            onClick={toggleSearch}
            aria-label="Toggle search"
            className="relative z-10"
          >
            <Search
              size={22}
              className={`hover:text-[#e50914] transition-colors duration-200 ${
                showSearch ? "text-[#e50914]" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {showSearch && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={searchVariants}
                className="absolute top-8 right-0 w-80 md:w-80 sm:w-72 xs:w-64 bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-2xl overflow-hidden"
              >
                {/* Search Form */}
                <form onSubmit={handleSearchSubmit} role="search">
                  <div className="relative">
                    <input
                      ref={searchRef}
                      type="text"
                      placeholder="Search movies... (min 3 characters)"
                      value={searchValue}
                      onChange={handleSearchChange}
                      className="w-full bg-transparent text-white px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#e50914] border-b border-gray-700"
                      autoFocus
                      aria-label="Search movies"
                    />
                    {searchLoading && (
                      <Loader2 className="absolute right-3 top-3 h-5 w-5 animate-spin text-[#e50914]" />
                    )}
                    {searchValue && !searchLoading && (
                      <button
                        type="button"
                        onClick={handleClearSearch}
                        className="absolute right-3 top-3 h-5 w-5 text-gray-400 hover:text-white"
                        aria-label="Clear search"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                </form>

                {/* Search Results */}
                {showResults && (
                  <div className="max-h-60 overflow-y-auto" aria-live="polite">
                    {searchResults.length > 0 ? (
                      <div className="p-2">
                        <div className="text-xs text-gray-400 px-2 py-1 mb-2">
                          Quick preview – Press Enter or continue typing
                        </div>
                        {searchResults.slice(0, 3).map((movie) => (
                          <Link
                            key={movie.id}
                            to={`/movie/${movie.id}`}
                            onClick={handleMovieSelect}
                            className="flex items-center p-3 hover:bg-[#2a2a2a] rounded-lg transition-colors group"
                          >
                            <div className="flex-shrink-0 w-12 h-16 bg-gray-800 rounded overflow-hidden mr-3">
                              {movie.poster_path ? (
                                <img
                                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                                  alt={movie.title}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-500">
                                  <Film size={16} />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-white font-medium text-sm truncate group-hover:text-[#e50914] transition-colors">
                                {movie.title}
                              </h4>
                              <p className="text-gray-400 text-xs mt-1">
                                {movie.release_date
                                  ? new Date(movie.release_date).getFullYear()
                                  : "Unknown"}
                              </p>
                              {movie.vote_average > 0 && (
                                <div className="flex items-center mt-1">
                                  <span className="text-yellow-400 text-xs">★</span>
                                  <span className="text-gray-400 text-xs ml-1">
                                    {movie.vote_average.toFixed(1)}
                                  </span>
                                </div>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="p-6 text-center text-gray-400">
                        <Search size={32} className="mx-auto mb-2 opacity-50" />
                        <p className="text-sm">
                          {searchValue.length < 3
                            ? "Type at least 3 characters to search"
                            : "No movies found"}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>

    {/* Mobile Menu */}
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={menuVariants}
          className="fixed top-0 left-0 w-64 h-full bg-[#1c1c1c] md:hidden z-40 pt-16"
          aria-label="Mobile Navigation"
        >
          <ul className="flex flex-col space-y-4 p-4">
            <li className="hover:bg-[#2a2a2a] p-2 rounded">
              <Link
                to="/"
                className="block w-full"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li className="hover:bg-[#2a2a2a] p-2 rounded">
              <Link
                to="/watchlist"
                className="block w-full"
                onClick={() => setIsOpen(false)}
              >
                Watchlist
              </Link>
            </li>
            <li className="hover:bg-[#2a2a2a] p-2 rounded">
              <Link
                to="/about"
                className="block w-full"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
            </li>
          </ul>
        </motion.aside>
      )}
    </AnimatePresence>

    {/* Overlay */}
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        onClick={toggleMenu}
        className="fixed inset-0 bg-black md:hidden z-30"
        aria-hidden="true"
      />
    )}
  </header>
);

};

export default Navbar;
