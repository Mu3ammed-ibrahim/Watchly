import { motion } from "framer-motion";
import { Play, Info } from "lucide-react";
import Row from "./Row";

export default function Featured() {
  // Sample movie data
  const movies = {
    trending: [
      {
        id: 1,
        title: "Inception",
        posterUrl: "/src/assets/inception.jpg",
        description: "Your mind is the scene of the crime.",
        year: "2010",
        rating: "8.8",
        maturityRating: "TV-MA",
        genres: ["Sci-Fi", "Action"],
        duration: "2h 28m",
      },
      {
        id: 2,
        title: "The Dark Knight",
        posterUrl: "/src/assets/the dark knight.jpg",
        description: "Why so serious?",
        year: "2008",
        rating: "9.0",
        maturityRating: "TV-MA",
        genres: ["Action", " Crime", "Drama"],
        duration: "2h 32m",
      },
      {
        id: 3,
        title: "Stranger Things",
        posterUrl: "/src/assets/stranger things.jpg",
        description: "The world is turning upside down.",
        year: "2016",
        rating: "8.7",
        maturityRating: "TV-MA",
        genres: ["Drama", "Fantasy", "Horror"],
        duration: "2h",
      },
    ],
  };
  return (
    <div className="bg-black min-h-screen text-white">
      {/* Content Rows */}
      <div className="  ">
        <Row title="Trending Now" movies={movies.trending} rowId={"trending"} />
      </div>
    </div>
  );
}
