import React from 'react';
import logo from '../../assets/logo.png'; // Ajusta la ruta según la ubicación de tu logo

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerContent">
        <img src={logo} alt="Logo de la Web" className="logo" />
        <p className="footerText">
          © 2025 Biblioteca Maricarmen Brito. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
