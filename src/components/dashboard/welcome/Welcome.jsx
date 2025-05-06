import { useUserContext } from "../../../store/UserProvider";

export default function Welcome() {
    const { user } = useUserContext();

    return (
        <section>
            <div id="welcome-dashboard">
                <h2>Benvingut, {user.first_name}</h2>
                <p>Estàs al panell d'administració</p>
            </div>
        </section>
    );
    }
