import { useEtiquetteContext } from "../../../store/useEtiquetteContext";
import Button from "../../utils/Button";
import Pagination from "../../utils/Pagination";
import { useState } from "react";

export default function EtiquetteResults() {
  const { exemplars, exemplarToPrint, handleAddToPrint, hasSearched } =
    useEtiquetteContext();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentExemplars = exemplars.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(exemplars.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!hasSearched)
    return (
      <p className="first-time-entering">
        Utilitza els filtres per a cercar exemplars
      </p>
    );
  if (hasSearched && exemplars.length === 0)
    return (
      <div className="no-results">
        <h3>Resultats de la cerca</h3>
        <p>No s’han trobat resultats</p>
      </div>
    );

  return (
    <div>
      <h3 className="results-found-title">Resultats de la cerca: {exemplars.length} exemplars</h3>
      <table className="exemplars-table">
        <thead>
          <tr>
            <th>Registre</th>
            <th>CDU</th>
            <th>Títol</th>
            <th>Autor</th>
            <th>Editorial</th>
            <th>Acció</th>
          </tr>
        </thead>
        <tbody>
          {currentExemplars.map((e) => {
            const added = exemplarToPrint.some(
              (item) => item.registre === e.registre
            );
            return (
              <tr key={e.registre}>
                <td>{e.registre}</td>
                <td>{e.CDU}</td>
                <td>{e.titol}</td>
                <td>{e.autor}</td>
                <td>{e.editorial}</td>
                <td>
                  {added ? (
                    <span>Afegit a impressió</span>
                  ) : (
                    <Button
                      onClick={() => handleAddToPrint(e)}
                      className="default-button-table-interaction"
                    >
                      Afegir a impressió
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
