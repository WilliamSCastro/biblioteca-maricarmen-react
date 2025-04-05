import { createContext, useState, useContext} from 'react'

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
    
    return (
         <UserContext.Provider value={{ user, login, logout }}>
         {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(UserContext);
  };