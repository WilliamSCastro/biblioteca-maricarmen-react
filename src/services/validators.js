export function isValidEmail(email) {
  const emailRegex =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
  return emailRegex.test(email);
}

export function isValidTelefon(telefon) {
  return /^\d{9}$/.test(telefon);
}

export function isValidFileType(file) {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  return file && allowedTypes.includes(file.type);
}
