import { useEffect, useState } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes, } from "react-router-dom";
import "./App.css";
import { AdminClasses } from "./Pages/Admin/AdminClasses/AdminClasses";
import { AdminLandingPage } from "./Pages/Admin/AdminLandingPage/AdminLandingPage";
import { AdminMenu } from "./Pages/Admin/AdminMenu/AdminMenu";
import { AdminPlans } from "./Pages/Admin/AdminPlans/AdminPlans.Page";
import AdminUsersManagement from "./Pages/Admin/AdminUsersManagement/AdminUsersManagement";
import { ClassesPage } from "./Pages/Classes/ClassesPage";
import { LandingPage } from "./Pages/LandingPage/LandingPage";
import { LoginPage } from "./Pages/Login/LoginPage";
import { Menu } from "./Pages/Menu/Menu";
import PlansPage from "./Pages/Plans/PlansPage";
import { AdminNutri } from "./Pages/Admin/AdminNutriCheck/AdminNutri.Page";
import { ProfilePage } from "./Pages/Profile/ProfilePage";
import { RecoverPage } from "./Pages/Recover/RecoverPage";
import { RegisterPage } from "./Pages/Register/RegisterPage";
import { ScheduleGym } from "./Pages/Schedule/ScheduleGym";
import { SchedulePage } from "./Pages/Schedule/SchedulePage";
import {ScheduleNutri} from "./Pages/Schedule/ScheduleNutri";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  //const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuth");
    if (storedAuth) {
      setIsAuth(JSON.parse(storedAuth));
    }

    fetch(`${import.meta.env.VITE_API_URL}/checkauth`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsAuth(data.isAuth);
        setLoading(false);
        localStorage.setItem("isAuth", JSON.stringify(data.isAuth));
      })
      .catch((err) => {
        console.error("Error fetching /checkauth:", err);
        setLoading(false);
      });
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return <div>Loading...</div>;
    }
    return isAuth ? children : <Navigate to="/login" />;
  };

  const RedirectIfAuthenticated = ({ children }) => {
    return isAuth ? <Navigate to="/inicio" /> : children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/inicio" element={ <Menu /> } />
        <Route path="/login" element={<RedirectIfAuthenticated> <LoginPage setIsAuth={setIsAuth} /> </RedirectIfAuthenticated>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/recover" element={<RecoverPage />} />
        <Route path="/Profile" element={<ProfilePage />} />
        <Route path="/Plans" element={<PlansPage />} />

        {/* rutas sin implementar*/}
        <Route path="/schedule" element={<SchedulePage/>} />,
        <Route path="/schedule/gym" element={<ScheduleGym/>} />,
        <Route path="/schedule/nutri" element={<ScheduleNutri/>} />,
        <Route path="/menu" element={<SchedulePage />} />,
        <Route path="/classes" element={<ClassesPage />} />,


        {/* rutas de administrador gestionar permisos por rol no implementado*/}
        <Route path="/Admin" element={<AdminNutri/>} />,
        <Route path="/Admin/Planes" element={<AdminPlans />} />,
        <Route path="/Admin/Clases" element={<AdminClasses />} />,
        <Route path="/Admin/PaginaInicio" element={<AdminLandingPage />} />,
        <Route path="/Admin/Usuarios" element={<AdminUsersManagement />} />

        {/* ruta general  */}
        <Route path="*" element={<Navigate to="/" />} />,

      </Routes>
    </Router>
  );
}

export default App;