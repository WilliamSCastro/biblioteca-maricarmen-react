import { useUserContext } from "../../../store/UserProvider";
import { UserInfo } from "./UserInfo";
import { ProfileForm } from "./ProfileForm";

export default function Profile() {
  const { user, handleUserUpdates } = useUserContext();
  const url = `https://biblioteca4.ieti.site${user.imatge_url}`;
  console.log(url)
  return (
    <>
      <div id="title-box">
        {user.imatge_url && <img src={url} alt="user_image" />}
        <h2>{user.username}</h2>
      </div>
      <UserInfo user={user} />
      <ProfileForm user={user} onUserUpdate={handleUserUpdates} />
    </>
  );
}
