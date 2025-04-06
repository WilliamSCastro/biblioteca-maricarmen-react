import { createContext, useState, useEffect, useContext} from 'react'
import { getUserData } from '../services/api';

const UserContext = createContext();

export function UserProvider({children}) {

    const [user, setUser] = useState(null);

    const login = (userData, token) => {
        localStorage.setItem("authToken", token);
        setUser(userData);
    };
    
    const logout = () => {
        localStorage.removeItem("authToken");
        setUser(null);
    };

    useEffect(() => {
 
        const checkLoginStatus = async () => {

            console.log("SE HA MIRADO SI EXISTE TOKEN")
            let token = null;
            try {
                token = localStorage.getItem("authToken");
            } catch (error) {
                console.error("Error al leer localStorage:", error);
                return;
            }
            console.log(token)
    
    
        //   if (token) {
            
        //     console.log("Token encontrado en localStorage. Verificando...");
        //     const response = await getUserData(token); // Debes tener esta función en tu API
    
        //     if (response.success) {
            
        //       console.log("Token válido. Autenticando usuario.");
        //       setUser(response.userData);
            
        //     }

        //   } else {
        //     console.log("No se encontró token en localStorage.");
        //   }

        };
    
        checkLoginStatus(); 
    
      }, []);



    
    return (
         <UserContext.Provider value={{ user, login, logout }}>
         {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(UserContext);
  };