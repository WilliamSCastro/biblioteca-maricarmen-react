
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
import sunIcon from '../../assets/icons8-sun-48.png';
import moon from '../../assets/moon.png';
import { msalInstance } from "../../auth/msalConfig";
function AppContent() {
  


  useEffect(() => {
    const handleRedirect = async () => {
      try {
        await msalInstance.initialize();
        const result = await msalInstance.handleRedirectPromise();
        
        if (result) {
          const idToken = result.idToken;
  
          const response = await fetch(window.location.origin + "/api/social-login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              token: idToken,
              provider: "microsoft"
            })
          });
  
          const data = await response.json();
          localStorage.setItem("token", data.token);
          login(data.user, data.token); // viene de tu contexto
          setCurrentScreen(MAIN_SCREENS.DASHBOARD); // o lo que uses para navegar
        }else{return}
      } catch (err) {
        console.error("Error al procesar redirección MSAL:", err);
      }
    };
  
    handleRedirect();
  }, []);
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
      <div
        id="loading-userdata"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: isDark ? '#071647' : 'inherit',
          color: isDark ? 'white' : 'inherit',
        }}
      >
        <h1>Carregant aplicació...</h1>
      </div>
    );
  }

  // ...existing code...
  return (
    <div className={isDark ? "app-content dark" : "app-content"}>
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
        {isDark ? (
  <>
    <img className="fotoModeLigth"
      src={sunIcon} 
      alt="Sol" 
     
    />
    Activar mode clar
  </>
) : (
  <>
     <img className="fotoModeLigth"
      src={moon} 
      alt="moon" 
     
    />
    Activar mode obscur
  </>
)}
        </Button>
      </div>
  );
}

export default AppContent;