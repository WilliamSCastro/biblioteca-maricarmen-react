import { useEtiquetteContext } from "../../../store/EtiquetteGenerationProvider";
import Button from "../../utils/Button";
import Pagination from "../../utils/Pagination";
import { useState } from "react";

export default function EtiquettePrintView() {
  const {
    exemplarToPrint,
    handleRemoveFromPrint,
    handleRemoveAllFromPrint,
    handlePrint,
  } = useEtiquetteContext();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPrintingExemplars = exemplarToPrint.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(exemplarToPrint.length / itemsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (exemplarToPrint.length === 0)
    return (
      <div className="no-results">
        <p>No hi ha exemplars seleccionats.</p>
      </div>
    );

  return (
    <>
      <div className="print-actions">
        <Button onClick={handlePrint} className="print-button">
          Imprimir tots
        </Button>
        <Button
          onClick={handleRemoveAllFromPrint}
          className="clear-selection-button"
        >
          Eliminar tots
        </Button>
      </div>
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
          {currentPrintingExemplars.map((e) => (
            <tr key={e.registre}>
              <td>{e.registre}</td>
              <td>{e.CDU}</td>
              <td>{e.titol}</td>
              <td>{e.autor}</td>
              <td>{e.editorial}</td>
              <td>
                <Button onClick={() => handleRemoveFromPrint(e.registre)} className="default-button-table-interaction">
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}
