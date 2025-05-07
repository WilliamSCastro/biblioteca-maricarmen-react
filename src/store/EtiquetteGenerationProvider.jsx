import { createContext, useContext, useState, useEffect } from "react";
import { getExemplars } from "../services/api";
import { ETIQUETTE_SCREENS } from "../constants";
import jsPDF from "jspdf";
import bwipjs from "bwip-js";

const EtiquetteContext = createContext();

function EtiquetteGenerationProvider({ children }) {
  const [currentEtiquetteScreen, setCurrentEtiquetteScreen] = useState(
    ETIQUETTE_SCREENS.SELECTION
  );
  const [hasSearched, setHasSearched] = useState(false);
  const [exemplars, setExemplars] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [exemplarToPrint, setExemplarToPrint] = useState(() => {
    const saved = localStorage.getItem("exemplarsToPrint");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("exemplarsToPrint", JSON.stringify(exemplarToPrint));
  }, [exemplarToPrint]);

  const handleSubmit = async (formData) => {
    setModalText("Cercant exemplars...");
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
    const alreadyAdded = exemplarToPrint.some(
      (e) => e.registre === exemplar.registre
    );
    if (!alreadyAdded) setExemplarToPrint((prev) => [...prev, exemplar]);
  };

  const handleRemoveFromPrint = (registre) => {
    setExemplarToPrint((prev) => prev.filter((e) => e.registre !== registre));
  };

  const handleRemoveAllFromPrint = () => {
    setExemplarToPrint([]);
  };

  const handlePrint = async (centreName) => {

    setModalText("Generant PDF...");
    setIsModalOpen(true);

    // setTimeout(() => {
    const pdf = new jsPDF("portrait", "mm", "a4");
    const LIBRARY_NAME = centreName;
  
    const marginX = 7;
    const marginY = 7;
    const cols = 4;
    const rows = 17;
    const labelWidth = (210 - 2 * marginX) / cols; // 49mm
    const labelHeight = (297 - 2 * marginY) / rows; // ≈16.18mm
  
    let row = 0;
    let col = 0;
  
    // Dibuja las líneas de la cuadrícula
    const drawGridLines = (pdfInstance) => {
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = marginX + c * labelWidth;
          const y = marginY + r * labelHeight;
          pdfInstance.rect(x, y, labelWidth, labelHeight);
        }
      }
    };
  
    drawGridLines(pdf); // Primera página
  
    for (let i = 0; i < exemplarToPrint.length; i++) {
      const { registre, titol, CDU } = exemplarToPrint[i];
  
      if (col >= cols - 1) {
        col = 0;
        row++;
      }
  
      if (row >= rows) {
        pdf.addPage();
        drawGridLines(pdf); // Dibuja cuadrícula en nueva página
        row = 0;
        col = 0;
      }
  
      const x1 = marginX + col * labelWidth;
      const x2 = marginX + (col + 1) * labelWidth;
      const y = marginY + row * labelHeight;
      
      // Generar 128code
      const barcodeValue = registre;
      console.log(barcodeValue)
      try {
        const canvas = document.createElement("canvas");
        bwipjs.toCanvas(canvas, {
          bcid: "code128",       
          text: barcodeValue,    
          scale: 1.7,
          height: 6,
          includetext: true,
        });
        
        const imgData = canvas.toDataURL("image/png");
      
        const padding = 2;
        let cursorY = y + padding;
      
        // Lado izquierdo (biblioteca, título, código de barras)
        pdf.setFontSize(6);
        pdf.text(LIBRARY_NAME, x1 + padding, cursorY + 2);
      
        // const shortTitle = registre?.length > 25 ? registre.slice(0, 25) + "..." : registre;
        // pdf.text(`${shortTitle}`, x1 + padding, cursorY + 5.2);
      
        const barcodeWidth = labelWidth - 2 * padding;
        const barcodeHeight = 6;
        pdf.addImage(imgData, "PNG", x1 + padding, cursorY + 6.5, barcodeWidth, barcodeHeight);
      
        // Lado derecho (CDU)
        pdf.setFontSize(12);
        pdf.text(`CDU: ${CDU || "-"}`, x2 + padding, y + labelHeight / 2 + 2);
      
        col += 2;
      } catch (err) {
        console.error("Error generant codi EAN13:", err);
      }
      
    }
  
    pdf.save("etiquetes.pdf");
    setIsModalOpen(false);

  // }, 5000);

  };

  return (
    <EtiquetteContext.Provider
      value={{
        currentEtiquetteScreen,
        setCurrentEtiquetteScreen,
        hasSearched,
        exemplars,
        isModalOpen,
        modalText,
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

function useEtiquetteContext() {
  return useContext(EtiquetteContext);
}

// No default export — named exports only
export { EtiquetteGenerationProvider, useEtiquetteContext };
