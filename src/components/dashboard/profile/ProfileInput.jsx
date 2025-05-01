export function ProfileInput({ id, label, type = "text", defaultValue, error, ...rest }) {
    return (
      <div className="input-box">
        <label htmlFor={id}>{label}</label>
        <input type={type} id={id} name={id} defaultValue={defaultValue} {...rest} />
        {error && <div className="redError">{error}</div>}
      </div>
    );
  }