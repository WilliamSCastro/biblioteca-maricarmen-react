import React, { useState, useContext, useEffect } from 'react';
import MarcCerca from './MarcCerca';
import SearchBooks from './SearchBooks';
import TableBooks from './TableBooks';
import { useSearchBooks } from '../../store/SearchBooksProvider';
import FiveBest from './FiveBest';
import CatalegDetail from './CatalegDetail';
import Modal from '../utils/Modal'
import PrestamoView from './PrestamoView';
function MainMenu() {

  const { hasSearched,infoCataleg, isLoadingModal ,fiveBestResults, locatedBooks, isALoanAButtonActive } = useSearchBooks();




  return (
    <main id="main-menu">



       

      { !isALoanAButtonActive && <SearchBooks></SearchBooks>}
      <Modal isOpen={isLoadingModal}>
          <p>Carregant Dades...</p>
        </Modal>
      {fiveBestResults.length > 0 && <FiveBest></FiveBest>}
      {infoCataleg && Object.keys(infoCataleg).length > 0 && !isALoanAButtonActive && <CatalegDetail />}
      {isALoanAButtonActive && <PrestamoView />}
      {hasSearched === true &&
        Array.isArray(locatedBooks) &&
        locatedBooks.length === 0 &&
        Object.keys(infoCataleg).length === 0 && !isALoanAButtonActive && 
        <h4>No hi ha llibres disponibles</h4>}
      {locatedBooks.length > 0 && Object.keys(infoCataleg).length === 0 && !isALoanAButtonActive && <TableBooks></TableBooks>}




    </main>
  );
}

export default MainMenu;