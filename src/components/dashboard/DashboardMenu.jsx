import { isAdmin, isBibliotecari, DASHBOARD_SCREENS } from "../../constants";
import { useUserContext } from "../../store/UserProvider";
import Button from "../utils/Button";
import adminImage from "../../assets/adminDashboard.svg"
import userImage from "../../assets/userDashboard.svg"
import importImage from "../../assets/importDashboard.svg"
import adminImageDarkMode from "../../assets/adminDashboardDarkMode.png"
import userImageDarkMode from "../../assets/userDashboardDarkMode.png"
import importImageDarkMode from "../../assets/importDashboardDarkMode.png"

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
          <img src={isDark ? userImageDarkMode : userImage} alt="logo usuari" />
          <span>Perfil d'usuari</span>
          <span className="end">&#8702;</span>
      </Button>
      {(isAdmin(user.role) || isBibliotecari(user.role)) && (
        <>
          <Button
            onClick={() => {
              setScreen(DASHBOARD_SCREENS.IMPORT_USERS);
            }}
            className={currentScreen === DASHBOARD_SCREENS.IMPORT_USERS ? "active" : ""}
          >
                <img src={isDark ? importImageDarkMode : importImage} alt="logo importar csv" />
              <span>Importar usuaris amb CSV</span>
              <span className="end">&#8702;</span>
          </Button>
          <a href="/admin/">
          <img src={isDark ? adminImageDarkMode : adminImage} alt="logo administracio" />
            <span>Administració</span>
            <span className="end">&#8702;</span>
          </a>
        </>
      )}
    </aside>
  );
}
