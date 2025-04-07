import { useContext, useState } from "react";
import ItemBestBook from "./ItemBestBooks";
import {SearchBooks} from '../../store/SearchBooksProvider'
export default function FiveBest() {
    
    const {fiveBestResults} = useContext(SearchBooks);

  return (
   
      <div className="fiveBestDiv">
        {fiveBestResults.map((book, index) => (
          <ItemBestBook
            key={index}
            onClick={() => setSelectedBook(book)}
          >{book["titol"]}</ItemBestBook>
        ))}
      </div>
   
  );
}