export function AvatarInput({ error }) {
    return (
      <div>
        <label htmlFor="avatar">Modificar avatar</label>
        <input type="file" id="avatar" name="avatar" accept="image/*" />
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
    );
  }