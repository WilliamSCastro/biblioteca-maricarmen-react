
import { useState, useEffect } from "react";
import "../../App.css";
import "../../styles.css";
import NavBar from "./NavBar";
import MainMenu from "../SearchBook/MainMenu";
import Login from '../login/Login';
import Dashboard from "../dashboard/Dashboard";
import { useUserContext } from "../../store/UserProvider"; 
import { SearchBooksProvider } from '../../store/SearchBooksProvider';
import { MAIN_SCREENS } from "../../constants";
import Footer from "./Footer";
import Button from "../utils/Button";


function AppContent() {

  const { user, login, logout, isLoadingUserData, isDark, toggleTheme } = useUserContext(); 


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

  if (isLoadingUserData) {
    return (
      <div id="loading-userdata" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h1>Carregant aplicació...</h1>
      </div>
    );
  }

  return (
    <>
      <NavBar
        screen={currentScreen}
        onGoToMainMenu={handleGoToMainPage}
        onGoToDashboard={handleGoToDashboard}
        onLoginClick={handleGoToLogin}
        onLogoutClick={handleLogoutClick}
      />
        {currentScreen === MAIN_SCREENS.CATALEG && <SearchBooksProvider><MainMenu /></SearchBooksProvider>}
        {currentScreen === MAIN_SCREENS.LOGIN && (
          <Login
            onLoginSuccess={handleLoginSuccess}
            returnToMainMenu={handleGoToMainPage}
          />
        )}
        {currentScreen === MAIN_SCREENS.DASHBOARD && user && <Dashboard noUserDetected={handleGoToMainPage}/>}

        <Footer screen={currentScreen}/>
        <Button className="toggle-button" onClick={toggleTheme}>
          {isDark ? "Activar mode clar" : "Activar mode obscur"}
        </Button>
    </>
  );
}

export default AppContent;