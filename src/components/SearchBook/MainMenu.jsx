import React, { useState, useContext, useEffect } from 'react';
import MarcCerca from './MarcCerca';
import SearchBooks from './SearchBooks';
import TableBooks from './TableBooks';
import { useSearchBooks } from '../../store/SearchBooksProvider';
import FiveBest from './FiveBest';

function MainMenu() {

  const { fiveBestResults, locatedBooks } = useSearchBooks();
  


  return (
    <main id="main-menu">

      

        <SearchBooks></SearchBooks>
        {fiveBestResults.length > 0 && <FiveBest></FiveBest>}
        {fiveBestResults.length === 0 && <h4>No hi ha llibres disponibles</h4> }
        {locatedBooks.length > 0 && <TableBooks></TableBooks> }

      
      
      
    </main>
  );
}

export default MainMenu;