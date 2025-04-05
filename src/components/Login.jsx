import React, { useState } from "react";
import { logIn } from '../services/api';
import InputField from "./InputField";

function Login({ onLoginSuccess, returnToMainMenu }) {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {

    event.preventDefault();

    setErrors({});
    setIsLoading(true);

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


    const result = await logIn(username, password);
    setIsLoading(false);

    if (result.success) {

      console.log("Login component received successful user data:", result.userData);
      console.log("Login component received token:", result.token);
      onLoginSuccess(result.userData, result.token);

    } else {

      console.error("Login component received error:", result.error);
      setErrors({ api: result.error || 'Ha ocorregut un error inesperat.' });

    }

  };

  return (
    <main id="login">
      <button onClick={returnToMainMenu} disabled={isLoading}>
        Tornar
      </button>
      <h2>Iniciar Sessió</h2>
      {Object.keys(errors).length > 0 &&
        Object.values(errors).map((errorMsg, index) => (
          <p key={index}>{errorMsg}</p>
        ))}
      <form onSubmit={handleSubmit} noValidate>

        <InputField label="Usuari" id="username" name="username" type="text" />
        <InputField
          label="Contrasenya"
          id="password"
          name="password"
          type="password"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Entrant..." : "Entrar"}
        </button>
      </form>
    </main>
  );
}

export default Login;
