import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Thunk to fetch movie detail with cast and crew
export const fetchMovieDetail = createAsyncThunk(
  "movies/fetchMovieDetail",
  async (movieId, thunkAPI) => {
    try {
      // Fetch movie details and credits in parallel
      const [movieRes, creditsRes, videosRes] = await Promise.all([
        axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`
        ),
        axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${TMDB_API_KEY}`
        ),
        axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${TMDB_API_KEY}&language=en-US`
        ),
      ]);

      const movieData = movieRes.data;
      const creditsData = creditsRes.data;
      const videosData = videosRes.data;

      // Find director from crew
      const director = creditsData.crew.find(
        (person) => person.job === "Director"
      );

      // Get main cast (first 5 actors)
      const mainCast = creditsData.cast.slice(0, 5).map((actor) => actor.name);
      console.log("Videos data:", videosData.results);

      // Find trailer - handle case where no trailer exists
      const trailer = videosData.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );

      // Get movie rating based on MPAA rating or use vote average
      const certification = movieData.adult ? "R" : "PG-13"; // Basic fallback

      return {
        title: movieData.title,
        description: movieData.overview,
        poster: movieData.poster_path
          ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
          : null,
        backdrop: movieData.backdrop_path
          ? `https://image.tmdb.org/t/p/w1280${movieData.backdrop_path}`
          : null,
        year: movieData.release_date
          ? new Date(movieData.release_date).getFullYear()
          : "N/A",
        duration: movieData.runtime ? `${movieData.runtime} min` : "N/A",
        rating: certification,
        imdbRating: movieData.vote_average
          ? movieData.vote_average.toFixed(1)
          : "N/A",
        genre: movieData.genres ? movieData.genres.map((g) => g.name) : [],
        director: director ? director.name : "N/A",
        cast: mainCast,
        // Fixed: Changed 'thriller' to 'trailer' and added null check
        trailer: trailer ? `https://www.youtube.com/embed/${trailer.key}` : null,
      };
    } catch (err) {
      console.error("Error fetching movie details:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.status_message ||
          err.message ||
          "Failed to fetch movie details"
      );
    }
  }
);

// Slice
const movieDetailSlice = createSlice({
  name: "movieDetail",
  initialState: {
    movie: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearMovieDetail: (state) => {
      state.movie = null;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ⏳ When request starts
      .addCase(fetchMovieDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // ✅ When request succeeds
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.movie = action.payload;
        state.error = null;
      })

      // ❌ When request fails
      .addCase(fetchMovieDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
        state.movie = null;
      });
  },
});

export const { clearMovieDetail, setError } = movieDetailSlice.actions;
export default movieDetailSlice.reducer;