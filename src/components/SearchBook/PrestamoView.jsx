import React, { useState } from 'react';
import { useSearchBooks } from "../../store/SearchBooksProvider";
import { searchUsers, createLoan } from '../../services/api';
import { useUserContext } from "../../store/UserProvider";

const PrestamoView = () => {

  const { user } = useUserContext();
  const [hasSearchUser , setHasSearchUser] = useState(false)
  const {
    fetchCataleg,
    userQuery,
    userResults,
    selectedUser,
    setUserQuery,
    setUserResults,
    setSelectedUser,
    loanExemplarID,
    setIsALoanAButtonActive,
    selectedBook
  } = useSearchBooks();

  // Funció per tornar enrere
  const handleBack = () => {
    setIsALoanAButtonActive(false)
  };

  const handleSearchUser = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const users = await searchUsers(userQuery, token);
      setUserResults(users);
      setHasSearchUser(true);
    } catch (error) {
      console.error('Error en cercar usuaris:', error);
      alert('Error en cercar usuaris');
    }
  };

  const handleLoan = async () => {
    if (!selectedUser) {
      return alert('Seleccioneu primer un usuari');
    }
    try {
      const token = localStorage.getItem("authToken");

      await createLoan(selectedUser.id, loanExemplarID, token);
      alert('Préstec realitzat amb èxit');
      setIsALoanAButtonActive(false);
      setSelectedUser(null);
      setUserResults([]);
      setUserQuery('');
      fetchCataleg(selectedBook);
    } catch (error) {
      console.error('Error en realitzar el préstec:', error);
      alert(`Error en realitzar el préstec: ${error.message}`);
    }
  };

  return (
    <div className="prestamo-container">
      <h2 className="header">Préstec d'Exemplar</h2>

      <button onClick={handleBack} className="defaultButton">
        Tornar enrere
      </button>

      <div className="search-section">
        <h3 className="subheader">Cercar Usuari</h3>
        <div className="search-controls">
          <input
            type="text"
            className="search-input"
            placeholder="Nom, cognom, email, telèfon o nom d'usuari"
            value={userQuery}
            onChange={e => setUserQuery(e.target.value)}
          />
          <button onClick={handleSearchUser} className="search-button">
            Cercar
          </button>
        </div>

        { hasSearchUser && userResults && ( <table className="results-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Telèfon</th>
              <th>Nom d'usuari</th>
            </tr>
          </thead>
          <tbody>
            {userResults.map(u => (
              <tr
                key={u.id}
                className={selectedUser?.id === u.id ? 'selected' : ''}
                onClick={() => setSelectedUser(u)}
              >
                <td>{u.firstName} {u.lastName}</td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td>{u.username}</td>
              </tr>
            ))}
            {userResults.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>
                  Cap resultat
                </td>
              </tr>
            )}
          </tbody>
        </table>) }

        {selectedUser && (
          <div className="selected-user-card">
            <h4 className="subheader">Usuari Seleccionat</h4>
            <p><strong>Nom:</strong> {selectedUser.firstName} {selectedUser.lastName}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Telèfon:</strong> {selectedUser.phone}</p>
            <p><strong>Nom d'usuari:</strong> {selectedUser.username}</p>
            <button onClick={handleLoan} className="loan-button">
              Prestar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrestamoView;