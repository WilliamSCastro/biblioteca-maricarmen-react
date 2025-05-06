import { useEtiquetteContext } from "../../../store/EtiquetteGenerationProvider";
import Button from "../../utils/Button";

export default function EtiquettePrintView() {
  const {
    exemplarToPrint,
    handleRemoveFromPrint,
    handleRemoveAllFromPrint,
    handlePrint,
  } = useEtiquetteContext();

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
          {exemplarToPrint.map((e) => (
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
    </>
  );
}
