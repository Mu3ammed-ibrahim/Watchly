import React from "react";

const MoviePoster = ({ poster, title}) => {
  return (
    <div className="relative w-full h-[70vh] text-white">
      {/* Background Image */}
      <img loading="lazy" src={poster} alt={title} className="w-full h-full object-cover rounded-lg" />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute bottom-10 left-5 md:left-10 max-w-[90%]">
        <h1 className="text-3xl md:text-5xl font-bold mb-2">{title}</h1>
      </div>
    </div>
  );
};

export default MoviePoster;
