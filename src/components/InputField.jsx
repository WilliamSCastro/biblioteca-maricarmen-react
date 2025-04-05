import React from 'react';

// Componente para renderizar un campo de formulario (label + input + error)
function InputField({ label, id, name, type = 'text'}) {
  return (
    <div>
      <label htmlFor={id}>{label}:</label>
      <input
        type={type}
        id={id}
        name={name} // 'name' es crucial para FormData
      />
    </div>
  );
}

export default InputField; // Exportamos para usarlo en otros archivos