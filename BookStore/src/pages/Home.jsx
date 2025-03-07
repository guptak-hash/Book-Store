import React from 'react';
import BookList from '../components/BookList';

const Home = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome to Our Book Store</h1>
      <p className="mb-8 text-gray-700">Browse our collection of books and add them to your cart.</p>
      <BookList />
    </div>
  );
};

export default Home;