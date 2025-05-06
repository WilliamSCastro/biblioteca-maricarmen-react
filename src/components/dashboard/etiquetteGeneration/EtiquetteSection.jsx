import { ETIQUETTE_SCREENS } from "../../../constants";
import { useState, useEffect } from "react";
import { getExemplars } from "../../../services/api";
import Button from "../../utils/Button";
import Modal from "../../utils/Modal";

export default function EtiquetteSection() {

  const [currentEtiquetteScreen, setCurrentEtiquetteScreen] = useState(
    ETIQUETTE_SCREENS.SELECTION
  );

  const [hasSearched, setHasSearched] = useState(false);

  const [exemplars, setExemplars] = useState([]);

  const [exemplarToPrint, setExemplarToPrint] = useState(() => {
    const saved = localStorage.getItem("exemplarsToPrint");
    console.log("Saved exemplars:");
    console.table(saved);
    return saved ? JSON.parse(saved) : [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("exemplarsToPrint", JSON.stringify(exemplarToPrint));
  }, [exemplarToPrint]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsModalOpen(true);

    const formData = new FormData(event.target);
    const searchParams = Object.fromEntries(formData.entries());
    console.log("Search parameters:", searchParams);

    const token = localStorage.getItem("authToken");
    if (token) {
      // Aquí usamos await

      const exemplars = await getExemplars(searchParams, token);
      if (exemplars) {
        console.log("Exemplars:");
        console.table(exemplars);

        setExemplars(exemplars);
      } else {
        console.error("No se recibieron datos de ejemplares.");
      }
      setHasSearched(true); // <-- Indicamos que se hizo una búsqueda
    } else {
      console.error("No se encontró el token en localStorage.");
    }

    setIsModalOpen(false);
  };

  const handleScreenSelection = (screen) => {
    setCurrentEtiquetteScreen(screen);
  };

  // ✅ Añadir ejemplar a la lista y a localStorage
  const handleAddToPrint = (exemplar) => {
    const isAlreadyAdded = exemplarToPrint.some(
      (item) => item.registre === exemplar.registre
    );
    console.log("isAlreadyAdded?", isAlreadyAdded);
    if (!isAlreadyAdded) {
      const updatedList = [...exemplarToPrint, exemplar];
      setExemplarToPrint(updatedList);
    }
  };

  const handleRemoveAllFromPrint = () => {
    setExemplarToPrint([]);
  };

  const handleRemoveFromPrint = (registre) => {
    const updatedList = exemplarToPrint.filter(
      (exemplar) => exemplar.registre !== registre
    );
    setExemplarToPrint(updatedList);
  };

  return (
    <>
      <Modal isOpen={isModalOpen}>
        <p>Carregant exemplars</p>
      </Modal>
      <section id="etiquette-section">
        {currentEtiquetteScreen === ETIQUETTE_SCREENS.SELECTION && (
          <>
            <div className="title-box">
              <h2>Selecció d'etiquetes</h2>
              <Button
                onClick={() => handleScreenSelection(ETIQUETTE_SCREENS.PRINT)}
                className="default-important-button"
              >
                Imprimir etiquetes
              </Button>
            </div>
            <form action="" noValidate onSubmit={handleSubmit}>
              <div className="input-filter-box">
                <label htmlFor="titleAuthorEditorial">
                  Cerca per títol, autor o editorial
                </label>
                <input
                  type="text"
                  name="titleAuthorEditorial"
                  id="titleAuthorEditorial"
                  placeholder="Edebé"
                  className=" input-styling"
                />
              </div>
              {/* <label htmlFor="yearOfExemplar">Cerca per any</label>
            <input
              type="number"
              name="yearOfExemplar"
              id="yearOfExemplar"
              placeholder="Cercar per any"
            /> */}
              <div className="input-filter-box">
                <label htmlFor="titleAuthorEditorial">
                  Cerca per rang d'exemplar
                </label>
                <input
                  type="number"
                  name="rangeMinNumExemplar"
                  id="rangeMinNumExemplar"
                  placeholder="Mínim"
                  className=" input-styling"
                />
                <input
                  type="number"
                  name="rangeMaxNumExemplar"
                  id="rangeMaxNumExemplar"
                  placeholder="Màxim"
                  className=" input-styling"
                />
              </div>
              <div className="input-filter-box">
                <label htmlFor="exact_registration">
                  Cerca per registre exacte
                </label>
                <input
                  type="text"
                  name="exact_registration"
                  id="exact_registration"
                  placeholder="EX-YYYY-NNNNNN"
                  className=" input-styling"
                />
              </div>
              <div className="input-submit-box">
                <Button type="submit" className="submit-button">
                  Cercar exemplars
                </Button>
                <Button type="reset" className="reset-button">
                  Reestablir filtres
                </Button>
              </div>
            </form>

            {/* Mostrar mensajes según el estado */}
            {!hasSearched && (
              <p className="first-time-entering">
                Utilitza els filtres per a cercar exemplars
              </p>
            )}

            {hasSearched && exemplars.length === 0 && (
              <div className="no-results">
                <h3>Resultats de la cerca</h3>
                <p>No s’han trobat resultats</p>
              </div>
            )}

            {exemplars.length > 0 && (
              <div>
                <h3>Resultats de la cerca</h3>
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
                    {exemplars.map((exemplar) => {
                      const isAlreadyAdded = exemplarToPrint.some(
                        (item) => item.registre === exemplar.registre
                      );

                      return (
                        <tr key={exemplar.registre}>
                          <td>{exemplar.registre}</td>
                          <td>{exemplar.CDU}</td>
                          <td>{exemplar.titol}</td>
                          <td>{exemplar.autor}</td>
                          <td>{exemplar.editorial}</td>
                          <td>
                            {isAlreadyAdded ? (
                              <span>Afegit a impressió</span>
                            ) : (
                              <Button
                                onClick={() => handleAddToPrint(exemplar)}
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
              </div>
            )}
          </>
        )}

        {currentEtiquetteScreen === ETIQUETTE_SCREENS.PRINT && (
          <>
            <div className="title-box">
              <h2>Impressió d'etiquetes</h2>
              <Button
                onClick={() =>
                  handleScreenSelection(ETIQUETTE_SCREENS.SELECTION)
                }
                className="default-important-button"
              >
                Tornar a la selecció
              </Button>
            </div>
            {exemplarToPrint.length === 0 ? (
              <div className="no-results">
                <p>No hi ha exemplars seleccionats.</p>
              </div>
            ) : (
              <>
                <div className="print-actions">
                  <Button className="print-button">Imprimir tots</Button>
                  <Button className="clear-selection-button" onClick={handleRemoveAllFromPrint}>Eliminar tots</Button>
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
                    {exemplarToPrint.map((exemplar) => (
                      <tr key={exemplar.registre}>
                        <td>{exemplar.registre}</td>
                        <td>{exemplar.CDU}</td>
                        <td>{exemplar.titol}</td>
                        <td>{exemplar.autor}</td>
                        <td>{exemplar.editorial}</td>
                        <td>
                          <Button
                            onClick={() =>
                              handleRemoveFromPrint(exemplar.registre)
                            }
                            className="default-button-table-interaction"
                          >
                            Eliminar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </>
        )}
      </section>
    </>
  );
}
