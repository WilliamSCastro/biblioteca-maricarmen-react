import React from "react";
import { useState } from "react";
import { useUserContext } from "../store/UserProvider";

function Dashboard({ noUserDetected }) {
  const { user } = useUserContext();
  const [currentDashboardScreen, setCurrentDashboardScreen] =
    useState("default");

  if (!user) {
    noUserDetected();
  }

  return (
    <main id="dashboard">
      <aside>
        <h2>Dashboard</h2>
        <button
          onClick={() => {
            setCurrentDashboardScreen("updateUserData");
          }}
        >
          Perfil d'usuari
        </button>
        {(user.role === "Administrador" || user.role === "Bibliotecari") && (
          <>
            <button
              onClick={() => {
                setCurrentDashboardScreen("import");
              }}
            >
              Importació d'usuaris
            </button>
            <a href="/admin">Administració</a>
          </>
        )}
      </aside>
      <section>
        {currentDashboardScreen === "default" && (
          <>
            <h2>Inici</h2>
            <p>Esto es la página de inicio</p>
          </>
        )}
        {currentDashboardScreen === "updateUserData" && (
          <>
            <h2>Perfil</h2>
            <p>Esto es la página de modificación de usuario</p>
          </>
        )}
        {currentDashboardScreen === "import" && (
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
