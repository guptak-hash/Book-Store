// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchBooks, sortByPriceHighToLow, sortByPriceLowToHigh, filterByPriceRange, resetFilters } from '../redux/booksSlice';
// import { addToCart } from '../redux/cartSlice';
// import { toast } from 'react-toastify';

// const BookList = () => {
//   const dispatch = useDispatch();
//   const { filteredBooks, loading, error } = useSelector(state => state.books);
//   const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });

//   useEffect(() => {
//     dispatch(fetchBooks());
//   }, [dispatch]);

//   const handleAddToCart = (book) => {
//     dispatch(addToCart(book));
//   };

//   const handleSortHighToLow = () => {
//     dispatch(sortByPriceHighToLow());
//   };

//   const handleSortLowToHigh = () => {
//     dispatch(sortByPriceLowToHigh());
//   };

//   const handlePriceRangeChange = (e) => {
//     const { name, value } = e.target;
//     setPriceRange(prev => ({
//       ...prev,
//       [name]: Number(value)
//     }));
//   };

//   const applyPriceFilter = () => {
//     dispatch(filterByPriceRange(priceRange));
//   };

//   const handleResetFilters = () => {
//     setPriceRange({ min: 0, max: 100 });
//     dispatch(resetFilters());
//   };

//   if (loading) {
//     return <div className="text-center py-10">Loading books...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-500 py-10">Error: {error}</div>;
//   }

//   return (
//     <div className="my-8">
//       <div className="mb-6 p-4 bg-gray-100 rounded-lg">
//         <h2 className="text-lg font-semibold mb-3">Sort & Filter</h2>
        
//         <div className="flex flex-wrap gap-4 mb-4">
//           <button 
//             onClick={handleSortHighToLow}
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             Price: High to Low
//           </button>
//           <button 
//             onClick={handleSortLowToHigh}
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             Price: Low to High
//           </button>
//         </div>
        
//         <div className="flex flex-wrap items-center gap-4">
//           <div>
//             <label className="block text-sm mb-1">Min Price ($)</label>
//             <input 
//               type="number" 
//               name="min"
//               value={priceRange.min}
//               onChange={handlePriceRangeChange}
//               className="w-24 p-2 border rounded"
//               min="0"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm mb-1">Max Price ($)</label>
//             <input 
//               type="number" 
//               name="max"
//               value={priceRange.max}
//               onChange={handlePriceRangeChange}
//               className="w-24 p-2 border rounded"
//               min="0"
//             />
//           </div>
          
//           <div className="flex gap-2">
//             <button 
//               onClick={applyPriceFilter}
//               className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//             >
//               Apply Filter
//             </button>
//             <button 
//               onClick={handleResetFilters}
//               className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
//             >
//               Reset All
//             </button>
//           </div>
//         </div>
//       </div>
      
//       {filteredBooks.length === 0 ? (
//         <div className="text-center py-10">No books found matching your criteria.</div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredBooks.map(book => (
//             <div key={book.id} className="border rounded-lg overflow-hidden shadow-md">
//               <div className="p-4">
//                 <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
//                 <p className="text-gray-700 mb-2">Author: {book.author}</p>
//                 <p className="text-gray-700 mb-4">Genre: {book.genre}</p>
//                 <div className="flex justify-between items-center">
//                   <span className="text-xl font-bold text-blue-600">${book.price.toFixed(2)}</span>
//                   <button
//                     onClick={() => handleAddToCart(book)}
//                     className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                   >
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookList;










// File: src/components/BookList.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, sortByPriceHighToLow, sortByPriceLowToHigh, filterByPriceRange, resetFilters } from '../redux/booksSlice';
import { addToCart } from '../redux/cartSlice';
import { toast } from 'react-toastify';

const BookList = () => {
  const dispatch = useDispatch();
  const { filteredBooks, loading, error } = useSelector(state => state.books);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleAddToCart = (book) => {
    dispatch(addToCart(book));
  };

  const handleSortHighToLow = () => {
    dispatch(sortByPriceHighToLow());
  };

  const handleSortLowToHigh = () => {
    dispatch(sortByPriceLowToHigh());
  };

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setPriceRange(prev => ({
      ...prev,
      [name]: Number(value)
    }));
  };

  const applyPriceFilter = () => {
    dispatch(filterByPriceRange(priceRange));
  };

  const handleResetFilters = () => {
    setPriceRange({ min: 0, max: 100 });
    dispatch(resetFilters());
  };

  if (loading) {
    return <div className="loading">Loading books...</div>;
  }

  if (error) {
    return <div className="empty-state">
      <h2>Error</h2>
      <p>{error}</p>
    </div>;
  }

  return (
    <div>
      <div className="filter-section">
        <h2>Sort & Filter</h2>
        
        <div className="filter-buttons">
          <button onClick={handleSortHighToLow} className="btn">
            Price: High to Low
          </button>
          <button onClick={handleSortLowToHigh} className="btn">
            Price: Low to High
          </button>
        </div>
        
        <div className="price-range">
          <div className="form-group">
            <label className="form-label">Min Price ($)</label>
            <input 
              type="number" 
              name="min"
              value={priceRange.min}
              onChange={handlePriceRangeChange}
              className="form-control price-input"
              min="0"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Max Price ($)</label>
            <input 
              type="number" 
              name="max"
              value={priceRange.max}
              onChange={handlePriceRangeChange}
              className="form-control price-input"
              min="0"
            />
          </div>
          
          <div>
            <button onClick={applyPriceFilter} className="btn btn-success">
              Apply Filter
            </button>
            <button onClick={handleResetFilters} className="btn btn-outline">
              Reset All
            </button>
          </div>
        </div>
      </div>
      
      {filteredBooks.length === 0 ? (
        <div className="empty-state">
          <h2>No Books Found</h2>
          <p>No books found matching your criteria.</p>
          <button onClick={handleResetFilters} className="btn">Reset Filters</button>
        </div>
      ) : (
        <div className="book-grid">
          {filteredBooks.map(book => (
            <div key={book.id} className="book-card">
              <div className="book-card-image"></div>
              <div className="book-card-content">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">By {book.author}</p>
                <span className="book-genre">{book.genre}</span>
                <div className="book-footer">
                  <span className="book-price">${book.price.toFixed(2)}</span>
                  <button
                    onClick={() => handleAddToCart(book)}
                    className="btn btn-small"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;