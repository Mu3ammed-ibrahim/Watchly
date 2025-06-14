import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const fetchMediaDetail = createAsyncThunk(
  "media/fetchMediaDetail",
  async ({ id, media_type }, thunkAPI) => {
    try {
      // Build URLs
      const baseUrl = `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${TMDB_API_KEY}&language=en-US`;
      const creditsUrl = `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${TMDB_API_KEY}`;
      const videosUrl = `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${TMDB_API_KEY}&language=en-US`;

      // Fetch all 3 in parallel
      const [mediaRes, creditsRes, videosRes] = await Promise.all([
        axios.get(baseUrl),
        axios.get(creditsUrl),
        axios.get(videosUrl),
      ]);

      const media = mediaRes.data;
      const credits = creditsRes.data;
      const videos = videosRes.data;

      // Director or Creator
      let director = "N/A";
      if (media_type === "movie") {
        const dir = credits.crew.find((p) => p.job === "Director");
        director = dir?.name || "N/A";
      } else if (media_type === "tv") {
        director = media.created_by?.[0]?.name || "N/A";
      }

      // Trailer
      const trailerObj = videos.results.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );
      const trailer = trailerObj ? `https://www.youtube.com/embed/${trailerObj.key}` : null;

      // Cast
      const cast = credits.cast.slice(0, 5).map((actor) => actor.name);

      // Format final data
      return {
        id, // <- include id for use in watchlist
        title: media.title || media.name,
        description: media.overview,
        poster: media.poster_path
          ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
          : null,
        backdrop: media.backdrop_path
          ? `https://image.tmdb.org/t/p/w1280${media.backdrop_path}`
          : null,
        year: (media.release_date || media.first_air_date || "").split("-")[0] || "N/A",
        duration: media.runtime
          ? `${media.runtime} min`
          : media.episode_run_time?.[0]
          ? `${media.episode_run_time[0]} min/ep`
          : "N/A",
        imdbRating: media.vote_average?.toFixed(1) || "N/A",
        genre: media.genres?.map((g) => g.name) || [],
        director,
        cast,
        trailer,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch media details");
    }
  }
);

const mediaDetailSlice = createSlice({
  name: "mediaDetail",
  initialState: {
    media: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearMediaDetail: (state) => {
      state.media = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMediaDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMediaDetail.fulfilled, (state, action) => {
        state.media = action.payload;
        state.loading = false;
      })
      .addCase(fetchMediaDetail.rejected, (state, action) => {
        state.loading = false;
        state.media = null;
        state.error = action.payload;
      });
  },
});

export const { clearMediaDetail } = mediaDetailSlice.actions;
export default mediaDetailSlice.reducer;
