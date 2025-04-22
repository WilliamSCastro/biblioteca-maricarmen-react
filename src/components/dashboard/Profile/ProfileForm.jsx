import { useState } from "react";
import {
  isValidEmail,
  isValidTelefon,
  isValidFileType,
} from "../../../services/validators";
import { updateUserData } from "../../../services/api";
import { ProfileInput } from "./ProfileInput";
import Modal from "../../utils/Modal";
import { AvatarInput } from "./AvatarInput";

export function ProfileForm({ user, onUserUpdate }) {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);
    setIsModalOpen(true);
    setModalMessage("Actualitzant dades...");
    setErrors({});

    const formData = new FormData(e.target);
    const file = formData.get("avatar");
    const email = formData.get("email");
    const telefon = formData.get("telefon");

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

      setModalMessage("Hi ha errors");
      setIsLoading(false);

      return;
    }

    const token = localStorage.getItem("authToken");
    const res = await updateUserData(formData, token);

    if (res.success) {
      if (res.data.type === "success_modify") {
        onUserUpdate(res.data.userData);
        setModalMessage("Les dades s'han actualitzat correctament");
      } else {
        setModalMessage("No hi han hagut canvis");
      }
    } else {
      if (res.type === "error_at_data") {
        setErrors(res.error.formErrors);
      }
      setModalMessage("S'han produit errors");
    }

    setIsLoading(false);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal isOpen={isModalOpen}>
        <p>{modalMessage}</p>
        {!isLoading && (
          <button className="default-button" onClick={closeModal}>
            Acceptar
          </button>
        )}
      </Modal>
      <form onSubmit={handleSubmit} noValidate>
        <ProfileInput
          id="email"
          label="Email"
          type="email"
          defaultValue={user.email}
          error={errors.email}
        />
        <ProfileInput
          id="telefon"
          label="Telèfon"
          type="tel"
          defaultValue={user.telefon ?? ""}
          placeholder={user.telefon === null ? "936587412" : undefined}
          error={errors.telefon}
        />
        <AvatarInput error={errors.avatar}  />
        <input
          type="submit"
          value={isLoading ? "Actualizant" : "Actualitzar"}
          className="default-button"
          disabled={isLoading}
        />
      </form>
    </>
  );
}
