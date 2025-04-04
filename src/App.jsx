import { useState } from 'react';
import './App.css';
import BookList from './components/BookList';
import './styles.css';
import LoginForm from './components/LoginForm';

function App() {

  const [tryingToLogin, setTryingToLogin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  function returnToMainMenu(){
    setTryingToLogin(false)
  }

  return (
    <div className="App">

      <nav>
        <h1>Biblioteca Maricarmen</h1>
        {!tryingToLogin && <button onClick={() => {setTryingToLogin(true)}}>LOGIN</button>}
      </nav>

      {tryingToLogin && <LoginForm returnToMain={returnToMainMenu}/>}

    </div>
  );

}

export default App;
