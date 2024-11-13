import { useEffect, useState, lazy, Suspense } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./Components/Spinner";
import { NutriMenu } from "./Pages/Nutri/NutriMenu";
import { useUser } from "./Components/API/UserContext"; // Asegúrate de importar el hook correctamente

// Importación de páginas con lazy loading
const TransactionResponse = lazy(() =>
  import("./Pages/TransactionResponse/TransactionResponsePage")
);
const AdminClasses = lazy(() =>
  import("./Pages/Admin/AdminClasses/AdminClasses")
);
const AdminLandingPage = lazy(() =>
  import("./Pages/Admin/AdminLandingPage/AdminLandingPage")
);
const AdminNutri = lazy(() =>
  import("./Pages/Admin/AdminNutriCheck/AdminNutri.Page")
);
const AdminPlans = lazy(() =>
  import("./Pages/Admin/AdminPlans/AdminPlans.Page")
);
const AdminUsersManagement = lazy(() =>
  import("./Pages/Admin/AdminUsersManagement/AdminUsersManagement")
);
const ClassesPage = lazy(() => import("./Pages/Classes/ClassesPage"));
const LandingPage = lazy(() => import("./Pages/LandingPage/LandingPage"));
const LoginPage = lazy(() => import("./Pages/Login/LoginPage"));
const Menu = lazy(() => import("./Pages/Menu/Menu"));
const ProfilePage = lazy(() => import("./Pages/Profile/ProfilePage"));
const RecoverPage = lazy(() => import("./Pages/Recover/RecoverPage"));
const RegisterPage = lazy(() => import("./Pages/Register/RegisterPage"));
const ScheduleGym = lazy(() => import("./Pages/Schedule/ScheduleGym"));
const SchedulePage = lazy(() => import("./Pages/Schedule/SchedulePage"));
const ScheduleNutri = lazy(() => import("./Pages/Schedule/ScheduleNutri"));

function App() {
  const { isAuth, setIsAuth, userData, loading } = useUser();

  // Roles permitidos
  const permisosAdmin = [1, 2, 3, 4];
  const permisosVistaCliente = [1, 2, 3, 4];

  // Ruta protegida por roles
  const RoleProtectedRoute = ({ children, requiredRoles }) => {
    // Mostrar Spinner mientras se carga la información
    if (loading) {
      return <Spinner />;
    }

    if (!isAuth || !requiredRoles.includes(userData.role)) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  // Componente para redireccionar si el usuario ya está autenticado
  const RedirectIfAuthenticated = ({ children }) => {
    return isAuth ? <Navigate to="/inicio" /> : children;
  };


  return (
    <>
      <ToastContainer />
      <Router>
        <Suspense fallback={<Spinner />}>
          <Routes>
            {/* Rutas principales */}
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/inicio" element={<Menu />} />
            {/* Manejo de sesiones */}
            {/* rutas de administrador gestionar permisos por rol no implementado*/}
            <Route path="/Admin" element={<AdminNutri />} />,
            <Route path="/Admin/Planes" element={<AdminPlans />} />,
            <Route
              path="/Admin/Clases"
              userId={userData.id}
              element={<AdminClasses />}
            />
            ,
            <Route path="/Admin/PaginaInicio" element={<AdminLandingPage />} />,
            <Route path="/Admin/Usuarios" element={<AdminUsersManagement />} />
            {/* Perfil usuario */}
            <Route
              path="/schedule"
              element={
                <RoleProtectedRoute requiredRoles={ permisosVistaCliente}>
                  <SchedulePage />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/schedule/gym"
              element={
                <RoleProtectedRoute requiredRoles={ permisosVistaCliente}>
                  <ScheduleGym />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/schedule/nutri"
              element={
                <RoleProtectedRoute requiredRoles={ permisosVistaCliente}>
                  <ScheduleNutri />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/menu"
              element={
                <RoleProtectedRoute requiredRoles={ permisosVistaCliente}>
                  <SchedulePage />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/classes"
              element={
                <RoleProtectedRoute requiredRoles={ permisosVistaCliente}>
                  <ClassesPage />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <RoleProtectedRoute requiredRoles={ permisosVistaCliente}>
                  <ProfilePage />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <RedirectIfAuthenticated>
                  <LoginPage setIsAuth={setIsAuth} />
                </RedirectIfAuthenticated>
              }
            />
            <Route
              path="/register"
              element={
                <RedirectIfAuthenticated>
                  <RegisterPage setIsAuth={setIsAuth} />
                </RedirectIfAuthenticated>
              }
            />
            <Route
              path="/recover"
              element={
                <RedirectIfAuthenticated>
                  <RecoverPage setIsAuth={setIsAuth} />
                </RedirectIfAuthenticated>
              }
            />
            {/* Rutas de administrador protegidas */}
            <Route
              path="/Admin"
              element={
                <RoleProtectedRoute requiredRoles={permisosAdmin}>
                  <AdminNutri />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/Admin/Planes"
              element={
                <RoleProtectedRoute requiredRoles={permisosAdmin}>
                  <AdminPlans />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/Admin/Clases"
              element={
                <RoleProtectedRoute requiredRoles={permisosAdmin} >
                  <AdminClasses userId={userData.id} />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/Admin/PaginaInicio"
              element={
                <RoleProtectedRoute requiredRoles={permisosAdmin}>
                  <AdminLandingPage />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/Admin/Usuarios"
              element={
                <RoleProtectedRoute requiredRoles={permisosAdmin}>
                  <AdminUsersManagement />
                </RoleProtectedRoute>
              }
            />
            <Route path="/nutri" element={<NutriMenu userId={userData.id} />} />
            {/* Sin implementar 
            <Route path="/plans" element={<PlansPage />} />*/}
            {/* Rutas protegidas para el perfil del usuario */}
            <Route
              path="/menu"
              element={
                <RoleProtectedRoute requiredRoles={permisosVistaCliente}>
                  <Menu />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/schedule"
              element={
                <RoleProtectedRoute requiredRoles={permisosVistaCliente}>
                  <SchedulePage />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/schedule/gym"
              element={
                <RoleProtectedRoute requiredRoles={permisosVistaCliente}>
                  <ScheduleGym />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/schedule/nutri"
              element={
                <RoleProtectedRoute requiredRoles={permisosVistaCliente}>
                  <ScheduleNutri />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/classes"
              element={
                <RoleProtectedRoute requiredRoles={permisosVistaCliente}>
                  <ClassesPage />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <RoleProtectedRoute requiredRoles={permisosVistaCliente}>
                  <ProfilePage />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/TransactionResponse"
              element={<TransactionResponse />}
            />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
