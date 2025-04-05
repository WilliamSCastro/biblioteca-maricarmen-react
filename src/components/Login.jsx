import React, { useState } from "react";
import InputField from "./InputField";

function Login({onLoginSuccess, returnToMainMenu}) {

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {

    event.preventDefault();

    setErrors({});
    setIsLoading(true);

    setTimeout(async ()=> {

      const formData = new FormData(event.target);
      const username = formData.get("username");
      const password = formData.get("password");

      let currentErrors = {};

      if (!username || username.trim() === "") {
        currentErrors.username = "El camp usuari no pot estar buit.";
      }

      if (!password || password.trim() === "") {
        currentErrors.password = "El camp contrasenya no pot estar buit.";
      }

      if (Object.keys(currentErrors).length > 0) {
        setErrors(currentErrors);
        setIsLoading(false); 
        return; 
      }

      // Send data to Django 
      try {

        const credentials = btoa(`${username}:${password}`); 
        const authHeader = `Basic ${credentials}`;

        const response = await fetch("/api/token/", {
          method: "GET",
          headers: {
            Authorization: authHeader,
          },
        });

        if (response.ok) {
          // Status code 200-299

          const data = await response.json();
          console.log(data);
          console.log("authToken", data.token);

          onLoginSuccess(data, data.token)

        } else {

          console.error(`Login failed:`, response.status, response.statusText);
          // Try to get error message from backend if available, otherwise show generic one
          let errorMessage = `Credencials incorrectes`;

          try {

            const errorData = await response.json();
            console.log(errorData)
            if (errorData.detail) {
              // Ninja often returns errors in 'detail'
              console.log(errorData.detail);
            }

          } catch (e) {
            // Ignore if response body is not JSON or empty
          }

          setErrors({ api: errorMessage });
        }
      } catch (error) {

        console.error(`Network error or other issue during login: ${error}`);
        setErrors({ api: `Error de xarxa o problema en iniciar sessió.` });

      } finally {
        setIsLoading(false); // Stop loading regardless of outcome
      }
      
    }, 2500)
    
  };

  return (
    <>
      <button onClick={returnToMainMenu} disabled={isLoading}>Tornar</button>
      {Object.keys(errors).length > 0 &&
          Object.values(errors).map((errorMsg, index) => (
            <p key={index}>{errorMsg}</p>
          ))}

      <form onSubmit={handleSubmit} noValidate>
        <h2>Iniciar Sessió</h2>

        {/* Usamos el componente InputField para el usuario */}
        <InputField label="Usuari" id="username" name="username" type="text" />

        {/* Usamos el componente InputFeld para la contraseña */}
        <InputField
          label="Contrasenya"
          id="password"
          name="password"
          type="password"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Entrant...' : 'Entrar'}
        </button>
      </form>
    </>
  );
}

export default Login;
