import React from "react";
import { useState } from "react";
import { useUserContext } from "../../store/UserProvider";
import Profile from "./profile/Profile";
import { DASHBOARD_SCREENS } from "../../constants";
import DashboardMenu from "./DashboardMenu";
import UserImport from "./importUsers/UserImport";
import Welcome from "./welcome/Welcome";
import RentalHistory from "./userRentalHistory/RentalHistory";
import EtiquetteSection from "./etiquetteGeneration/EtiquetteSection";
import { EtiquetteGenerationProvider } from "../../store/EtiquetteGenerationProvider";

function Dashboard({ noUserDetected }) {

  const { user } = useUserContext();
  if (!user) {
    noUserDetected();
  }

  const [currentDashboardScreen, setCurrentDashboardScreen] = useState(DASHBOARD_SCREENS.WELCOME);

  function handleScreenSelection(screen){
    setCurrentDashboardScreen(screen)
  }

  return (
    <main id="dashboard">
      <DashboardMenu setScreen={handleScreenSelection} currentScreen={currentDashboardScreen}/>
      {currentDashboardScreen === DASHBOARD_SCREENS.WELCOME && <Welcome/>}
      {currentDashboardScreen === DASHBOARD_SCREENS.UPDATE_USER && <Profile/>}
      {currentDashboardScreen === DASHBOARD_SCREENS.IMPORT_USERS && (
        <UserImport/>
      )}
      {currentDashboardScreen === DASHBOARD_SCREENS.ETIQUETTE_GENERATION && (
         <EtiquetteGenerationProvider>
         <EtiquetteSection />
       </EtiquetteGenerationProvider>
      )}
      {currentDashboardScreen === DASHBOARD_SCREENS.RENTAL_HISTORY && (
        <RentalHistory/>
      )}
    </main>
  );
}

export default Dashboard;
