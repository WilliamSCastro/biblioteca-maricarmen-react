import { SearchBooks } from '../../store/SearchBooksProvider';
import Button from "../utils/Button";
import { useContext, useState } from 'react';

export default function TableBooks() {
  const { fetchCataleg, locatedBooks, setSelectedBook } = useContext(SearchBooks);

  // Estado de la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // Libros por página

  // Cálculo de índices
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = locatedBooks.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(locatedBooks.length / itemsPerPage);

  // Handlers de navegación
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div>
      <table className="catalogTable">
        <thead>
          <tr>
            <th>Títol</th>
            <th>Autor</th>
            <th>Més Dades</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((book, idx) => (
            <tr key={idx}>
              <td>{book.titol}</td>
              <td>{book.autor}</td>
              <td className="tableButtonCell">
                <Button
                  className="default-button"
                  onClick={() => {
                    fetchCataleg(book.id);
                    setSelectedBook(book.id);
                  }}
                >
                  Veure detall
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Controles de paginación */}
      {locatedBooks.length > itemsPerPage && (
        <div className="pagination">
          <Button
            className="default-button"
            onClick={goToPrevPage}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>

          <span style={{ margin: '0 1rem' }}>
            Pàgina {currentPage} de {totalPages}
          </span>

          <Button
            className="default-button"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Següent
          </Button>
        </div>
      )}
    </div>
  );
}