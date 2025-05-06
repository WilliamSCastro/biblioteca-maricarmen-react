import { UserSingleInfo } from "./UserSingleInfo"

export function UserInfo({ user }) {
    return (
      <>
      <UserSingleInfo title="Nom" data={user.first_name}/>
      <UserSingleInfo title="Cognoms" data={user.last_name}/>
      </>
    );
  }