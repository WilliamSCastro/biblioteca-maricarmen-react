import React, { useState } from 'react';
import MarcCerca from './SearchBook/MarcCerca';
import SearchBooks from './SearchBook/SearchBooks';
import TableBooks from './SearchBook/TableBooks';

function MainMenu() {

  const [locatedBooks, setLocatedBooks] = useState(null)


  return (
    <main id="main-menu">
      <SearchBooks></SearchBooks>
      {locatedBooks == null && <h4>No hi ha llibres disponibles</h4> }
      {locatedBooks != null && <TableBooks listBooks={locatedBooks}></TableBooks> }
      
    </main>
  );
}

export default MainMenu;