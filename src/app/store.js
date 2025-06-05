import { configureStore } from "@reduxjs/toolkit";
import watchlistReducer from "./features/watchlist/watchlistSlice"; // make sure the filename is correct
import movieReducer from "./features/movies/moviesSlice";

export const store = configureStore({
  reducer: {
    watchlist: watchlistReducer,
    movies: movieReducer,
  },
});
