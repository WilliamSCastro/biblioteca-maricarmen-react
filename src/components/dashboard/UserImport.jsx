// UserImport.jsx
import React, { useState } from 'react';
import { importCSV } from '../../services/api'
const UserImport = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setSummary(null);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Si us plau, selecciona un arxiu CSV");
      return;
    }

    const { ok, data, error } = await importCSV(file);

    if (!ok) {
      setError(data?.error || error || "Error desconegut. Contacta amb l'administrador");
      return;
    }

    
    setSummary(data);
    }
    return (
      <div className="importContainer">
        <h2>Importació massiva d'usuaris</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="csvFile">Click aquí per seleccionar l'arxiu CSV:</label>
          <input 
            type="file" 
            id="csvFile" 
            accept=".csv" 
            onChange={handleFileChange} 
          />
          <button type="submit">Importar usuaris</button>
        </form>
        
        {error && (
          <div className="errorMessage">
            <p>{error}</p>
          </div>
        )}
        
        {summary && (
          <div className="summaryMessage">
            <p>{summary.message}</p>
            {summary.errors && summary.errors.length > 0 && (
              <ul>
                {summary.errors.map((errMsg, idx) => (
                  <li key={idx}>{errMsg}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    );
  ;
  
  };

  




export default UserImport;