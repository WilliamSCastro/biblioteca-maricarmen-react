import React from "react";
import { useUserContext } from "../store/UserProvider";

function NavBar({ screen, onLoginClick, onLogoutClick,onGoToMainMenu, onGoToDashboard  }) {

  const { user } = useUserContext();

  return (
    <nav
      style={{
        borderBottom: "1px solid grey",
        paddingBottom: "10px",
        marginBottom: "20px",
      }}
    >
      <h1>Biblioteca Maricarmen</h1>
      {!user && screen === "inicio" && (
        <button onClick={onLoginClick}>Login</button>
      )}
      {user && (screen === "inicio" || screen === "dashboard") && (
        <>
          <div id="nav-options">
            <button onClick={onGoToMainMenu}>Página Principal</button>
            <button onClick={onGoToDashboard}>Dashboard</button>
          </div>
          <div id="user-options">
            <p>Benvingut, {user.first_name} | {user.role}</p>
            <button onClick={onLogoutClick}>Logout</button>
          </div>
        </>
      )}
    </nav>
  );
}

export default NavBar;
