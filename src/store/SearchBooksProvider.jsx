import React, { createContext, useState, useContext, useEffect } from 'react';

// Crear el contexto
export const SearchBooks = createContext();

export function SearchBooksProvider({ children }) {
  const [locatedBooks, setLocatedBooks] = useState([]);
  const [fiveBestResults, setfiveBestResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState([]);
  const [textInputSearch, setTextInputSearch] = useState('');


  // Este useEffect se ejecuta solo cuando cambia textInputSearch
  useEffect(() => {
    if (textInputSearch.length >= 3) {
      const params = new URLSearchParams();
      params.append('q', textInputSearch);

      if (params.toString()) {
        fetch(`http://localhost:8000/api/buscar/?${params.toString()}`)
          .then((res) => res.json())
          .then((data) => setfiveBestResults(data.slice(0, 5))) // Limitar a 5 resultados
          .catch((err) => console.error('Error:', err));
      }
      
    } else {
      setfiveBestResults([]);
    }
  }, [textInputSearch]);
  useEffect(() => {
    if (textInputSearch.length < 3) {
      // Aquí haces lo que quieras: setear un array, llamar a una API, etc.
      setfiveBestResults([]);
    }
  }, [textInputSearch]);
  // Los valores a compartir en el contexto
  const values = {
    locatedBooks,
    fiveBestResults,
    selectedBook,
    textInputSearch,
    setLocatedBooks,
    setfiveBestResults,
    setSelectedBook,
    setTextInputSearch,
  };

  return (
    <SearchBooks.Provider value={values}>
      {children}
    </SearchBooks.Provider>
  );
}

// Crear un hook personalizado para usar el contexto fácilmente
export const useSearchBooks = () => useContext(SearchBooks);