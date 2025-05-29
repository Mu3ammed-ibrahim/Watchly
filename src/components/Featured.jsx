import { useSelector } from "react-redux";
import Row from "./Row";

export default function Featured() {
  const trendingMovies = useSelector((state) => state.movies.trending);
  const popularMovies = useSelector((state) => state.movies.popular);
  const loading = useSelector((state) => state.movies.loading);
  const error = useSelector((state) => state.movies.error);

  // Show loading state
  if (loading) {
    return (
      <div className="bg-black min-h-screen text-white flex items-center justify-center">
        <div className="text-xl">Loading movies... ⏳</div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="bg-black min-h-screen text-white flex items-center justify-center">
        <div className="text-xl text-red-500">Error: {error} ❌</div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <div>
        <Row title="Trending Now" movies={trendingMovies} rowId="trending" />
        <Row title="Popular Movies" movies={popularMovies} rowId="popular" />
      </div>
    </div>
  );
}
