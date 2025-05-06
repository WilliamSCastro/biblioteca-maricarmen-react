export function AvatarInput({ error }) {

  return (
    <div id="upload_avatar_box">
      <h3>Modificar avatar</h3>
      <input type="file" id="avatar" name="avatar" accept="image/*"/>
      {error && <div className="redError">{error}</div>}
    </div>
  );
  }