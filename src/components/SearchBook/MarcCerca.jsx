import { useContext } from "react";
import Button from "../utils/Button";
import { useSearchBooks } from '../../store/SearchBooksProvider';
export default function MarcCerca(){

    const { setTextInputSearch, searchBooks } = useSearchBooks();
    return(
        <div className="searchDiv">

                <input className="input-field" onChange={(e) => {setTextInputSearch(e.target.value)}}></input>
                <Button onClick={searchBooks} className="searchButton">Cercar</Button>
        </div>

    );


}