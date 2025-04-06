
import { useState } from "react";
import "../App.css";
import "../styles.css";
import NavBar from "./NavBar";
import MainMenu from "./MainMenu";
import Login from './Login';
import Dashboard from "./Dashboard";
import { useUserContext } from "../store/UserProvider"; 
import { MAIN_SCREENS } from "../constants";

function AppContent() {

  const { user, login, logout } = useUserContext(); 

  const [currentScreen, setCurrentScreen] = useState(MAIN_SCREENS.CATALEG);

  function handleGoToMainPage() {
    setCurrentScreen(MAIN_SCREENS.CATALEG);
  }

  const handleGoToDashboard = () => {
    setCurrentScreen(MAIN_SCREENS.DASHBOARD);
  };

  const handleGoToLogin = () => {
    setCurrentScreen(MAIN_SCREENS.LOGIN);
  };

  const handleLoginSuccess = (userData, token) => {
    login(userData, token);
    setCurrentScreen(MAIN_SCREENS.DASHBOARD);
  };

  const handleLogoutClick = () => {
    logout();
    setCurrentScreen(MAIN_SCREENS.CATALEG);
  };

  return (
    <>
      <NavBar
        screen={currentScreen}
        onGoToMainMenu={handleGoToMainPage}
        onGoToDashboard={handleGoToDashboard}
        onLoginClick={handleGoToLogin}
        onLogoutClick={handleLogoutClick}
      />
        {currentScreen === MAIN_SCREENS.CATALEG && <MainMenu />}
        {currentScreen === MAIN_SCREENS.LOGIN && (
          <Login
            onLoginSuccess={handleLoginSuccess}
            returnToMainMenu={handleGoToMainPage}
          />
        )}
        {currentScreen === MAIN_SCREENS.DASHBOARD && user && <Dashboard noUserDetected={handleGoToMainPage}/>}

        <footer>
          <p>Esto es el footer</p>
        </footer>
    </>
  );
}

export default AppContent;