import React from "react";
import { useUserContext } from "../store/UserProvider";
import { MAIN_SCREENS } from "../constants";

function NavBar({ screen, onLoginClick, onLogoutClick,onGoToMainMenu, onGoToDashboard  }) {

  const { user } = useUserContext();

  return (
    <nav>
      <h1>Biblioteca Maricarmen</h1>
      {!user && screen === MAIN_SCREENS.CATALEG && (
        <button onClick={onLoginClick}>Login</button>
      )}
      {user && (screen === MAIN_SCREENS.CATALEG || screen === MAIN_SCREENS.DASHBOARD) && (
        <>
          <div id="nav-options">
            <button onClick={onGoToMainMenu}>Página Principal</button>
            <button onClick={onGoToDashboard}>Dashboard</button>
          </div>
          <div id="user-options">
            <p>Benvingut, {user.first_name}  ({user.role})</p>
            <button onClick={onLogoutClick}>Logout</button>
          </div>
        </>
      )}
    </nav>
  );
}

export default NavBar;
