export function UserInfo({ user }) {
    return (
      <>
        <div>
          <h4>Nom</h4>
          <p>{user.first_name}</p>
        </div>
        <div>
          <h4>Cognoms</h4>
          <p>{user.last_name}</p>
        </div>
      </>
    );
  }