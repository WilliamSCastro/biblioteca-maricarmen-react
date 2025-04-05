import React from "react";
import { useState } from "react";
import { useUserContext } from "../store/UserProvider";

function Dashboard({noUserDetected}) {

  const { user } = useUserContext();
  const [currentDashboardScreen, setCurrentDashboardScreen] = useState('default')

  if (!user) {
    noUserDetected()
  }

  return (
    <main id="dashboard">
      <aside>
        <h1>Dashboard</h1>
        <button onClick={() => {setCurrentDashboardScreen('updateUserData')}}>Perfil d'usuari</button>
        {(user.role === "Administrador" || user.role === "Bibliotecari") && (
          <>
            <button onClick={() => {setCurrentDashboardScreen('import')}}>Importació d'usuaris</button>
            <a href="/admin">Administració</a>
          </>
        )}
      </aside>
      <section>
          {currentDashboardScreen === 'default' && <p>Esto es la página de inicio</p>}
          {currentDashboardScreen === 'updateUserData' && <p>Esto es la página de modificación de usuario</p>}
          {currentDashboardScreen === 'import' && <p>Esto es la página de importación</p>}
      </section>
    </main>
  );
}

export default Dashboard;
