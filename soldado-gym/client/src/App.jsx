import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { RegisterPage } from "./Pages/Register/RegisterPage";
import { LandingPage } from "./Pages/LandingPage/LandingPage";
import { LoginPage } from "./Pages/Login/LoginPage";
import RecoverPage from "./Pages/Recover/RecoverPage"; 
import { Menu } from "./Pages/Menu/Menu";
import { ProfilePage } from "./Pages/Profile/ProfilePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/inicio" element={<Menu />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/recover" element={<RecoverPage />} /> 
        <Route path="/Profile" element={<ProfilePage />} /> 

      </Routes>
    </Router>
  );
}

export default App;
