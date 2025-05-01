const ROLES = {
    ADMIN: "Administrador",
    BIBLIOTECARI: "Bibliotecari",
    USER: "Usuari"
}

export function isAdmin(userRole){
    if (userRole === ROLES.ADMIN){
        return true
    }
    return false
}

export function isBibliotecari(userRole){
    if (userRole === ROLES.BIBLIOTECARI){
        return true
    }
    return false
}

export function isUser(userRole){
    if (userRole === ROLES.USER){
        return true
    }
    return false
}

export const MAIN_SCREENS = {
    CATALEG: "cataleg",
    DASHBOARD: "dashboard",
    LOGIN: "login",
    
}

export const DASHBOARD_SCREENS = {
    WELCOME: "default",
    UPDATE_USER: "updateUserData",
    IMPORT_USERS: "import",
    RENTAL_HISTORY: "rentalHistory",
}

export const ERROR_TYPES = {
    SAVING_ERROR: "saving_error",
    ERROR_AT_DATA: "error_at_data",
    NETWORK_ERROR: "network_error",
};

export const RESPONSE_TYPES = {
    SUCCESS_MODIFY: "success_modify",
};