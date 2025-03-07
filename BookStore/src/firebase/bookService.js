import { 
    collection, 
    addDoc, 
    doc, 
    updateDoc, 
    deleteDoc,
    getDocs,
    query,
    where,
    orderBy,
    serverTimestamp
  } from 'firebase/firestore';
  import { db } from './config';
  import { toast } from 'react-toastify';
  
  // Collection reference
  const booksCollection = collection(db, 'books');
  
  // Add a new book
  export const addBook = async (bookData) => {
    try {
      const newBook = {
        ...bookData,
        createdAt: serverTimestamp()
      };
      
      const docRef = await addDoc(booksCollection, newBook);
      toast.success('Book added successfully!');
      return { id: docRef.id, ...newBook };
    } catch (error) {
      toast.error('Error adding book: ' + error.message);
      throw error;
    }
  };
  
  // Update a book
  export const updateBook = async (id, updates) => {
    try {
      const bookRef = doc(db, 'books', id);
      await updateDoc(bookRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      
      toast.success('Book updated successfully!');
      return true;
    } catch (error) {
      toast.error('Error updating book: ' + error.message);
      throw error;
    }
  };
  
  // Delete a book
  export const deleteBook = async (id) => {
    try {
      const bookRef = doc(db, 'books', id);
      await deleteDoc(bookRef);
      
      toast.success('Book deleted successfully!');
      return true;
    } catch (error) {
      toast.error('Error deleting book: ' + error.message);
      throw error;
    }
  };
  
  // Fetch books with optional filters
  export const fetchBooks = async (filters = {}) => {
    try {
      let q = query(booksCollection);
      
      // Apply filters if provided
      if (filters.genre) {
        q = query(q, where('genre', '==', filters.genre));
      }
      
      if (filters.author) {
        q = query(q, where('author', '==', filters.author));
      }
      
      if (filters.sortBy) {
        q = query(q, orderBy(filters.sortBy, filters.sortOrder || 'asc'));
      }
      
      const querySnapshot = await getDocs(q);
      const books = [];
      
      querySnapshot.forEach((doc) => {
        books.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return books;
    } catch (error) {
      toast.error('Error fetching books: ' + error.message);
      throw error;
    }
  };