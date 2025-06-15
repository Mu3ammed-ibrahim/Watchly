import { configureStore } from "@reduxjs/toolkit";
import watchlistReducer from "./features/watchlist/watchlistSlice"; // make sure the filename is correct
import movieReducer from "./features/movies/moviesSlice";
import mediaDetailReducer from "../app/features/movies/movieDetailSlice";
export const store = configureStore({
  reducer: {
    watchlist: watchlistReducer,
    mediaDetail: mediaDetailReducer,
    movies: movieReducer,
  },
});
