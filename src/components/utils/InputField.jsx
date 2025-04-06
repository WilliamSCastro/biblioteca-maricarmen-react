import React from 'react';

// Componente para renderizar un campo de formulario (label + input + error)
function InputField({typeClass, id, name, type = 'text', placeholder, disabled}) {
  return (
      <input
        className={typeClass}
        type={type}
        id={id}
        name={name} // 'name' es crucial para FormData
        placeholder={placeholder}
        disabled={disabled}
      />
  );
}

export default InputField; // Exportamos para usarlo en otros archivos