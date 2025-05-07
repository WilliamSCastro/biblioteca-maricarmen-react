import React, { useEffect } from "react";
import Button from "../utils/Button"; // Tu botón personalizado
import { googleSocialLogin } from '../../services/api';
const GOOGLE_CLIENT_ID = "951727392825-l5pgor6a24n5m5uurqpvpiince9l54g7.apps.googleusercontent.com";

function CustomGoogleButton({ onLoginSuccess, setErrors }) {
  useEffect(() => {
    if (window.google && window.google.accounts) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });
      // Puedes renderizar el botón oficial oculto si lo necesitas
      window.google.accounts.id.renderButton(
        document.getElementById("googleButtonDiv"),
        { theme: "outline", size: "large" }
      );
    }
    // eslint-disable-next-line
  }, []);

  // Esta función se llamará cuando el usuario complete el login
  function handleCredentialResponse(response) {
    if (response.credential) {
      // Aquí tienes el ID token
      // Llama a tu backend con response.credential
      googleSocialLogin(response.credential)
        .then((data) => {
          localStorage.setItem("token", data.token);
          onLoginSuccess(data.user, data.token);
        })
        .catch(() => setErrors({ api: "Error en l'autenticació amb Google." }));
    } else {
      setErrors({ api: "Error en l'autenticació amb Google." });
    }
  }

  // Esta función abre el popup de Google
  const handleCustomGoogleLogin = () => {
    if (window.google && window.google.accounts) {
      window.google.accounts.id.prompt();
    } else {
      setErrors({ api: "Google API no carregada." });
    }
  };

  return (
    <div>
      <Button onClick={handleCustomGoogleLogin} className="login-button google">
        <img src="https://img.icons8.com/color/20/google-logo.png" alt="Google logo" />
        Inicia sessió amb Google
      </Button>
      {/* Botón oficial oculto, solo para inicializar la API */}
      <div id="googleButtonDiv" style={{ display: "none" }}></div>
    </div>
  );
}

export default CustomGoogleButton;
