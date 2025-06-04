// features/movie/movieSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Thunk to fetch popular movies
export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopularMovies",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`
      );
      return res.data.results;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
// thunk to fetch top rated movies
export const fetchTopRatedMovies = createAsyncThunk(
  "movies/fetchTopRatedMovies",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US&page=1`
      );
      return res.data.results;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
//thunk to fetch tv series
export const fetchTvSeries = createAsyncThunk(
  "movies/fetchTvSeries",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/tv/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`
      );
      return res.data.results;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
// Thunk to fetch search movies
export const fetchSearchMovies = createAsyncThunk(
  "movies/fetchSearchMovies",
  async (searchTerm, thunkAPI) => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${searchTerm}&page=1&include_adult=false`
      );
      return res.data.results;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

// Thunk to fetch trending movies
export const fetchTrendingMovies = createAsyncThunk(
  "movies/fetchTrendingMovies",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${TMDB_API_KEY}`
      );
      return res.data.results;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    popular: [],
    topRated: [],
    tvSeries: [],
    trending: [],
    searchResults: [],
    loading: false,
    searchLoading: false,
    error: null,
  },

  reducers: {
    // Clear search results when input is cleared
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Popular Movies
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.popular = action.payload;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      //tv series
      .addCase(fetchTvSeries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTvSeries.fulfilled, (state, action) => {
        state.loading = false;
        state.tvSeries = action.payload;
      })

      .addCase(fetchTvSeries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      // Top Rated Movies
      .addCase(fetchTopRatedMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.topRated = action.payload;
      })
      .addCase(fetchTopRatedMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      // Trending Movies
      .addCase(fetchTrendingMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.trending = action.payload;
      })
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      // ✅ Search Movies - THESE WERE MISSING
      .addCase(fetchSearchMovies.pending, (state) => {
        state.searchLoading = true;
        state.error = null;
      })
      .addCase(fetchSearchMovies.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(fetchSearchMovies.rejected, (state, action) => {
        state.searchLoading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { clearSearchResults } = movieSlice.actions;
export default movieSlice.reducer;
