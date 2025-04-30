// src/components/SearchBook/MarcCerca.jsx
import React from "react";
import SearchBar from "../utils/SearchBar";
import { useSearchBooks } from "../../store/SearchBooksProvider";

export default function MarcCerca() {
  const { textInputSearch, setTextInputSearch, searchBooks } = useSearchBooks();

  return (
    <SearchBar
      value={textInputSearch}
      onChange={setTextInputSearch}
      onSearch={searchBooks}
      placeholder="Buscar llibre..."
      inputClassName="input-field"
      buttonClassName="searchButton"
    />
  );
}