import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const fetchMediaDetail = createAsyncThunk(
  "media/fetchMediaDetail",
  async ({ id, media_type }, thunkAPI) => {
    try {
      console.log("🔍 Starting fetch for:", { id, media_type, apiKey: TMDB_API_KEY ? "✅ Present" : "❌ Missing" });
      
      // Build URLs
      const mediaUrl = `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${TMDB_API_KEY}&language=en-US`;
      const creditsUrl = `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${TMDB_API_KEY}`;
      const videosUrl = `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${TMDB_API_KEY}&language=en-US`;
      
      console.log("📡 API URLs:", {
        media: mediaUrl,
        credits: creditsUrl,
        videos: videosUrl
      });

      // Make requests individually to see which one fails
      let mediaRes, creditsRes, videosRes;

      try {
        console.log("📡 Fetching media data...");
        mediaRes = await axios.get(mediaUrl);
        console.log("✅ Media data successful:", mediaRes.data);
      } catch (error) {
        console.error("❌ Media data failed:", error.response?.data || error.message);
        throw error;
      }

      try {
        console.log("📡 Fetching credits data...");
        creditsRes = await axios.get(creditsUrl);
        console.log("✅ Credits data successful:", creditsRes.data);
      } catch (error) {
        console.error("❌ Credits data failed:", error.response?.data || error.message);
        throw error;
      }

      try {
        console.log("📡 Fetching videos data...");
        videosRes = await axios.get(videosUrl);
        console.log("✅ Videos data successful:", videosRes.data);
      } catch (error) {
        console.error("❌ Videos data failed:", error.response?.data || error.message);
        throw error;
      }

      const mediaData = mediaRes.data;
      const creditsData = creditsRes.data;
      const videosData = videosRes.data;

      console.log("📊 Raw API responses:", {
        mediaData: mediaData,
        creditsCount: creditsData.cast?.length || 0,
        videosCount: videosData.results?.length || 0
      });

      // Enhanced director/creator logic for TV shows
      let director = "N/A";
      if (media_type === "movie") {
        const movieDirector = creditsData.crew?.find((p) => p.job === "Director");
        director = movieDirector ? movieDirector.name : "N/A";
      } else if (media_type === "tv") {
        // For TV shows, look for creators first, then executive producers
        if (mediaData.created_by && mediaData.created_by.length > 0) {
          director = mediaData.created_by[0].name;
        } else {
          const execProducer = creditsData.crew?.find((p) => p.job === "Executive Producer");
          director = execProducer ? execProducer.name : "N/A";
        }
      }

      const mainCast = creditsData.cast ? creditsData.cast.slice(0, 5).map((actor) => actor.name) : [];

      const trailer = videosData.results ? videosData.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      ) : null;

      // Enhanced data mapping
      const processedData = {
        title: mediaData.title || mediaData.name || "Unknown Title",
        description: mediaData.overview || "No description available",
        poster: mediaData.poster_path
          ? `https://image.tmdb.org/t/p/w500${mediaData.poster_path}`
          : null,
        backdrop: mediaData.backdrop_path
          ? `https://image.tmdb.org/t/p/w1280${mediaData.backdrop_path}`
          : null,
        year: (() => {
          const releaseDate = mediaData.release_date || mediaData.first_air_date;
          return releaseDate ? new Date(releaseDate).getFullYear() : "N/A";
        })(),
        duration: (() => {
          if (media_type === "movie") {
            return mediaData.runtime ? `${mediaData.runtime} min` : "N/A";
          } else {
            // TV show duration logic
            if (mediaData.episode_run_time && mediaData.episode_run_time.length > 0) {
              return `${mediaData.episode_run_time[0]} min/ep`;
            } else if (mediaData.number_of_seasons) {
              return `${mediaData.number_of_seasons} season${mediaData.number_of_seasons > 1 ? 's' : ''}`;
            }
            return "N/A";
          }
        })(),
        rating: mediaData.adult ? "R" : "PG-13",
        imdbRating: mediaData.vote_average
          ? mediaData.vote_average.toFixed(1)
          : "N/A",
        genre: mediaData.genres ? mediaData.genres.map((g) => g.name) : [],
        director,
        cast: mainCast,
        trailer: trailer ? `https://www.youtube.com/embed/${trailer.key}` : null,
        // Additional TV show specific data
        ...(media_type === "tv" && {
          numberOfSeasons: mediaData.number_of_seasons,
          numberOfEpisodes: mediaData.number_of_episodes,
          status: mediaData.status,
          lastAirDate: mediaData.last_air_date,
          networks: mediaData.networks?.map(n => n.name).join(", ") || "N/A"
        })
      };

      console.log("✅ Final processed data:", processedData);
      return processedData;

    } catch (err) {
      console.error("❌ COMPLETE ERROR DETAILS:");
      console.error("Error object:", err);
      console.error("Error message:", err.message);
      console.error("Error response:", err.response);
      console.error("Error response data:", err.response?.data);
      console.error("Error response status:", err.response?.status);
      console.error("Error config:", err.config);
      
      const errorMessage = err.response?.data?.status_message || 
                          err.response?.data?.message ||
                          err.message || 
                          `Failed to fetch ${media_type} details`;
      
      console.error("❌ Final error message:", errorMessage);
      
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Slice
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
        console.log("⏳ Redux: Setting loading to true");
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMediaDetail.fulfilled, (state, action) => {
        console.log("✅ Redux: Setting media data:", action.payload);
        state.loading = false;
        state.media = action.payload;
      })
      .addCase(fetchMediaDetail.rejected, (state, action) => {
        console.error("❌ Redux: Setting error:", action.payload);
        state.loading = false;
        state.error = action.payload;
        state.media = null;
      });
  },
});

export const { clearMediaDetail } = mediaDetailSlice.actions;
export default mediaDetailSlice.reducer;