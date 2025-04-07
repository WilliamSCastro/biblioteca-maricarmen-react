import React, { createContext, useState, useContext, useEffect } from 'react';
import {getSearch} from '../services/api'
// Crear el contexto
export const SearchBooks = createContext();

export function SearchBooksProvider({ children }) {
  const [locatedBooks, setLocatedBooks] = useState([]);
  const [fiveBestResults, setfiveBestResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState([]);
  const [textInputSearch, setTextInputSearch] = useState('');
  const [infoCataleg, setInfoCataleg] = useState([]);
  const [locatedBooksCopy, setLocatedBooksCopy] = useState([]);
  // Este useEffect se ejecuta solo cuando cambia textInputSearch
  useEffect(() => {
    if (textInputSearch.length >= 3) {
      const fetchResults = async () => {
        const params = new URLSearchParams();
        params.append('q', textInputSearch);
  
        
  
        const results = await getSearch(params.toString(), 5);
        setfiveBestResults(results);
  
        
      };
  
      fetchResults()
    } else {
      setfiveBestResults([]);
    }
  }, [textInputSearch]);

  const searchBooks = async () => {
    const params = new URLSearchParams();

    if( textInputSearch === ""){
      setLocatedBooks([]);
    }else{
      params.append('q', textInputSearch);


      const results = await getSearch(params.toString(), 0);
      setLocatedBooks(results);
      
      setfiveBestResults([]);
      setInfoCataleg([])
    }
   
  };

  const goToBack = () =>{
    setLocatedBooks(locatedBooksCopy)
    setInfoCataleg([])
  }
  const fetchCataleg = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/cataleg/${id}`);
      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }
      const data = await response.json();
      setInfoCataleg(data);
      console.log(infoCataleg)
      setLocatedBooksCopy(locatedBooks);
      setfiveBestResults([]); 
      setLocatedBooks([]);

    } catch (err) {
      setError(err.message);
    }
  }

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
    infoCataleg,
    setLocatedBooks,
    setfiveBestResults,
    setSelectedBook,
    setTextInputSearch,
    searchBooks,
    fetchCataleg,
    goToBack
  };

  return (
    <SearchBooks.Provider value={values}>
      {children}
    </SearchBooks.Provider>
  );
}

// Crear un hook personalizado para usar el contexto fácilmente
export const useSearchBooks = () => useContext(SearchBooks);