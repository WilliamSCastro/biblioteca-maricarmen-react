import { SearchBooks } from '../../store/SearchBooksProvider'
import Button from "../utils/Button";
import {useContext} from 'react'
export default function TableBooks() {

    const { fetchCataleg, locatedBooks } = useContext(SearchBooks);
    return (

        <table className="catalogTable">
  <thead>
    <tr>
      <th>Titol</th>
      <th>Autor</th>
      <th>Més Dades</th>
    </tr>
  </thead>
  <tbody>
    {locatedBooks.map((book, index) => {
      return (
        <tr key={index}>
          <td>{book.titol}</td>
          <td>{book.autor}</td>
          <td className="tableButtonCell">
            <Button className="default-button" onClick={() => fetchCataleg(book.id)}>
              Veure detall
            </Button>
          </td>
        </tr>
      );
    })}
  </tbody>
</table>

    );

}