import { createSlice } from "@reduxjs/toolkit";

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    movies: [],
    tvSeries: [],
  },
  reducers: {
    // Add to watchlist (auto-detects movie vs TV series)
    addToWatchlist: (state, action) => {
      const { type, ...item } = action.payload;
      const isMovie = type === "movie";
      const isTvSeries = type === "tv";

      if (isMovie) {
        const exists = state.movies.find((movie) => movie.id === item.id);
        if (!exists) {
          state.movies.push(item); // only the item data
        }
      } else if (isTvSeries) {
        const exists = state.tvSeries.find((series) => series.id === item.id);
        if (!exists) {
          state.tvSeries.push(item); // only the item data
        }
      }
    },

    // Remove movie from watchlist
    removeMovie: (state, action) => {
      const movieId = action.payload;
      state.movies = state.movies.filter((movie) => movie.id !== movieId);
    },

    // Remove TV series from watchlist
    removeTvSeries: (state, action) => {
      const seriesId = action.payload;
      state.tvSeries = state.tvSeries.filter(
        (series) => series.id !== seriesId
      );
    },
  },
});

// Export actions
export const { addToWatchlist, removeMovie, removeTvSeries } =
  watchlistSlice.actions;

// Basic selectors
export const selectMovies = (state) => state.watchlist.movies;
export const selectTvSeries = (state) => state.watchlist.tvSeries;

export default watchlistSlice.reducer;
