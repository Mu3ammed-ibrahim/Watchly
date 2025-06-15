import React from "react";
import { motion } from "framer-motion";
import { Play, Plus } from "lucide-react"; // Don't forget to import these icons

const Actionbuttons = ({ handleTrailer, isInWatchlist, toggleWatchlist }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {/* Play Button */}
      <motion.button
        onClick={handleTrailer}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-lg flex items-center gap-2 font-semibold transition-colors"
      >
        <Play className="w-5 h-5" />
        Play Now
      </motion.button>

      {/* Watchlist Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleWatchlist}
        className={`px-6 py-3 rounded-lg flex items-center gap-2 font-semibold transition-all ${
          isInWatchlist
            ? "bg-green-600 hover:bg-green-700 text-white"
            : "bg-gray-700 hover:bg-gray-600 text-gray-300"
        }`}
      >
        <Plus
          className={`w-5 h-5 transition-transform ${
            isInWatchlist ? "rotate-45" : ""
          }`}
        />
        {isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
      </motion.button>
    </div>
  );
};

export default Actionbuttons;
