import React from "react";

const Loader = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50/50">
      {/* Sleek Circular Loading Spinner */}
      <div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
      <p className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
        Verifying Session...
      </p>
    </div>
  );
};

export default Loader;