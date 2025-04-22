import React from "react";
import logo from "../../assets/logo.png"; // Ajusta la ruta según la ubicación de tu logo
import { MAIN_SCREENS } from "../../constants";
import banner from "../../assets/banner.gif"; 

const Footer = ({ screen }) => {
  return (
    <footer className="footer">
      <div className="footerContent">
        <img src={logo} alt="Logo de la Web" className="logo" />
        <p className="footerText">
          © 2025 Biblioteca Maricarmen Brito. Tots els drets reservats.
        </p>
      </div>
      {(screen === MAIN_SCREENS.CATALEG || screen === MAIN_SCREENS.LOGIN) && (
        <div className="banner">
          <a href="https://agora.xtec.cat/iesesteveterradas/"></a>
        </div>
      )}
    </footer>
  );
};

export default Footer;
