import { useEffect } from "react";

export function AvatarInput({ error }) {



  useEffect(() => {
    console.log("fileName changed:", fileName);
  }, [fileName]); // Debugging to see if fileName changes
  
  return (
    <div id="upload_avatar_box">
      <h3>Modificar avatar</h3>
      <label htmlFor="avatar">Fes click aqui per modificar l'avatar</label>
      <input type="file" id="avatar" name="avatar" accept="image/*"/>
      
      {error && <div className="redError">{error}</div>}
    </div>
  );
  }