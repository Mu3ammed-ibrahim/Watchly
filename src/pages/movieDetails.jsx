import React, { useState, useEffect, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Clock, Calendar } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMediaDetail } from "../app/features/movies/movieDetailSlice";
import {
  addToWatchlist,
  removeMovie,
  removeTvSeries,
} from "../app/features/watchlist/watchlistSlice";

// Lazy-loaded components
const MovieTrailer = lazy(() => import("../components/movieThriller"));
const MoviePoster = lazy(() => import("../components/moviePoster"));
const Actionbuttons = lazy(() => import("../components/Actionbuttons"));
const LoadingSkelton = lazy(() => import("../components/LoadingSkelton"));
const ErrorMessage = lazy(() => import("../components/ErrorMessage"));

const MovieDetails = () => {
  const { id, media_type } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { media, loading, error } = useSelector((state) => state.mediaDetail);
  const movies = useSelector((state) => state.watchlist.movies);
  const tvSeries = useSelector((state) => state.watchlist.tvSeries);

  const isInWatchlist = media
    ? movies.some((movie) => movie.id === media.id) ||
      tvSeries.some((series) => series.id === media.id)
    : false;

  useEffect(() => {
    if (id && media_type) {
      dispatch(fetchMediaDetail({ id, media_type }));
    }
  }, [dispatch, id, media_type]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleTrailer = () => {
    setIsLoading(true);
    setIsModalOpen(true);
  };

  const toggleWatchlist = () => {
    if (isInWatchlist) {
      if (media_type === "movie") {
        dispatch(removeMovie(media.id));
      } else {
        dispatch(removeTvSeries(media.id));
      }
    } else {
      dispatch(
        addToWatchlist({
          ...media,
          type: media_type,
        })
      );
    }
  };

  if (loading) {
    return (
      <Suspense fallback={<div className="text-white p-4">Loading...</div>}>
        <LoadingSkelton />
      </Suspense>
    );
  }

  if (error) {
    return (
      <Suspense fallback={<div className="text-white p-4">Loading error...</div>}>
        <ErrorMessage error={error} handleBack={handleBack} />
      </Suspense>
    );
  }

  if (!media) {
    return (
      <Suspense fallback={<div className="text-white p-4">Loading...</div>}>
        <ErrorMessage error="Media not found" handleBack={handleBack} />
      </Suspense>
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
          <motion.section
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            aria-labelledby="media-title"
          >
            <Suspense fallback={<div className="text-white">Loading Poster...</div>}>
              <MoviePoster
                poster={media.poster}
                title={media.title}
                year={media.year}
              />
            </Suspense>
          </motion.section>

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

            <section aria-label="Description">
              <p className="text-gray-300 text-lg leading-relaxed max-w-4xl">
                {media.description}
              </p>
            </section>

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

            <Suspense fallback={<div className="text-white">Loading Buttons...</div>}>
              <Actionbuttons
                isInWatchlist={isInWatchlist}
                toggleWatchlist={toggleWatchlist}
                handleTrailer={handleTrailer}
              />
            </Suspense>
          </motion.section>
        </article>

        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
          aria-label="Media Trailer"
        >
          <Suspense fallback={<div className="text-white">Loading Trailer...</div>}>
            <MovieTrailer
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              isLoading={isLoading}
              trailerUrl={media.trailer}
              setIsLoading={setIsLoading}
              title={media.title}
              thumbnail={media.backdrop || media.poster}
            />
          </Suspense>
        </motion.section>
      </main>
    </motion.main>
  );
};

export default MovieDetails;
