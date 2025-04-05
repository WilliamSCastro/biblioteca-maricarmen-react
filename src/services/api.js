const API_URL = 'http://localhost:8000/api/llibres'; // Ajusta según tu Django API
const API_LOGIN = `http://127.0.0.1:8000/api/token`;
const API_GETUSERDATA = ``;

export const getBooks = () => {
  console.log(`llamando API getBooks en ${API_URL}`);
  return fetch(API_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error al obtener los libros');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error en la API:', error);
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
      let errorMessage = `Credencials incorrectes`;
      try {
        const errorData = await response.json();
        if (errorData && errorData.detail) {
          errorMessage = errorData.detail;
        }
         console.error("API Login Error Data:", errorData, `Status: ${response.status}`);
      } catch (e) {
        console.warn(`Could not parse error response JSON (Status: ${response.status}):`, e);
      }
      return { success: false, error: errorMessage };
    }

    try {
      const rawData = await response.json(); 
      console.log("API Login Success Raw Data:", rawData);

      if (!rawData || typeof rawData.token === 'undefined' || rawData.token === null) {
         console.error("Token missing or invalid in successful API response:", rawData);
         return { success: false, error: 'Error de servidor. Torna a intentar-ho més tard.' };
      }

      const token = rawData.token;
      const { token: _, ...userData } = rawData;
      return { success: true, userData: userData, token: token };

    } catch (parseError) {
      console.error("Error parsing successful login response JSON:", parseError);
      return { success: false, error: 'Error de servidor. Torna a intentar-ho més tard.' };
    }

  } catch (networkError) {
    console.error('Network error during logIn API call:', networkError);
    return { success: false, error: 'Error de servidor. Torna a intentar-ho més tard.' };
  }
};
