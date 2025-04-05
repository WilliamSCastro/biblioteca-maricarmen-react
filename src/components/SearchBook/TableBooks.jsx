export default function TableBooks({listBooks}){


    return(

        <table className="tableBooks">

            <tr>
                <th>Titol</th>
                <th>Autor</th>
                <th>Editorial</th>
                <th>ISBN</th>
            </tr>

            {listBooks.map((book, index) => {

                  return  <tr key={index}> 
                        <td>{book.title}</td>
                        <td>{book.autor}</td>
                        <td>{book.editorial}</td>
                        <td>{book.isbn}</td>
                    </tr>

            })}

        </table>

    );

}