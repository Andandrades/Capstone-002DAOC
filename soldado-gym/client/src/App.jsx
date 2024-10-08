import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { RegisterPage } from "./Pages/Register/RegisterPage";
import { LandingPage } from "./Pages/LandingPage/LandingPage";
import { LoginPage } from "./Pages/Login/LoginPage";
import RecoverPage from "./Pages/Recover/RecoverPage";
import { Menu } from "./Pages/Menu/Menu";
import { ProfilePage } from "./Pages/Profile/ProfilePage";
import { SchedulePage } from "./Pages/Schedule/SchedulePage";
import { ClassesPage } from "./Pages/Classes/ClassesPage";


function App() {
  const [isAuth, setIsAuth] = useState(false);

  // Comprobar autenticación al cargar la aplicación
  useEffect(() => {
    fetch("/checkauth", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setIsAuth(data.isAuth));
  }, []);

  // Componente para proteger rutas
  const ProtectedRoute = ({ children }) => {
    return isAuth ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/inicio"
          element={
            <ProtectedRoute>
              <Menu />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage setIsAuth={setIsAuth} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/recover"
          element={
            <ProtectedRoute>
              <RecoverPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/schedule"
          element={
            <ProtectedRoute>
              {" "}
              <SchedulePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/menu"
          element={
            <ProtectedRoute>
              <SchedulePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/classes"
          element={
            <ProtectedRoute>
              <SchedulePage />
            </ProtectedRoute>
          }
        />
        /* Ruta por defecto (redirigir si no coincide ninguna ruta) */
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}

export default App;
