
import { useEtiquetteContext } from "../../../store/EtiquetteGenerationProvider";
import EtiquetteForm from "./EtiquetteForm";
import EtiquetteResults from "./EtiquetteResults";
import EtiquettePrintView from "./EtiquettePrintView";
import Button from "../../utils/Button";
import { ETIQUETTE_SCREENS } from "../../../constants";
import Modal from "../../utils/Modal";

export default function EtiquetteSection() {
  const { currentEtiquetteScreen, setCurrentEtiquetteScreen, isModalOpen} = useEtiquetteContext();

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
              <Button onClick={() => setCurrentEtiquetteScreen(ETIQUETTE_SCREENS.PRINT)} className="default-important-button">Imprimir etiquetes</Button>
            </div>
            <EtiquetteForm />
            <EtiquetteResults />
          </>
        )}

        {currentEtiquetteScreen === ETIQUETTE_SCREENS.PRINT && (
          <>
            <div className="title-box">
              <h2>Impressió d'etiquetes</h2>
              <Button onClick={() => setCurrentEtiquetteScreen(ETIQUETTE_SCREENS.SELECTION)} className="default-important-button">Tornar a la selecció</Button>
            </div>
            <EtiquettePrintView />
          </>
        )}
      </section>
    </>
  );
}