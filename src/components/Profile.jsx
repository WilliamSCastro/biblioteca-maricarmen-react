import { useUserContext } from "../store/UserProvider";

export default function Profile() {
  const { user } = useUserContext();

  function handleSubmit(e){
    e.preventDefault();
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)
    console.log(data); 
  }

  return (
    <>
      <h2>Perfil</h2>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          defaultValue={user.username}
        />
        <br />
        <label htmlFor="first_name">Nom</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          defaultValue={user.first_name}
        />
        <br />
        <label htmlFor="last_name">Cognoms</label>
        <input
          type="text"
          id="last_name"
          name="username"
          defaultValue={user.last_name}
        />
        <br />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue={user.email}
        />
        <br />
        <label htmlFor="telefon">Telefon</label>
        <input
          type="tel"
          id="telefon"
          name="telefon"
          placeholder={user.telefon === null ? "936587412" : undefined} 
          defaultValue={user.telefon !== null ? user.telefon : ""} 
        />
        <br />
        <label htmlFor="centre">Centre</label>
        <input
          type="text"
          id="centre"
          name="centre"
          defaultValue={user.centre}
        />
        <br />
        <label htmlFor="cicle">Cicle</label>
        <input
          type="text"
          id="cicle"
          name="cicle"
          defaultValue={user.cicle}
        />
        <br />
        <input type="submit" />
      </form>
    </>
  );
}
