import { useContext } from "react";
import Button from "../utils/Button";
import { useSearchBooks } from '../../store/SearchBooksProvider';
export default function MarcCerca(){

    const { setTextInputSearch } = useSearchBooks();
    return(
        <div className="searchDiv">

                <input className="inputSearch" onChange={(e) => {setTextInputSearch(e.target.value)}}></input>
                <Button className="searchButton">Cercar</Button>
        </div>

    );


}