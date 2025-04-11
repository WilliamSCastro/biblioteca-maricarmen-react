import { useContext, useState } from "react";
import ItemBestBook from "./ItemBestBooks";
import {SearchBooks} from '../../store/SearchBooksProvider'
export default function FiveBest() {
    
    const {fiveBestResults, fetchCataleg} = useContext(SearchBooks);
    
  return (
      
      <div className="fiveBestDiv">
        {fiveBestResults.map((book, index) => (
          <ItemBestBook
            key={index}
            onClick={() => fetchCataleg(book["id"])}
          ><span className="bold-text" >{book["titol"]}</span>  - {book["autor"]}</ItemBestBook>
        ))}
      </div>
   
  );
}