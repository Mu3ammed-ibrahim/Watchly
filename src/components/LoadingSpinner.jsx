import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-600 border-t-transparent mx-auto"></div>
        <p className="text-white text-lg">Loading..</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
