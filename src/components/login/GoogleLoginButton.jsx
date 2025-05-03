import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export default function GoogleLoginButton() {
  const handleLogin = async (credentialResponse) => {
    const res = await axios.post("http://localhost:8000/api/auth/google/", {
      token: credentialResponse.credential
    });

    console.log(res.data);
  };

  return <GoogleLogin onSuccess={handleLogin} onError={() => console.log('Error')} />;
}