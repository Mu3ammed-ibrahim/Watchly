import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPopularMovies, fetchTrendingMovies, fetchTvSeries, fetchTopRatedMovies } from '../redux/features/movies/moviesSlice'; 
import Hero from "../components/HeroSection.jsx";
import Featured from "../components/Featured.jsx";

function Home() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Fetch movie data when Home component mounts
    dispatch(fetchTrendingMovies());
    dispatch(fetchTvSeries());
    dispatch(fetchTopRatedMovies());
    dispatch(fetchPopularMovies());
  }, [dispatch]);

  return (
    <>
      <Hero />
      <Featured />
    </>
  );
}

export default Home;