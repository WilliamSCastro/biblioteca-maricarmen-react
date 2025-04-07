import { useUserContext } from "../../store/UserProvider";
import { useState } from "react";
import { updateUserData } from "../../services/api";

export default function Profile() {
  const { user, handleUserUpdates } = useUserContext();
  const [errors, setErrors] = useState({});

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidTelefon(telefon) {
    return /^\d{9}$/.test(telefon);
  }

  function isValidFileType(file) {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    return file && allowedTypes.includes(file.type);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setErrors({});

    const formData = new FormData(e.target);
    const file = formData.get("avatar");
    const email = formData.get("email");
    const telefon = formData.get("telefon");

    setTimeout(async () => {

      const newErrors = {};

      if (!isValidEmail(email)) {
        newErrors.email = "Email no té un format válid.";
      }

      if (!isValidTelefon(telefon)) {
        newErrors.telefon = "El teléfon ha de tenir 9 dígits.";
      }

      if (file && file.name !== "" && !isValidFileType(file)) {
        newErrors.avatar =
          "Format de imatge invàlid. Només poden ser JPG, JPEG i PNG.";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      const token = localStorage.getItem("authToken");
      const res = await updateUserData(formData, token);

      if (res.success) {

        if (res.data.type === "success_modify") {

          handleUserUpdates(res.data.userData);

        }

      } else {

        if (res.type === "error_at_data") {

          console.log(res.error.formErrors);

        } else {

          console.log(res.error);

        }
      }
    }, 3000);
  }

  return (
    <>
      <h2>Perfil</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" defaultValue={user.email} />
        {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
        <br />

        <label htmlFor="telefon">Telefon</label>
        <input
          type="tel"
          id="telefon"
          name="telefon"
          placeholder={user.telefon === null ? "936587412" : undefined}
          defaultValue={user.telefon !== null ? user.telefon : ""}
        />
        {errors.telefon && <div style={{ color: "red" }}>{errors.telefon}</div>}
        <br />

        <label htmlFor="avatar">Avatar</label>
        <input type="file" id="avatar" name="avatar" accept="image/*" />
        {errors.avatar && <div style={{ color: "red" }}>{errors.avatar}</div>}
        <br />

        <input type="submit" value="Actualizar" />
      </form>
    </>
  );
}
