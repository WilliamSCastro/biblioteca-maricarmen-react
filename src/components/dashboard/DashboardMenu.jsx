import { isAdmin, isBibliotecari, DASHBOARD_SCREENS, isUser } from "../../constants";
import { useUserContext } from "../../store/UserProvider";
import Button from "../utils/Button";
import adminImage from "../../assets/adminDashboard.svg"
import userImage from "../../assets/userDashboard.svg"
import importImage from "../../assets/importDashboard.svg"
import adminImageDarkMode from "../../assets/adminDashboardDarkMode.png"
import userImageDarkMode from "../../assets/userDashboardDarkMode.png"
import importImageDarkMode from "../../assets/importDashboardDarkMode.png"
import RentalHistoryImage from "../../assets/rentalHistoryDashboard.svg"
import RentalHistoryImageDarkMode from "../../assets/rentalHistoryDashboardDarkMode.svg"
import DashboardMenuItem from "./DashboardMenuItem";

export default function DashboardMenu({ setScreen, currentScreen }) {

  const { user, isDark } = useUserContext();

  return (
    <aside>
      <h2>Panell d'administració</h2>
      <Button
        onClick={() => {
          setScreen(DASHBOARD_SCREENS.UPDATE_USER);
        }}

        className={currentScreen === DASHBOARD_SCREENS.UPDATE_USER ? "active" : ""}
      >
          <DashboardMenuItem isDark={isDark} imageLight={userImage} imageDark={userImageDarkMode} altText="logo usuari" label="Perfil d'usuari" />
      </Button>
      {(isAdmin(user.role) || isBibliotecari(user.role)) && (
        <>
          <Button
            onClick={() => {
              setScreen(DASHBOARD_SCREENS.IMPORT_USERS);
            }}
            className={currentScreen === DASHBOARD_SCREENS.IMPORT_USERS ? "active" : ""}
          >
              <DashboardMenuItem isDark={isDark} imageLight={importImage} imageDark={importImageDarkMode} altText="logo importar csv" label="Importar usuaris amb CSV" />
          </Button>
          <Button
            onClick={() => {
              setScreen(DASHBOARD_SCREENS.ETIQUETTE_GENERATION);
            }}
            className={currentScreen === DASHBOARD_SCREENS.ETIQUETTE_GENERATION ? "active" : ""}
          >
              <DashboardMenuItem isDark={isDark} imageLight={importImage} imageDark={importImageDarkMode} altText="logo generacio etiqueta" label="Generació d'etiquetes" />
          </Button>
          <a href="/admin/">
            <DashboardMenuItem isDark={isDark} imageLight={adminImage} imageDark={adminImageDarkMode} altText="logo administracio" label="Administració" />
          </a>
        </>
      )}
      {(isUser(user.role)) && (
        <Button
          onClick={() => {
            setScreen(DASHBOARD_SCREENS.RENTAL_HISTORY);
          }}
          className={currentScreen === DASHBOARD_SCREENS.RENTAL_HISTORY ? "active" : ""}
        >
            <DashboardMenuItem isDark={isDark} imageLight={RentalHistoryImage} imageDark={RentalHistoryImageDarkMode} altText="logo historial de préstecs" label="Històric de préstecs" />
        </Button>
      )}
    </aside>
  );
}
