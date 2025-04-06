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

export const MAIN_SCREENS = {
    CATALEG: "cataleg",
    DASHBOARD: "dashboard"
}

export const DASHBOARD_SCREENS = {
    WELCOME: "default",
    UPDATE_USER: "updateUserData",
    IMPORT_USERS: "import"
}