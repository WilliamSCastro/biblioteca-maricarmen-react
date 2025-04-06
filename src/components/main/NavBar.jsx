import React from "react";
import { useUserContext } from "../../store/UserProvider";
import { MAIN_SCREENS } from "../../constants";
import Button from "../utils/Button";

function NavBar({ screen, onLoginClick, onLogoutClick,onGoToMainMenu, onGoToDashboard  }) {

  const { user } = useUserContext();

  return (
    <nav>
      <h1>Biblioteca Maricarmen</h1>
      {!user && screen === MAIN_SCREENS.CATALEG && (
        <Button onClick={onLoginClick}>Iniciar sessió</Button>
      )}
      {user && (screen === MAIN_SCREENS.CATALEG || screen === MAIN_SCREENS.DASHBOARD) && (
        <>
          <div id="nav-options">
            <Button onClick={onGoToMainMenu}>Página Principal</Button>
            <Button onClick={onGoToDashboard}>Dashboard</Button>
          </div>
          <div id="user-options">
            <p>Benvingut, {user.first_name} ({user.role})</p>
            <Button onClick={onLogoutClick}>Tancar sessió &#10132;</Button>
          </div>
        </>
      )}
    </nav>
  );
}

export default NavBar;
