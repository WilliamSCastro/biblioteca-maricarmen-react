import React from "react";
import { useState } from "react";
import { useUserContext } from "../store/UserProvider";

function Dashboard({noUserDetected}) {

  const { user } = useUserContext();
  const [currentDashboardScreen, setCurrentDashboardScreen] = useState('default')

  // Asegurarnos de que user no es null (aunque App.js ya lo hace)
  if (!user) {
    noUserDetected()
  }

  return (
    <div>
      <p>
        Ha iniciado sesión con el rol: <strong>{user.role}</strong>
      </p>
      <div>
        <aside>
          <button onClick={() => {setCurrentDashboardScreen('updateUserData')}}>Perfil d'usuari</button>
          {(user.role === "Administrador" || user.role === "Bibliotecari") && (
            <>
              <button onClick={() => {setCurrentDashboardScreen('import')}}>Importació d'usuaris</button>
              <a href="/admin">Administració</a>
            </>
          )}
        </aside>
        <main>
            {currentDashboardScreen === 'default' && <p>Esto es la página de inicio</p>}
            {currentDashboardScreen === 'updateUserData' && <p>Esto es la página de modificación de usuario</p>}
            {currentDashboardScreen === 'import' && <p>Esto es la página de importación</p>}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
