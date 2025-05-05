import { ETIQUETTE_SCREENS } from "../../../constants";
import { useState, useEffect } from "react";
import { getExemplars } from "../../../services/api";
import Button from "../../utils/Button";

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

  useEffect(() => {
    localStorage.setItem("exemplarsToPrint", JSON.stringify(exemplarToPrint));
  }, [exemplarToPrint]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const searchParams = Object.fromEntries(formData.entries());
    console.log("Search parameters:", searchParams);

    const token = localStorage.getItem("authToken");
    if (token) {
      // Aquí usamos await
      setHasSearched(true); // <-- Indicamos que se hizo una búsqueda
      const exemplars = await getExemplars(searchParams, token);
      if (exemplars) {
        console.log("Exemplars:");
        console.table(exemplars);
        setExemplars(exemplars);
      } else {
        console.error("No se recibieron datos de ejemplares.");
      }
    } else {
      console.error("No se encontró el token en localStorage.");
    }
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

  const handleRemoveFromPrint = (registre) => {
    const updatedList = exemplarToPrint.filter(
      (exemplar) => exemplar.registre !== registre
    );
    setExemplarToPrint(updatedList);
  };

  return (
    <section id="etiquette-section">
      {currentEtiquetteScreen === ETIQUETTE_SCREENS.SELECTION && (
        <>
          <div className="title-box">
            <h2>Selecció d'etiquetes</h2>
            <Button
              onClick={() => handleScreenSelection(ETIQUETTE_SCREENS.PRINT)}
              className="default-button"
            >
              Imprimir etiquetes
            </Button>
          </div>
          <form action="" noValidate onSubmit={handleSubmit}>
            <label htmlFor="titleAuthorEditorial">
              Cerca per títol, autor o editorial
            </label>
            <input
              type="text"
              name="titleAuthorEditorial"
              id="titleAuthorEditorial"
              placeholder="Cercar per títol, autor o editorial"
            />
            {/* <label htmlFor="yearOfExemplar">Cerca per any</label>
            <input
              type="number"
              name="yearOfExemplar"
              id="yearOfExemplar"
              placeholder="Cercar per any"
            /> */}
            <br />
            <label htmlFor="titleAuthorEditorial">
              Cerca per rang d'exemplar
            </label>
            <input
              type="number"
              name="rangeMinNumExemplar"
              id="rangeMinNumExemplar"
              placeholder="Mínim"
            />
            <input
              type="number"
              name="rangeMaxNumExemplar"
              id="rangeMaxNumExemplar"
              placeholder="Màxim"
            />
            <br />

            <Button type="submit">Cercar</Button>
            <input type="reset" />
          </form>

          {/* Mostrar mensajes según el estado */}
          {!hasSearched && <p>Usa els filtres per a cercar exemplars.</p>}

          {hasSearched && exemplars.length === 0 && (
            <>
             <h3>Resultats de la cerca:</h3>
            <p>No s’han trobat resultats.</p>
            </>
          )}

          {exemplars.length > 0 && (
            <div>
              <h3>Resultats de la cerca:</h3>
              <ul>
                {exemplars.map((exemplar) => {
                  const isAlreadyAdded = exemplarToPrint.some(
                    (item) => item.registre === exemplar.registre
                  );

                  return (
                    <li key={exemplar.registre}>
                      {exemplar.registre} - {exemplar.titol} - {exemplar.autor}{" "}
                      - {exemplar.editorial} - 
                      {isAlreadyAdded ? (
                        <span>Llest per impressió</span>
                      ) : (
                        <Button onClick={() => handleAddToPrint(exemplar)}>
                          Afegir a impressió
                        </Button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </>
      )}

      {currentEtiquetteScreen === ETIQUETTE_SCREENS.PRINT && (
        <>
        <div>
          <h2>Impressió d'etiquetes</h2>
          <Button
            onClick={() => handleScreenSelection(ETIQUETTE_SCREENS.SELECTION)}
          >
            Tornar a la selecció
          </Button>
          </div>
          {exemplarToPrint.length === 0 ? (
            <p>No hi ha exemplars seleccionats.</p>
          ) : (
            <ul>
              {exemplarToPrint.map((exemplar) => (
                <li key={exemplar.registre}>
                  {exemplar.registre} - {exemplar.titol} - {exemplar.autor} - {" "}
                  {exemplar.editorial} -
                  <Button
                    onClick={() => handleRemoveFromPrint(exemplar.registre)}
                  >
                    Eliminar
                  </Button>
                </li>
              ))}
            </ul>
          )}
          </>
      )}

    </section>
  );
}
