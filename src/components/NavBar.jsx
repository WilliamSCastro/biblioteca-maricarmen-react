import React from "react";
import { useUserContext } from "../store/UserProvider";
import Button from "./Button";
function NavBar({ screen, onLoginClick, onLogoutClick,onGoToMainMenu, onGoToDashboard  }) {

  const { user } = useUserContext();

  return (
    <nav>
      <h1>Biblioteca Maricarmen</h1>
      {!user && screen === "inicio" && (
        <Button onClick={onLoginClick}>Login</Button>
      )}
      {user && (screen === "inicio" || screen === "dashboard") && (
        <>
          <div id="nav-options">
            <Button onClick={onGoToMainMenu}>Página Principal</Button>
            <Button onClick={onGoToDashboard}>Dashboard</Button>
          </div>
          <div id="user-options">
            <p>Benvingut, {user.first_name} | {user.role}</p>
            <Button onClick={onLogoutClick}>Logout</Button>
          </div>
        </>
      )}
    </nav>
  );
}

export default NavBar;
