import { createContext, useContext, useState, useEffect } from "react";
import { getExemplars } from "../services/api";
import { ETIQUETTE_SCREENS } from "../constants";

const EtiquetteContext = createContext();

export function EtiquetteGenerationProvider({ children }) {
  const [currentEtiquetteScreen, setCurrentEtiquetteScreen] = useState(ETIQUETTE_SCREENS.SELECTION);
  const [hasSearched, setHasSearched] = useState(false);
  const [exemplars, setExemplars] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exemplarToPrint, setExemplarToPrint] = useState(() => {
    const saved = localStorage.getItem("exemplarsToPrint");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("exemplarsToPrint", JSON.stringify(exemplarToPrint));
  }, [exemplarToPrint]);

  const handleSubmit = async (formData) => {
    setIsModalOpen(true);
    const token = localStorage.getItem("authToken");
    if (token) {
      const exemplars = await getExemplars(formData, token);
      if (exemplars) setExemplars(exemplars);
      setHasSearched(true);
    }
    setIsModalOpen(false);
  };

  const handleAddToPrint = (exemplar) => {
    const alreadyAdded = exemplarToPrint.some((e) => e.registre === exemplar.registre);
    if (!alreadyAdded) setExemplarToPrint((prev) => [...prev, exemplar]);
  };

  const handleRemoveFromPrint = (registre) => {
    setExemplarToPrint((prev) => prev.filter((e) => e.registre !== registre));
  };

  const handleRemoveAllFromPrint = () => {
    setExemplarToPrint([]);
  };

  const handlePrint = () => {
    console.log("Imprimiendo etiquetas...");
  };

  return (
    <EtiquetteContext.Provider
      value={{
        currentEtiquetteScreen,
        setCurrentEtiquetteScreen,
        hasSearched,
        exemplars,
        isModalOpen,
        handleSubmit,
        exemplarToPrint,
        handleAddToPrint,
        handleRemoveFromPrint,
        handleRemoveAllFromPrint,
        handlePrint,
      }}
    >
      {children}
    </EtiquetteContext.Provider>
  );
}

export function useEtiquetteContext() {
  return useContext(EtiquetteContext);
}
