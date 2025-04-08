import { useUserContext } from "../../../store/UserProvider";
import { UserInfo } from "./UserInfo";
import { ProfileForm } from "./ProfileForm";

export default function Profile() {
  const { user, handleUserUpdates } = useUserContext();
  

  return (
    <>
      <h2>{user.username}</h2>
      <div style={{width: "20px", heigth: "20px", backgroundColor:"lightblue"}}>
            <img src={user.imatge_url} alt="" />
        </div>
      <UserInfo user={user} />
      <ProfileForm user={user} onUserUpdate={handleUserUpdates} />
    </>
  );
}