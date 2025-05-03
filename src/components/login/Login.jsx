import React, { useState, useEffect } from "react";
import { logIn } from '../../services/api';
import InputField from "../utils/InputField";
import Button from "../utils/Button";
import { PublicClientApplication } from "@azure/msal-browser";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';


const GOOGLE_CLIENT_ID = "951727392825-l5pgor6a24n5m5uurqpvpiince9l54g7.apps.googleusercontent.com";
const MICROSOFT_CLIENT_ID = "80ce59e2-3a83-4650-b920-d1f2d194d3e7";

const msalInstance = new PublicClientApplication({
  auth: {
    clientId: MICROSOFT_CLIENT_ID,
    authority: "https://login.microsoftonline.com/common",
<<<<<<< HEAD
    redirectUri: "http://localhost:8000/"
=======
    redirectUri: "https://biblioteca4.ieti.site"
>>>>>>> 66c9402 (social arreglado)
  }
});

function Login({ onLoginSuccess, returnToMainMenu }) {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    msalInstance.initialize();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    setIsLoading(true);

    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");

    let currentErrors = {};

    if (!username?.trim()) currentErrors.username = "El camp usuari no pot estar buit.";
    if (!password?.trim()) currentErrors.password = "El camp contrasenya no pot estar buit.";

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      setIsLoading(false);
      return;
    }

    const result = await logIn(username, password);
    setIsLoading(false);

    if (result.success) {
      onLoginSuccess(result.userData, result.token);
    } else {
      setErrors({ api: result.error || 'Ha ocorregut un error inesperat.' });
    }
  };

  const handleGoogleSuccess = (response) => {
    const idToken = response.credential;
    console.log("TOKEN:", idToken);
    
    fetch("https://biblioteca4.ieti.site/api/social-login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: idToken,
        provider: "google"
      })
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", data.token);
        onLoginSuccess(data.user, data.token);
      });
  };

  const handleMicrosoftLogin = async () => {
    try {
      const result = await msalInstance.loginPopup({
        scopes: ["openid", "profile", "email"]
      });
  
      console.log("MSAL login result:", result);  // 👈 Añade esto para verificar el objeto
  
      const idToken = result.idToken;
  
      if (!idToken || idToken.split(".").length !== 3) {
        console.error("El token no es un JWT válido:", idToken);
        return;
      }
  
      const response = await fetch("https://biblioteca4.ieti.site/api/social-login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: idToken,
          provider: "microsoft"
        })
      });
  
      const data = await response.json();
      localStorage.setItem("token", data.token);
      onLoginSuccess(data.user, data.token);
    } catch (err) {
      console.error("Error en login Microsoft:", err);
    }
  };

  return (
    <main id="login">
      <div>
        <Button onClick={returnToMainMenu} id="return-button" disabled={isLoading}>
          &#8592;
        </Button>
        <h2>Iniciar Sessió</h2>

        {Object.values(errors).map((msg, index) => (
          <p key={index} style={{ color: "red" }}>{msg}</p>
        ))}

        <form onSubmit={handleSubmit} noValidate>
          <InputField typeClass="input-field" id="username" name="username" type="text" placeholder="Usuari" disabled={isLoading} />
          <InputField typeClass="input-field" id="password" name="password" type="password" placeholder="Contrasenya" disabled={isLoading} />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Iniciant sessió..." : "Entrar"}
          </Button>
        </form>

        <div style={{ marginTop: "1rem" }}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <GoogleLogin
  onSuccess={handleGoogleSuccess}
  onError={() => console.log("Error Google Login")}
  ux_mode="popup"
/>
</GoogleOAuthProvider>
          <button onClick={handleMicrosoftLogin} style={{ marginTop: "1rem" }}>
            Inicia sessió amb Microsoft
          </button>
        </div>
      </div>
    </main>
  );
}

export default Login;