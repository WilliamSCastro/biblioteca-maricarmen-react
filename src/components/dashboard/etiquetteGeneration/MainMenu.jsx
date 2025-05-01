import { useEffect } from "react";
import { getExemplars } from "../../../services/api"; // Asegúrate de que la ruta sea correcta
import Button from "../../utils/Button"; // Asegúrate de que la ruta sea correcta
export default function MainMenu() {
  useEffect(() => {
    const fetchExemplars = async () => {
      
    };

    fetchExemplars();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const searchParams = Object.fromEntries(formData.entries());
    console.log("Search parameters:", searchParams);

    const token = localStorage.getItem("authToken");
      if (token) {
         // Aquí usamos await
        const exemplars = await getExemplars(searchParams, token);
        if (exemplars) {
          console.log("Exemplars:", exemplars);
        } else {
          console.error("No se recibieron datos de ejemplares.");
        }
      } else {
        console.error("No se encontró el token en localStorage.");
      }

  };

  return (
    <section>
      <h2>Esto es generacion</h2>
      <form action="" noValidate onSubmit={handleSubmit}>
        <label htmlFor="titleAuthorEditorial">
          Cerca per títol, autor o editorial
        </label>
        <input
          type="text"
          name="titleAuthorEditorial"
          id="titleAuthorEditorial"
          placeholder="Cercar per títol, autor o eºditorial"
        />
        <label htmlFor="yearOfExemplar">Cerca per any</label>
        <input
          type="text"
          name="yearOfExemplar"
          id="yearOfExemplar"
          placeholder="Cercar per any"
        />

        <h3>Cerca per rang d'exemplar</h3>
        <label htmlFor="rangeMinNumExemplar">Mínim</label>
        <input
          type="text"
          name="rangeMinNumExemplar"
          id="rangeMinNumExemplar"
          placeholder="Mínim"
        />
        <label htmlFor="rangeMaxNumExemplar">Màxim</label>
        <input
          type="text"
          name="rangeMaxNumExemplar"
          id="rangeMaxNumExemplar"
          placeholder="Màxim"
        />

        <Button type="submit">Cercar</Button>
        <input type="reset" />
      </form>
    </section>
  );
}
