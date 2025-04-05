// components/AppContent.js (or wherever you put components)
import { useState } from "react";
import "../App.css";
import "../styles.css";
import NavBar from "./NavBar";
import MainMenu from "./MainMenu";
import Login from './Login';
import Dashboard from "./Dashboard";
import { useUserContext } from "../store/UserProvider"; 

function AppContent() {

  const { user, login, logout } = useUserContext(); 

  const [currentScreen, setCurrentScreen] = useState("inicio");

  function handleGoToMainPage() {
    setCurrentScreen("inicio");
  }

  const handleGoToDashboard = () => {
    setCurrentScreen("dashboard");
  };

  const handleGoToLogin = () => {
    setCurrentScreen("login");
  };

  const handleLoginSuccess = (userData, token) => {
    login(userData, token);
    setCurrentScreen("dashboard");
  };

  const handleLogoutClick = () => {
    logout();
    setCurrentScreen("inicio");
  };

  return (
    <div className="App">
      <NavBar
        screen={currentScreen}
        onGoToMainMenu={handleGoToMainPage}
        onGoToDashboard={handleGoToDashboard}
        onLoginClick={handleGoToLogin}
        onLogoutClick={handleLogoutClick}
      />

      <main>
        {currentScreen === "inicio" && <MainMenu />}
        {currentScreen === "login" && (
          <Login
            onLoginSuccess={handleLoginSuccess}
            returnToMainMenu={handleGoToMainPage}
          />
        )}
        {currentScreen === "dashboard" && user && <Dashboard noUserDetected={handleGoToMainPage}/>}
      </main>
    </div>
  );
}

export default AppContent;