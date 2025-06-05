import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    addMovie(state, action) {
      const exists = state.some((movie) => movie.id === action.payload.id);
      if (!exists) {
        state.push(action.payload);
      }
    },

    removeMovie(state, action) {
      return state.filter((movie) => movie.id !== action.payload);
    },
  },
});
console.log(watchlistSlice);    
export const { addMovie, removeMovie } = watchlistSlice.actions;
export default watchlistSlice.reducer;
