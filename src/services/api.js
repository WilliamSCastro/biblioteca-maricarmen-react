import {ERROR_TYPES, RESPONSE_TYPES} from "../constants";

// API URL
// const API = `http://127.0.0.1:8000/api`;
//const API = `https://biblioteca4.ieti.site/api`;

const API = window.location.origin + "/api"
console.log("API URL:", API);

export const getBooks = () => {
  console.log(`llamando API getBooks en ${API}/llibres/`);
  return fetch(`${API}/llibres/`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener los libros");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error en la API:", error);
      return [];
    });
};

export const logIn = async (username, password) => {
  const credentials = btoa(`${username}:${password}`);
  const authHeader = `Basic ${credentials}`;
  // console.log(`llamando API logIn en ${API_LOGIN}`);
  // console.log(credentials)
  // console.log(authHeader)
  try {
    const response = await fetch(`${API}/token`, {
      method: "GET",
      headers: {
        Authorization: authHeader,
      },
    });

    if (!response.ok) {
      try {
        const errorData = await response.json();
        console.error(
          "API Login Error Data:",
          errorData,
          `Status: ${response.status}`
        );
      } catch (e) {
        console.warn(
          `Could not parse error response JSON (Status: ${response.status}):`,
          e
        );
      }
      let errorMessage = `Credencials incorrectes`;
      return { success: false, error: errorMessage };
    }

    try {
      const rawData = await response.json();
      // console.log("API Login Success Raw Data:", rawData);

      if (
        !rawData ||
        typeof rawData.token === "undefined" ||
        rawData.token === null
      ) {
        console.error(
          "Token missing or invalid in successful API response:",
          rawData
        );
        return {
          success: false,
          error: "Error de servidor. Torna a intentar-ho més tard.",
        };
      }

      const token = rawData.token;
      const { token: _, ...userData } = rawData;
      return { success: true, userData: userData, token: token };
    } catch (parseError) {
      console.error(
        "Error parsing successful login response JSON:",
        parseError
      );
      return {
        success: false,
        error: "Error de servidor. Torna a intentar-ho més tard.",
      };
    }
  } catch (networkError) {
    console.error("Network error during logIn API call:", networkError);
    return {
      success: false,
      error: "Error de servidor. Torna a intentar-ho més tard.",
    };
  }
};

export const getUserData = async (token) => {
  // console.log(`Calling API getUserData at ${API_ME} with token`);

  try {
    const response = await fetch(`${API}/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Use Bearer token authentication
      },
    });

    if (!response.ok) {
      // Handle errors like invalid/expired token (e.g., 401 Unauthorized)
      let errorMessage = `Error fetching user data (Status: ${response.status})`;
      // console.log(response.status);
      if (response.status === 401) {
        errorMessage = "Invalid or expired token.";
      } else {
        try {
          const errorData = await response.json();
          if (errorData && errorData.detail) {
            errorMessage = errorData.detail;
          }
          console.error("API getUserData Error Data:", errorData);
        } catch (e) {
          console.warn(
            `Could not parse error response JSON (Status: ${response.status}):`,
            e
          );
        }
      }
      return { success: false, error: errorMessage };
    }

    // Token is valid, get user data
    const userData = await response.json();
    // console.log("API getUserData Success:", userData);
    // The backend should NOT return the token again here, just user info
    return { success: true, userData: userData };
  } catch (networkError) {
    console.error("Network error during getUserData API call:", networkError);
    return {
      success: false,
      error: "Error de servidor. Torna a intentar-ho més tard.",
    };
  }
};

export const updateUserData = async (formData, token) => {
  try {
    const response = await fetch(`${API}/update-profile/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      if (response.status === 500) {
        return {
          success: false,
          type: ERROR_TYPES.SAVING_ERROR,
          error:
            "Error al intentar actualitzar el perfil. Torna a intentar-ho més tard",
        };
      } else {
        const errorData = await response.json();
        return {
          success: false,
          type: ERROR_TYPES.ERROR_AT_DATA,
          error: errorData,
        };
      }
    }

    const data = await response.json();
    return { success: true, data: data };
    
  } catch (error) {
    console.error("Error en la API:", error);
    return {
      success: false,
      type: ERROR_TYPES.NETWORK_ERROR,
      error: "Error de xarxa o connexió. Torna a intentar-ho més tard.",
    };
  }
};
export const getSearch = async (searchParams, limit) => {
  try {
    
    const token = localStorage.getItem("authToken");
   
    const headers = token 
      ? { Authorization: `Bearer ${token}` }
      : {};

    const response = await fetch(`${API}/buscar/?${searchParams}`, {
      headers
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Respuesta no válida del servidor:", response.status, text);
      return [];
    }

    const data = await response.json();
    console.log(data);
    return limit === 0 ? data : data.slice(0, limit);
  } catch (err) {
    console.error("Error en getSearch:", err);
    return [];
  }
};

export const fetchCatalegById = async (id) => {
  const response = await fetch(`${API}/cataleg/${id}`);
  if (!response.ok) {
    throw new Error('Error al obtener los datos del Cataleg');
  }
  return response.json();
};



export const importCSV = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${API}/import-users/`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    return {
      ok: response.ok,
      status: response.status,
      data,
    };
  } catch (error) {
    return {
      ok: false,
      status: 500,
      data: null,
      error: "Error al conectar con el servidor.",
    };
  }
};


export async function searchUsers(query, token) {
  const q = query?.trim();
  if (!q) return [];

  const url = `${API}/users/?query=` + encodeURIComponent(q);
  
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status} buscando usuarios`);
  }

  const data = await res.json();
  return Array.isArray(data) ? data : [];
}
export async function createLoan(userId, exemplarId, token) {
  const res = await fetch(`${API}/loans/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' ,  Authorization: `Bearer ${token}`,},
    
    body: JSON.stringify({ userId, exemplarId }),
  });
  const text = await res.text();
  if (!res.ok) {
    let detail;
    try { detail = JSON.parse(text).detail; }
    catch { detail = text; }
    throw new Error(detail || `Error ${res.status} al realizar préstamo`);
  }
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export const fetchRentalHistory = async (userId, token) => {
  try {
    const response = await fetch(`${API}/prestecs/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error fetching rental history:", errorData);
      return { success: false, error: errorData };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Network error during fetchRentalHistory API call:", error);
    return {
      success: false,
      error: "Error de xarxa o connexió. Torna a intentar-ho més tard.",
    };
  }
};


// getExemplars 
export const getExemplars = async (searchParams, token) => {

  try {
    const queryString = new URLSearchParams(searchParams).toString();
    console.log("Query string:", queryString);
    const url = `${API}/exemplars?${queryString}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Response status:", response);

    if (!response.ok) {
      console.error("Error en la solicitud:", response.statusText);
      return;
    }
    const data = await response.json();
    console.log("Datos recibidos:", data);
    return data;
  
  } catch (networkError) {
    console.error("Error al obtener los ejemplars:", networkError);
  }

};
export async function googleSocialLogin(idToken) {
  const response = await fetch(`${window.location.origin}/api/social-login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: idToken,
      provider: "google"
    })
  });

  if (!response.ok) {
    throw new Error("Error al iniciar sessió amb Google");
  }

  return await response.json();
}


export async function microsoftSocialLogin(idToken) {

   const response = await fetch(window.location.origin + "/api/social-login/", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                token: idToken,
                provider: "microsoft"
              })
            });
    
  return await response.json();

}
