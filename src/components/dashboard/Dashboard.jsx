import React from "react";
import { useState } from "react";
import { useUserContext } from "../../store/UserProvider";
import Profile from "./Profile/Profile";
import { DASHBOARD_SCREENS } from "../../constants";
import DashboardMenu from "./DashboardMenu";
import UserImport from "./UserImport";

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
      <section>
        {currentDashboardScreen === DASHBOARD_SCREENS.WELCOME && (
          <>
            <h2>Inici</h2>
            <p>Esto es la página de inicio</p>
          </>
        )}
        {currentDashboardScreen === DASHBOARD_SCREENS.UPDATE_USER && <Profile/>}

        {currentDashboardScreen === DASHBOARD_SCREENS.IMPORT_USERS && (
         <UserImport/>
        )}
      </section>
    </main>
  );
}

export default Dashboard;
