export function UserSingleInfo({ title, data }) {
    return (
        <div className="info-box">
          <h3>{title}</h3>
          <p>{data}</p>
        </div>
       
    );
  }