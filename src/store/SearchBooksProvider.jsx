import React, { createContext, useState, useContext, useEffect } from 'react';
import {getSearch,fetchCatalegById} from '../services/api'
// Crear el contexto
export const SearchBooks = createContext();

export function SearchBooksProvider({ children }) {
  const [locatedBooks, setLocatedBooks] = useState(0);
  const [fiveBestResults, setfiveBestResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState([]);
  const [textInputSearch, setTextInputSearch] = useState('');
  const [infoCataleg, setInfoCataleg] = useState([]);
  const [locatedBooksCopy, setLocatedBooksCopy] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [userQuery, setUserQuery] = useState('');
  const [userResults, setUserResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isALoanAButtonActive, setIsALoanAButtonActive] = useState(false)
  const [loanExemplarID, setLoanExemplarId] = useState(null);
  const [isLoadingModal, setIsLoadingModal] = useState(false) 
  

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
  
    setIsLoadingModal(true); // 👈 Mostrar modal de carga
  
    try {
      if (textInputSearch === "") {
        setLocatedBooks([]);
      } else {
        params.append('q', textInputSearch);
  
        const results = await getSearch(params.toString(), 0);
        setLocatedBooks(results);
        setfiveBestResults([]);
        setInfoCataleg([]);
        setHasSearched(true);
      }
    } catch (error) {
      console.error("Error buscando libros:", error);
    } finally {
      setIsLoadingModal(false); // 👈 Ocultar modal
    }
  };

  const goToBack = () =>{
    setLocatedBooks(locatedBooksCopy)
    setInfoCataleg([])
  }
  const fetchCataleg = async (id) => {
    try {
      
      const data = await fetchCatalegById(id)
      setInfoCataleg(data);
     
      setLocatedBooksCopy(locatedBooks);
      setfiveBestResults([]); 
      setLocatedBooks([]);
      
    } catch (err) {

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
    hasSearched,
    isLoadingModal, 
    userQuery,   
    userResults,
    selectedUser,
    isALoanAButtonActive,
    loanExemplarID,
    setIsLoadingModal,          
    setLocatedBooks,
    setfiveBestResults,
    setSelectedBook,
    setTextInputSearch,
    searchBooks,
    fetchCataleg,
    goToBack,
    setHasSearched,
    setUserQuery,
    setUserResults,
    setSelectedUser,
    setIsALoanAButtonActive,
    setLoanExemplarId
  };
  return (
    <SearchBooks.Provider value={values}>
      {children}
    </SearchBooks.Provider>
  );
}

// Crear un hook personalizado para usar el contexto fácilmente
export const useSearchBooks = () => useContext(SearchBooks);