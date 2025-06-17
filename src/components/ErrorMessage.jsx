import React from "react";

const ErrorMessage = ({ error, handleBack }) => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Error loading media</h2>
        <p className="text-gray-400 mb-4">{error}</p>
        <button
          onClick={handleBack}
          className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;
