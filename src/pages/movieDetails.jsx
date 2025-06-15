import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Clock, Calendar } from "lucide-react";
import MovieTrailer from "../components/movieThriller";
import MoviePoster from "../components/moviePoster";
import { useDispatch, useSelector } from "react-redux";
import { fetchMediaDetail } from "../App/features/movies/movieDetailSlice";
import {
  addToWatchlist,
  removeMovie,
  removeTvSeries,
} from "../app/features/watchlist/watchlistSlice";
import Actionbuttons from "../components/Actionbuttons";

const MovieDetails = () => {
  const { id, media_type } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // FIXED: Changed 'movie' to 'media' and 'movieDetail' to 'mediaDetail'
  const { media, loading, error } = useSelector((state) => state.mediaDetail);

  // Get watchlist data from Redux store
  const movies = useSelector((state) => state.watchlist.movies);
  const tvSeries = useSelector((state) => state.watchlist.tvSeries);

  // Calculate if current media is in watchlist based on Redux state
  const isInWatchlist = media
    ? movies.some((movie) => movie.id === media.id) ||
      tvSeries.some((series) => series.id === media.id)
    : false;

  // Fetch media details when component mounts or id/media_type changes
  useEffect(() => {
    if (id && media_type) {
      dispatch(fetchMediaDetail({ id, media_type }));
    }
  }, [dispatch, id, media_type]);

  // Handle back navigation with smooth transition
  const handleBack = () => {
    navigate(-1);
  };

  const handleTrailer = () => {
    setIsLoading(true);
    setIsModalOpen(true);
  };

  // Toggle watchlist status - now properly synced with Redux
  const toggleWatchlist = () => {
    if (isInWatchlist) {
      // Remove from watchlist
      if (media_type === "movie") {
        dispatch(removeMovie(media.id));
      } else {
        dispatch(removeTvSeries(media.id));
      }
    } else {
      // Add to watchlist - include media_type for better detection
      console.log("Media ID:", media.id); // Must not be undefined
      console.log("Adding to watchlist", media);

      dispatch(
        addToWatchlist({
          ...media,
          type: media_type, // Use the media_type from URL params
        })
      );
    }
  };

  // Loading state with skeleton animation
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="animate-pulse">
          <div className="h-64 md:h-96 bg-gray-800 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>
          <div className="px-4 md:px-8 -mt-32 relative z-10">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-48 h-72 bg-gray-800 rounded-lg" />
              <div className="flex-1 space-y-4">
                <div className="h-8 bg-gray-800 rounded w-3/4" />
                <div className="h-4 bg-gray-800 rounded w-1/2" />
                <div className="h-20 bg-gray-800 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Error loading media</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={handleBack}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Media not found state
  if (!media) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Media not found</h2>
          <button
            onClick={handleBack}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

 return (
  <motion.main
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="min-h-screen bg-black text-white"
  >
    {/* Header Section with Backdrop */}
    <header className="relative h-64 md:h-96 overflow-hidden">
      <img
        src={media.backdrop}
        alt={media.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

      <motion.button
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        onClick={handleBack}
        className="absolute top-4 left-4 z-20 bg-black/50 hover:bg-black/70 p-2 rounded-full backdrop-blur-sm transition-all duration-200"
        aria-label="Go Back"
      >
        <ArrowLeft className="w-6 h-6" />
      </motion.button>
    </header>

    <main className="px-4 md:px-8 -mt-32 relative z-10">
      <article className="flex flex-col lg:flex-row gap-8">
        {/* Poster */}
        <motion.section
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          aria-labelledby="media-title"
        >
          <MoviePoster
            poster={media.poster}
            title={media.title}
            year={media.year}
          />
        </motion.section>

        {/* Info */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex-1 space-y-6"
        >
          <header>
            <h1
              id="media-title"
              className="text-3xl md:text-5xl font-bold mb-2"
            >
              {media.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-300">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {media.year}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {media.duration}
              </span>
              <span className="bg-gray-700 px-2 py-1 rounded text-sm">
                {media.rating}
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                {media.imdbRating}
              </span>
            </div>
          </header>

          {/* Genre Tags */}
          <section aria-label="Genres" className="flex flex-wrap gap-2">
            {media.genre?.map((g, index) => (
              <span
                key={index}
                className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-sm border border-red-600/30"
              >
                {g}
              </span>
            ))}
          </section>

          {/* Description */}
          <section aria-label="Description">
            <p className="text-gray-300 text-lg leading-relaxed max-w-4xl">
              {media.description}
            </p>
          </section>

          {/* Crew */}
          <section aria-label="Crew info" className="space-y-2">
            <div>
              <span className="text-gray-400">Director: </span>
              <span className="text-white">{media.director}</span>
            </div>
            <div>
              <span className="text-gray-400">Cast: </span>
              <span className="text-white">{media.cast?.join(", ")}</span>
            </div>
          </section>

          {/* Buttons */}
          <Actionbuttons
            isInWatchlist={isInWatchlist}
            toggleWatchlist={toggleWatchlist}
            handleTrailer={handleTrailer}
          />
        </motion.section>
      </article>

      {/* Trailer */}
      <motion.section
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12"
        aria-label="Media Trailer"
      >
        <MovieTrailer
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          isLoading={isLoading}
          trailerUrl={media.trailer}
          setIsLoading={setIsLoading}
          title={media.title}
          thumbnail={media.backdrop || media.poster}
        />
      </motion.section>
    </main>
  </motion.main>
);

};

export default MovieDetails;
