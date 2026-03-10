import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">

      <h1 className="text-6xl font-bold text-red-500">404</h1>

      <p className="text-xl mt-4 text-gray-700">
        Oops! Page Not Found
      </p>

      <Link 
        to="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Go Back Home
      </Link>

    </div>
  );
};

export default NotFound;