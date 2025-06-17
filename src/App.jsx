import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Components (eagerly loaded because they appear on every page)
import Navbar from "./components/navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrolltoTop from "./components/ScrolltoTop.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";

// Lazy loaded pages
const Home = lazy(() => import("./pages/Home.jsx"));
const WatchList = lazy(() => import("./pages/Whatchlist.jsx"));
const MovieDetails = lazy(() => import("./pages/movieDetails.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const SearchedMovies = lazy(() => import("./pages/SearchedMovies.jsx"));

function App() {
  return (
    <Router>
      <ScrolltoTop />
      <Navbar />

      {/* Suspense fallback while components are loading */}
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/:media_type/:id" element={<MovieDetails />} />
          <Route path="/search" element={<SearchedMovies />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>

      <Footer />
    </Router>
  );
}

export default App;
