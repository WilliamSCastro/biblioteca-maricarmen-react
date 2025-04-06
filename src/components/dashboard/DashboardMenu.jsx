import { isAdmin, isBibliotecari, DASHBOARD_SCREENS } from "../../constants";
import { useUserContext } from "../../store/UserProvider";
import Button from "../utils/Button";
import adminImage from "../../assets/adminDashboard.svg"
import userImage from "../../assets/userDashboard.svg"
import importImage from "../../assets/importDashboard.svg"

export default function DashboardMenu({ setScreen, currentScreen }) {

  const { user } = useUserContext();

  return (
    <aside>
      <h2>Dashboard</h2>
      <Button
        onClick={() => {
          setScreen(DASHBOARD_SCREENS.UPDATE_USER);
        }}

        className={currentScreen === DASHBOARD_SCREENS.UPDATE_USER ? "active" : ""}
      >
          <img src={userImage} alt="" />
          <p>Perfil d'usuari</p>
          <p className="end">&#8702;</p>
      </Button>
      {(isAdmin(user.role) || isBibliotecari(user.role)) && (
        <>
          <Button
            onClick={() => {
              setScreen(DASHBOARD_SCREENS.IMPORT_USERS);
            }}
            className={currentScreen === DASHBOARD_SCREENS.IMPORT_USERS ? "active" : ""}
          >
              <img src={importImage} alt="" />
              <p>Importar usuaris amb CSV</p>
              <p className="end">&#8702;</p>
          </Button>
          <a href="/admin">
            <img src={adminImage} alt="" />
            <p>Administració</p>
            <p className="end">&#8702;</p>
          </a>
        </>
      )}
    </aside>
  );
}
