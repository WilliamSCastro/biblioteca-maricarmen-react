// App.js
import "./App.css";
import "./styles.css";
import AppContent from "./components/main/AppContent"; // Import the new component
import { UserProvider } from "./store/UserProvider"; // Only import the Provider

function App() {

  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
  
}

export default App;