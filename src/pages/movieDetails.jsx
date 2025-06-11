import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Play,
  Plus,
  ThumbsUp,
  Share2,
  Star,
  Clock,
  Calendar,
} from "lucide-react";
import MovieTrailer from "../components/movieThriller";
import MoviePoster from "../components/moviePoster";
import { useDispatch, useSelector } from "react-redux";
import { fetchMediaDetail } from "../App/features/movies/movieDetailSlice";

const MovieDetails = () => {
  const { id, media_type } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // FIXED: Changed 'movie' to 'media' and 'movieDetail' to 'mediaDetail'
  const { media, loading, error } = useSelector((state) => state.mediaDetail);

  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Fetch media details when component mounts or id/media_type changes
  useEffect(() => {
    if (id && media_type) {
      dispatch(fetchMediaDetail({ id, media_type }));
    }
  }, [dispatch, id, media_type]); // Added dispatch to dependencies

  // Handle back navigation with smooth transition
  const handleBack = () => {
    navigate(-1);
  };

  // Toggle watchlist status with visual feedback
  const toggleWatchlist = () => {
    setIsInWatchlist(!isInWatchlist);
  };

  // Toggle like status with visual feedback
  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  // Handle media sharing functionality
  const handleShare = () => {
    if (navigator.share && media) {
      navigator.share({
        title: media.title,
        text: `Check out ${media.title} - ${media.description.substring(0, 100)}...`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-black text-white"
    >
      {/* Hero Section with Backdrop */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img
          src={media.backdrop}
          alt={media.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        {/* Back Button */}
        <motion.button
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          onClick={handleBack}
          className="absolute top-4 left-4 z-20 bg-black/50 hover:bg-black/70 p-2 rounded-full backdrop-blur-sm transition-all duration-200"
        >
          <ArrowLeft className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Main Content */}
      <div className="px-4 md:px-8 -mt-32 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Movie Poster Component */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <MoviePoster
              poster={media.poster}
              title={media.title}
              year={media.year}
            />
          </motion.div>

          {/* Media Information */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex-1 space-y-6"
          >
            {/* Title and Basic Info */}
            <div>
              <h1 className="text-3xl md:text-5xl font-bold mb-2">
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
            </div>

            {/* Genre Tags */}
            <div className="flex flex-wrap gap-2">
              {media.genre?.map((g, index) => (
                <span
                  key={index}
                  className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-sm border border-red-600/30"
                >
                  {g}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="text-gray-300 text-lg leading-relaxed max-w-4xl">
              {media.description}
            </p>

            {/* Cast and Crew */}
            <div className="space-y-2">
              <div>
                <span className="text-gray-400">Director: </span>
                <span className="text-white">{media.director}</span>
              </div>
              <div>
                <span className="text-gray-400">Cast: </span>
                <span className="text-white">{media.cast?.join(", ")}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {/* Play Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-lg flex items-center gap-2 font-semibold transition-colors"
              >
                <Play className="w-5 h-5" />
                Play Now
              </motion.button>

              {/* Watchlist Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleWatchlist}
                className={`px-6 py-3 rounded-lg flex items-center gap-2 font-semibold transition-all ${
                  isInWatchlist
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                }`}
              >
                <Plus
                  className={`w-5 h-5 transition-transform ${
                    isInWatchlist ? "rotate-45" : ""
                  }`}
                />
                {isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
              </motion.button>

              {/* Like Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleLike}
                className={`p-3 rounded-lg transition-all ${
                  isLiked
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                }`}
              >
                <ThumbsUp
                  className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`}
                />
              </motion.button>

              {/* Share Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="bg-gray-700 hover:bg-gray-600 p-3 rounded-lg text-gray-300 transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Media Trailer Component */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <MovieTrailer
            trailerUrl={media.trailer}
            title={media.title}
            thumbnail={media.backdrop || media.poster}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MovieDetails;