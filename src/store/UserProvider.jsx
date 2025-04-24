import { createContext, useState, useEffect, useContext } from "react";
import { getUserData } from "../services/api";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoadingUserData, setIsLoadingUserData] = useState(true); 

  const [isDark, setIsDark] = useState(() => {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        return savedTheme === "dark";
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });
  
  useEffect(() => {
    if (isDark) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const login = (userData, token) => {
    localStorage.setItem("authToken", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  function handleUserUpdates(objUserData){
    setUser(objUserData)
  }

  useEffect(() => {

    const checkLoginStatus = async () => {
      console.log("Iniciando verificación de estado de login...");
      let token = null;

      try {
        token = localStorage.getItem("authToken");

        if (token) {
          console.log("Token encontrado. Verificando con API...");
          const response = await getUserData(token);
          console.log("Respuesta de getUserData:", response);

          if (response && response.success) {
            console.log("Token válido. Usuario autenticado.");
            setUser(response.userData);
          } else {
            setUser(null);
            try {
              localStorage.removeItem("authToken");
              console.log("Token inválido eliminado de localStorage.");
            } catch (e) {
              console.error("Error eliminando token inválido:", e);
            }
          }
        } else {
          console.log("No se encontró token en localStorage.");
          setUser(null);
        }
      } catch (error) {
        console.error("Error inesperado durante checkLoginStatus:", error);
        setUser(null);
        try {
          if (token) {
            localStorage.removeItem("authToken");
            console.log("Token eliminado de localStorage debido a error.");
          }
        } catch (e) {
          console.error("Error limpiando token tras error general:", e);
        }
      } finally {
        setIsLoadingUserData(false);
      }
    };

    checkLoginStatus();  

  }, []);

  return (
    <UserContext.Provider value={{ user, isLoadingUserData, login, logout, handleUserUpdates, isDark, toggleTheme }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => {
  return useContext(UserContext);
};
