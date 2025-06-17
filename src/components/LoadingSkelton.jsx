import React from "react";

const LoadingSkelton = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="animate-pulse">
        <div className="h-64 md:h-96 bg-gray-800 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>
        <div className="px-4 md:px-8 -mt-32 relative z-10">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-48 h-72 bg-gray-800 rounded-lg" />
            <div className="flex-1 space-y-4">
              <div className="h-8 bg-gray-800 rounded w-3/4" />
              <div className="h-4 bg-gray-800 rounded w-1/2" />
              <div className="h-20 bg-gray-800 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkelton;
