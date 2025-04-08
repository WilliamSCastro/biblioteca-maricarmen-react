const API_URL = "http://localhost:8000/api/llibres";
const API_LOGIN = `http://127.0.0.1:8000/api/token`;
const API_ME = `http://127.0.0.1:8000/api/me`;
const API_UPDATE_USER_DATA = "http://localhost:8000/api/update-profile/";

export const getBooks = () => {
  console.log(`llamando API getBooks en ${API_URL}`);
  return fetch(API_URL)
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
  console.log(`llamando API logIn en ${API_LOGIN}`);

  try {
    const response = await fetch(API_LOGIN, {
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
      console.log("API Login Success Raw Data:", rawData);

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
  console.log(`Calling API getUserData at ${API_ME} with token`);

  try {
    const response = await fetch(API_ME, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Use Bearer token authentication
      },
    });

    if (!response.ok) {
      // Handle errors like invalid/expired token (e.g., 401 Unauthorized)
      let errorMessage = `Error fetching user data (Status: ${response.status})`;
      console.log(response.status);
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
    console.log("API getUserData Success:", userData);
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
    const response = await fetch(API_UPDATE_USER_DATA, {
      method: "POST",
      headers: {
        // Important: If sending FormData, you usually *don't* set Content-Type manually.
        // The browser sets it correctly, including the boundary.
        // 'Content-Type': 'multipart/form-data', // Usually remove this line
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      if (response.status === 500) {
        return {
          success: false,
          type: "saving_error",
          error:
            "Error al intentar actualitzar el perfil. Torna a intentar-ho més tard",
        };
      } else {
        const errorData = await response.json();
        return {
          success: false,
          type: "error_at_data",
          error: errorData,
        };
      }
    }
    const data = await response.json();
    return { success: true, data: data };
    
  } catch (error) {
    // Network error or other exception during fetch/processing
    console.error("Error en la API:", error);
    return {
      success: false,
      type: "network_error", // More specific type
      error: "Error de xarxa o connexió. Torna a intentar-ho més tard.",
    };
  }
};

export const getSearch = async (searchParams, limit) => {
  try {
    const response = await fetch(`http://localhost:8000/api/buscar/?${searchParams}`);
    const data = await response.json();

    if (limit === 0) {
      // Devuelve todos los datos
      return data;
    } else {
      // Devuelve solo los primeros "limit" elementos (por ejemplo, 5 resultados)
      return data.slice(0, limit);
    }
  } catch (err) {
    console.error('Error:', err);
    return [];
  }
};


export const fetchCatalegById = async (id) => {
  const response = await fetch(`http://localhost:8000/api/cataleg/${id}`);
  if (!response.ok) {
    throw new Error('Error al obtener los datos del Cataleg');
  }
  return response.json();
};



export const importCSV = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("http://localhost:8000/api/import-users/", {
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

