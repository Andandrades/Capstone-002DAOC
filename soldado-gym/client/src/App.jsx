import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { RegisterPage } from "./Pages/Register/RegisterPage";
import { LandingPage } from "./Pages/LandingPage/LandingPage";
import { LoginPage } from "./Pages/Login/LoginPage";
import RecoverPage from "./Pages/Recover/RecoverPage"; // Importación corregida
import { Menu } from "./Pages/Menu/Menu";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/inicio" element={<Menu />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/recover" element={<RecoverPage />} /> {/* Asegúrate de que el componente sea correcto */}
      </Routes>
    </Router>
  );
}

export default App;
