import React, { useContext } from 'react';
import { SearchBooks } from '../../store/SearchBooksProvider';
import Button from '../utils/Button';
import { useUserContext } from "../../store/UserProvider";

const CatalegDetail = () => {
  const { infoCataleg, goToBack, setIsALoanAButtonActive, setLoanExemplarId } = useContext(SearchBooks);
  const { user } = useUserContext();
  
  // Si no hay datos, mostramos un mensaje
  if (!infoCataleg) {
    return <div className="noData">No hay datos disponibles.</div>;
  }

  const setChangeOnLoanButton = (exemplarID) => {
    setIsALoanAButtonActive(true)
    setLoanExemplarId(exemplarID)
  }

  const {
    titol,
    titol_original,
    autor,
    CDU,
    signatura,
    data_edicio,
    resum,
    anotacions,
    mides,
    tags,
    subclass,
    exemplars
  } = infoCataleg;

  return (
    <div className="catalegContainer">
      {/* Encabezado con título y botón */}
      <div className="catalegHeader">
        <h1 className="catalegTitle">{titol}</h1>
        <Button className="defaultButton" onClick={() => goToBack()}>
          Tornar
        </Button>
      </div>

      {/* Sección de detalles generales */}
      <div className="catalegSection">
        {titol_original && <p><strong>Títol original:</strong> {titol_original}</p>}
        {autor && <p><strong>Autor:</strong> {autor}</p>}
        {CDU && <p><strong>CDU:</strong> {CDU}</p>}
        {signatura && <p><strong>Signatura:</strong> {signatura}</p>}
        {data_edicio && <p><strong>Data d'edició:</strong> {data_edicio}</p>}
        {resum && <p><strong>Resum:</strong> {resum}</p>}
        {anotacions && <p><strong>Anotacions:</strong> {anotacions}</p>}
        {mides && <p><strong>Mides:</strong> {mides}</p>}
        {tags && tags.length > 0 && (
          <p>
            <strong>Tags:</strong> {tags.join(', ')}
          </p>
        )}
      </div>

      {/* Sección de subclase */}
      <h2 className="subclassTitle">Detalls de la subclasse: {subclass.type}</h2>
      <div className="catalegSection">
        {subclass.type === "Llibre" && (
          <>
            <p><strong>ISBN:</strong> {subclass.ISBN}</p>
            <p><strong>Editorial:</strong> {subclass.editorial}</p>
            <p><strong>Col·lecció:</strong> {subclass.colleccio}</p>
            <p><strong>Lloc:</strong> {subclass.lloc}</p>
            <p><strong>País:</strong> {subclass.pais}</p>
            <p><strong>Llengua:</strong> {subclass.llengua}</p>
            <p><strong>Número:</strong> {subclass.numero}</p>
            <p><strong>Volums:</strong> {subclass.volums}</p>
            <p><strong>Pàgines:</strong> {subclass.pagines}</p>
            {subclass.info_url && (
              <p>
                <strong>Info URL:</strong> <a href={subclass.info_url}>{subclass.info_url}</a>
              </p>
            )}
            {subclass.preview_url && (
              <p>
                <strong>Preview URL:</strong> <a href={subclass.preview_url}>{subclass.preview_url}</a>
              </p>
            )}
            {subclass.thumbnail_url && (
              <p>
                <strong>Thumbnail URL:</strong> <a href={subclass.thumbnail_url}>{subclass.thumbnail_url}</a>
              </p>
            )}
          </>
        )}

        {subclass.type === "Revista" && (
          <>
            <p><strong>ISSN:</strong> {subclass.ISSN}</p>
            <p><strong>Editorial:</strong> {subclass.editorial}</p>
            <p><strong>Lloc:</strong> {subclass.lloc}</p>
            <p><strong>País:</strong> {subclass.pais}</p>
            <p><strong>Llengua:</strong> {subclass.llengua}</p>
            <p><strong>Número:</strong> {subclass.numero}</p>
            <p><strong>Volums:</strong> {subclass.volums}</p>
            <p><strong>Pàgines:</strong> {subclass.pagines}</p>
          </>
        )}

        {subclass.type === "CD" && (
          <>
            <p><strong>Discogràfica:</strong> {subclass.discografica}</p>
            <p><strong>Estil:</strong> {subclass.estil}</p>
            <p><strong>Duració:</strong> {subclass.duracio}</p>
          </>
        )}

        {subclass.type === "DVD" && (
          <>
            <p><strong>Productora:</strong> {subclass.productora}</p>
            <p><strong>Duració:</strong> {subclass.duracio}</p>
          </>
        )}

        {subclass.type === "BR" && (
          <>
            <p><strong>Productora:</strong> {subclass.productora}</p>
            <p><strong>Duració:</strong> {subclass.duracio}</p>
          </>
        )}

        {subclass.type === "Dispositiu" && (
          <>
            <p><strong>Marca:</strong> {subclass.marca}</p>
            <p><strong>Model:</strong> {subclass.model}</p>
          </>
        )}
      </div>

      {/* Sección de ejemplars */}
      <h2 className="subclassTitle">Exemplars</h2>
      <div className="catalegSection">
        {exemplars && exemplars.length > 0 ? (
          <ul className="exemplarsList">
            {exemplars.map((exemplar) => (
              <li key={exemplar.id} className="exemplarItem">
                <p><strong>Registre:</strong> {exemplar.registre}</p>
               {!exemplar.baixa && <p><strong>Exclòs Préstec:</strong> {exemplar.exclos_prestec ? 'Sí' : 'No'}</p>}
                <p><strong>Baixa:</strong> {exemplar.baixa ? 'Sí' : 'No'}</p>
                {exemplar.centre && (
                  <p>
                    <strong>Centre:</strong> {exemplar.centre.nom}

                  </p>

                )}
                {user?.role?.toLowerCase() === "bibliotecari" &&
                  !exemplar?.exclos_prestec &&
                  user?.centre_id === exemplar?.centre.id &&  !exemplar.baixa && (
                    <Button onClick={() => setChangeOnLoanButton(exemplar.id)} className="default-button-green">
                      Préstec
                    </Button>
                  )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hi ha exemplars disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default CatalegDetail;
