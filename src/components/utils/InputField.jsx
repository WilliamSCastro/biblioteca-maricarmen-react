import React from 'react';

function InputField({typeClass, id, name, type = 'text', placeholder, disabled}) {
  return (
      <input
        className={typeClass}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
      />
  );
}

export default InputField; 