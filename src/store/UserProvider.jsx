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
  
      let token = null;

      try {
        token = localStorage.getItem("authToken");

        if (token) {
         
          const response = await getUserData(token);
          

          if (response && response.success) {
           
            setUser(response.userData);
          } else {
            setUser(null);
            try {
              localStorage.removeItem("authToken");
             
            } catch (e) {
              console.error("Error eliminando token inválido:", e);
            }
          }
        } else {
          
          setUser(null);
        }
      } catch (error) {
        console.error("Error inesperado durante checkLoginStatus:", error);
        setUser(null);
        try {
          if (token) {
            localStorage.removeItem("authToken");
          
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
