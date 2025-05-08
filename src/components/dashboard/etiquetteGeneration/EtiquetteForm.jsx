import { useEtiquetteContext } from "../../../store/useEtiquetteContext";
import Button from "../../utils/Button";

export default function EtiquetteForm() {
  const { handleSubmit } = useEtiquetteContext();

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    handleSubmit(Object.fromEntries(formData.entries()));
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="input-filter-box">
        <label>Cerca per títol, autor o editorial</label>
        <input name="titleAuthorEditorial" placeholder="Edebé" className="input-styling" />
      </div>
      <div className="input-filter-box">
        <label>Cerca per rang d'exemplar</label>
        <input name="rangeMinNumExemplar" type="number" placeholder="Mínim" className="input-styling" />
        <input name="rangeMaxNumExemplar" type="number" placeholder="Màxim" className="input-styling" />
      </div>
      <div className="input-filter-box">
        <label>Cerca per registre exacte</label>
        <input name="exact_registration" placeholder="EX-YYYY-NNNNNN" className="input-styling" />
      </div>
      <div className="input-submit-box">
        <Button type="submit" className="submit-button">Cercar exemplars</Button>
        <Button type="reset" className="reset-button">Reestablir filtres</Button>
      </div>
    </form>
  );
}
