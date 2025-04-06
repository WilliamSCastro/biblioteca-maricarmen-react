import React from "react";
import { useState } from "react";
import { useUserContext } from "../store/UserProvider";
import Profile from "./Profile";
import { isAdmin, isBibliotecari, DASHBOARD_SCREENS } from "../constants";

function Dashboard({ noUserDetected }) {

  const { user } = useUserContext();
  console.log(user);

  const [currentDashboardScreen, setCurrentDashboardScreen] = useState(DASHBOARD_SCREENS.WELCOME);

  if (!user) {
    noUserDetected();
  }

  return (
    <main id="dashboard">
      <aside>
        <h2>Dashboard</h2>
        <button
          onClick={() => {
            setCurrentDashboardScreen(DASHBOARD_SCREENS.UPDATE_USER);
          }}
        >
          Perfil d'usuari
        </button>
        {(isAdmin(user.role) || isBibliotecari(user.role)) && (
          <>
            <button
              onClick={() => {
                setCurrentDashboardScreen(DASHBOARD_SCREENS.IMPORT_USERS);
              }}
            >
              Importació d'usuaris
            </button>
            <a href="/admin">Administració</a>
          </>
        )}
      </aside>
      <section>
        {currentDashboardScreen === DASHBOARD_SCREENS.WELCOME && (
          <>
            <h2>Inici</h2>
            <p>Esto es la página de inicio</p>
          </>
        )}
        {currentDashboardScreen === DASHBOARD_SCREENS.UPDATE_USER && <Profile/>}

        {currentDashboardScreen === DASHBOARD_SCREENS.IMPORT_USERS && (
          <>
            <h2>Importación</h2>
            <p>Esto es la página de importación</p>
            <p>Esto es la página de importación</p>
            <p>Esto es la página de importación</p>
            <p>Esto es la página de importación</p>
            <p>Esto es la página de importación</p>
            <p>Esto es la página de importación</p>
            <p>Esto es la página de importación</p>
            <p>Esto es la página de importación</p>
            <p>Esto es la página de importación</p>
            <p>Esto es la página de importación</p>
            <p>Esto es la página de importación</p>
            <p>Esto es la página de importación</p>
            <p>Esto es la página de importación</p>
            <p>Esto es la página de importación</p>
            <p>Esto es la página de importación</p>
            <p>Esto es la página de importación</p>
            <p>Esto es la página de importación</p>
            <p>Esto es la página de importación</p>
            <p>Esto es la página de importación</p>
            <p>Esto es la página de importación</p>
            <p>Esto es la página de importación</p>
          </>
        )}
      </section>
    </main>
  );
}

export default Dashboard;
