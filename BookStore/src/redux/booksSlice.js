import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (_, { rejectWithValue }) => {
    try {
      const booksCollection = collection(db, 'books');
      const q = query(booksCollection);
      const querySnapshot = await getDocs(q);
      
      const books = [];
      querySnapshot.forEach((doc) => {
        books.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      
      return books;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  books: [],
  filteredBooks: [],
  loading: false,
  error: null,
  sortOrder: null,
  priceRange: { min: 0, max: Infinity },
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    sortByPriceHighToLow: (state) => {
      state.sortOrder = 'highToLow';
      state.filteredBooks = [...state.filteredBooks].sort((a, b) => b.price - a.price);
    },
    sortByPriceLowToHigh: (state) => {
      state.sortOrder = 'lowToHigh';
      state.filteredBooks = [...state.filteredBooks].sort((a, b) => a.price - b.price);
    },
    filterByPriceRange: (state, action) => {
      const { min, max } = action.payload;
      state.priceRange = { min, max };
      state.filteredBooks = state.books.filter(
        book => book.price >= min && book.price <= max
      );
      
      // Apply existing sort if any
      if (state.sortOrder === 'highToLow') {
        state.filteredBooks.sort((a, b) => b.price - a.price);
      } else if (state.sortOrder === 'lowToHigh') {
        state.filteredBooks.sort((a, b) => a.price - b.price);
      }
    },
    resetFilters: (state) => {
      state.filteredBooks = [...state.books];
      state.sortOrder = null;
      state.priceRange = { min: 0, max: Infinity };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.books = action.payload;
        state.filteredBooks = action.payload;
        state.loading = false;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  sortByPriceHighToLow, 
  sortByPriceLowToHigh, 
  filterByPriceRange,
  resetFilters
} = booksSlice.actions;

export default booksSlice.reducer;