import React from 'react';

// Componente para renderizar un campo de formulario (label + input + error)
function InputField({ label, id, name, type = 'text', placeholder}) {
  return (
    <div id="input-field">
      <input
        type={type}
        id={id}
        name={name} // 'name' es crucial para FormData
        placeholder={placeholder}
      />
    </div>
  );
}

export default InputField; // Exportamos para usarlo en otros archivos