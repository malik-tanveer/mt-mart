import React from "react";

const Home = () => {
  return (
    <div className="w-full">

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 bg-gray-100">

        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Welcome to Our Store 🛒
        </h1>

        <p className="mt-4 max-w-xl text-gray-600">
          Discover amazing products at the best prices. 
          Shop easily, add items to your cart, and enjoy 
          a smooth online shopping experience.
        </p>

        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Shop Now
        </button>

      </section>

    </div>
  );
};

export default Home;