import { useEffect, useState, lazy, Suspense } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";

// Importación de páginas con lazy loading
const AdminClasses = lazy(() => import("./Pages/Admin/AdminClasses/AdminClasses"));
const AdminLandingPage = lazy(() => import("./Pages/Admin/AdminLandingPage/AdminLandingPage"));
const AdminNutri = lazy(() => import("./Pages/Admin/AdminNutriCheck/AdminNutri.Page"));
const AdminPlans = lazy(() => import("./Pages/Admin/AdminPlans/AdminPlans.Page"));
const AdminUsersManagement = lazy(() => import("./Pages/Admin/AdminUsersManagement/AdminUsersManagement"));
const ClassesPage = lazy(() => import("./Pages/Classes/ClassesPage"));
const LandingPage = lazy(() => import("./Pages/LandingPage/LandingPage"));
const LoginPage = lazy(() => import("./Pages/Login/LoginPage"));
const Menu = lazy(() => import("./Pages/Menu/Menu"));
const PlansPage = lazy(() => import("./Pages/Plans/PlansPage"));
const ProfilePage = lazy(() => import("./Pages/Profile/ProfilePage"));
const RecoverPage = lazy(() => import("./Pages/Recover/RecoverPage"));
const RegisterPage = lazy(() => import("./Pages/Register/RegisterPage"));
const ScheduleGym = lazy(() => import("./Pages/Schedule/ScheduleGym"));
const SchedulePage = lazy(() => import("./Pages/Schedule/SchedulePage"));
const ScheduleNutri = lazy(() => import("./Pages/Schedule/ScheduleNutri"));

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

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
        setUserId(data.userId);
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
    <>
      <ToastContainer />
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/*Principal*/}
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/inicio" element={<Menu />} />

            {/* Manejo de sesiones */}
            <Route
              path="/login"
              element={
                <RedirectIfAuthenticated>
                  <LoginPage setIsAuth={setIsAuth} />
                </RedirectIfAuthenticated>
              }
            />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/recover" element={<RecoverPage />} />

            {/* Perfil usuario */}
            <Route path="/schedule" element={<ProtectedRoute><SchedulePage /></ProtectedRoute>} />
            <Route path="/schedule/gym" element={<ProtectedRoute><ScheduleGym /></ProtectedRoute>} />
            <Route path="/schedule/nutri" element={<ProtectedRoute><ScheduleNutri /></ProtectedRoute>} />
            <Route path="/menu" element={<ProtectedRoute><SchedulePage /></ProtectedRoute>} />
            <Route path="/classes" element={<ProtectedRoute><ClassesPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

            {/* Rutas de administrador gestionar permisos por rol no implementado */}
            <Route path="/admin" element={<AdminNutri />} />
            <Route path="/admin/planes" element={<AdminPlans />} />
            <Route path="/admin/clases" element={<AdminClasses />} />
            <Route path="/admin/paginainicio" element={<AdminLandingPage />} />
            <Route path="/admin/usuarios" element={<AdminUsersManagement />} />

            {/* Sin implementar */}
            <Route path="/plans" element={<PlansPage />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
