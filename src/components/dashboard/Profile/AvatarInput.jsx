import { useEffect } from "react";

export function AvatarInput({ fileName, setFileNameInAvatar, error }) {

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileNameInAvatar(file.name);
    }
  };

  useEffect(() => {
    console.log("fileName changed:", fileName);
  }, [fileName]); // Debugging to see if fileName changes
  
  return (
    <div id="upload_avatar_box">
      <h3>Modificar avatar</h3>
      <label htmlFor="avatar">Fes click aqui per modificar l'avatar</label>
      <input type="file" id="avatar" name="avatar" accept="image/*" onChange={handleFileChange}/>
      {fileName && (
      <div style={{ marginTop: "10px" }}>
        <strong>Arxiu seleccionat: </strong> {fileName}
      </div>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
  }