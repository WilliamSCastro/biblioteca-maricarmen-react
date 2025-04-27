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
        <Button onClick={onLoginClick} className="default-button">
        <img 
          className="fotoModeLigth"
          src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='%23FFFFFF' viewBox='0 0 24 24'><path d='M12 12c2.67 0 8 1.34 8 4v2H4v-2c0-2.66 5.33-4 8-4zm0-2c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z'/></svg>" 
          alt="Login Icon" 
          
        />
        Iniciar sessió
      </Button>
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
