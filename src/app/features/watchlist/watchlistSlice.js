import { createSlice } from "@reduxjs/toolkit";

// Load watchlist from localStorage on app start
const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("watchlist");
    return data ? JSON.parse(data) : { movies: [], tvSeries: [] };
  } catch (e) {
    console.error("Failed to load watchlist from localStorage:", e);
    return { movies: [], tvSeries: [] };
  }
};

// Save to localStorage whenever state changes
const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem("watchlist", JSON.stringify(state));
  } catch (e) {
    console.error("Failed to save watchlist to localStorage:", e);
  }
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: loadFromLocalStorage(), // initialize from localStorage
  reducers: {
    addToWatchlist: (state, action) => {
      const { type, ...item } = action.payload;
      const isMovie = type === "movie";
      const isTvSeries = type === "tv";

      if (isMovie) {
        const exists = state.movies.some((movie) => movie.id === item.id);
        if (!exists) state.movies.push(item);
      } else if (isTvSeries) {
        const exists = state.tvSeries.some((series) => series.id === item.id);
        if (!exists) state.tvSeries.push(item);
      }

      saveToLocalStorage(state);
    },

    removeMovie: (state, action) => {
      state.movies = state.movies.filter((movie) => movie.id !== action.payload);
      saveToLocalStorage(state);
    },

    removeTvSeries: (state, action) => {
      state.tvSeries = state.tvSeries.filter((series) => series.id !== action.payload);
      saveToLocalStorage(state);
    },
  },
});

// Export actions
export const { addToWatchlist, removeMovie, removeTvSeries } = watchlistSlice.actions;

// Selectors
export const selectMovies = (state) => state.watchlist.movies;
export const selectTvSeries = (state) => state.watchlist.tvSeries;

export default watchlistSlice.reducer;
