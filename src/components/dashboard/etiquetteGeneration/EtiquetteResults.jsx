import { useEtiquetteContext } from "../../../store/EtiquetteGenerationProvider";
import Button from "../../utils/Button";

export default function EtiquetteResults() {
  const { exemplars, exemplarToPrint, handleAddToPrint, hasSearched } =
    useEtiquetteContext();

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
      <h3 className="results-found-title">Resultats de la cerca</h3>
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
          {exemplars.map((e) => {
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
                    <Button onClick={() => handleAddToPrint(e)} className="default-button-table-interaction">Afegir a impressió</Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
