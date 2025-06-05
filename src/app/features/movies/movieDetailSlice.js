import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Thunk to fetch movie detail
export const fetchMovieDetail = createAsyncThunk(
  "movies/fetchMovieDetail",
  async (movieId, thunkAPI) => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data || "Failed to fetch movie detail");
    }
  }
);

// Slice
const movieDetailSlice = createSlice({
  name: "movieDetail",
  initialState: {
    title: "",
    overview: "",
    poster_path: "",
    vote_average: 0,
    loading: false,
    error: null,
  },
  reducers: {},
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
        state.title = action.payload.title;
        state.overview = action.payload.overview;
        state.poster_path = action.payload.poster_path;
        state.vote_average = action.payload.vote_average;
      })

      // ❌ When request fails
      .addCase(fetchMovieDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default movieDetailSlice.reducer;
