// src/components/utils/SearchBar.jsx
import React from "react";
import Button from "./Button";

export default function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = "Buscar...",
  inputClassName = "input-field",
  buttonClassName = "searchButton",
}) {
  return (
    <div className="searchDiv">
      <input
        type="text"
        className={inputClassName}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <Button onClick={() => onSearch()} className={buttonClassName} />
    </div>
  );
}