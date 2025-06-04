import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Navbar from "./components/navbar.jsx";
import WatchList from "./pages/Whatchlist.jsx";
import About from "./pages/About.jsx";
import SearchedMovies from "./pages/SearchedMovies.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watchlist" element={<WatchList />} />
        <Route path="/search" element={<SearchedMovies />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
