import React from "react";
import { useUserContext } from "../../store/UserProvider";
import { MAIN_SCREENS } from "../../constants";
import Button from "../utils/Button";
import logo from '../../assets/logo.png';
function NavBar({ screen, onLoginClick, onLogoutClick,onGoToMainMenu, onGoToDashboard  }) {

  const { user } = useUserContext();

  return (
    <nav>
      <div className="divLogo">
        <img src={logo} width={100}></img>
        <h1>Biblioteca Maricarmen Brito</h1>
      </div>
      {!user && screen === MAIN_SCREENS.CATALEG && (
        <Button onClick={onLoginClick} className="default-button">Iniciar sessió</Button>
      )}
      {user && (screen === MAIN_SCREENS.CATALEG || screen === MAIN_SCREENS.DASHBOARD) && (
        <>
          <div id="nav-options">
            <Button onClick={onGoToMainMenu} className={screen === MAIN_SCREENS.CATALEG ? "page-selection active" : "page-selection"}>Pàgina Principal</Button>
            <Button onClick={onGoToDashboard} className={screen === MAIN_SCREENS.DASHBOARD ? "page-selection active" : "page-selection"}>Administració</Button>
          </div>
          <div id="user-options">
            <p>Benvingut, {user.first_name} ({user.role})</p>
            <Button onClick={onLogoutClick} className="default-button">Tancar sessió &#10132;</Button>
          </div>
        </>
      )}
    </nav>
  );
}

export default NavBar;
