import { lazy, Suspense } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useUser } from './Components/API/UserContext';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from './Components/Spinner';
import axios from 'axios';

// Importación de páginas con lazy loading
const TransactionResponse = lazy(() => import('./Pages/TransactionResponse/TransactionResponsePage'));
const AdminClasses = lazy(() => import('./Pages/Admin/AdminClasses/AdminClasses'));
const AdminLandingPage = lazy(() => import('./Pages/Admin/AdminLandingPage/AdminLandingPage'));
const AdminNutri = lazy(() => import('./Pages/Admin/AdminNutriCheck/AdminNutri.Page'));
const AdminPlans = lazy(() => import('./Pages/Admin/AdminPlans/AdminPlans.Page'));
const AdminUsersManagement = lazy(() => import('./Pages/Admin/AdminUsersManagement/AdminUsersManagement'));
const AdminExercisesMain = lazy(() => import('./Pages/Admin/AdminExercises/AdminExercisesMain'));
const ClassesPage = lazy(() => import('./Pages/Classes/ClassesPage'));
import LandingPage from './Pages/LandingPage/LandingPage';
const LoginPage = lazy(() => import('./Pages/Login/LoginPage'));
const Menu = lazy(() => import('./Pages/Menu/Menu'));
const ProfilePage = lazy(() => import('./Pages/Profile/ProfilePage'));
const RecoverPage = lazy(() => import('./Pages/Recover/RecoverPage'));
const RegisterPage = lazy(() => import('./Pages/Register/RegisterPage'));
const ScheduleGym = lazy(() => import('./Pages/Schedule/ScheduleGym'));
const SchedulePage = lazy(() => import('./Pages/Schedule/SchedulePage'));
const ScheduleNutri = lazy(() => import('./Pages/Schedule/ScheduleNutri'));
const NutriMenu = lazy(() => import('./Pages/Nutri/NutriMenu'));
const NutriProfile = lazy(() => import('./Pages/Nutri/NutriProfile'));
const AdminRoutines = lazy(() => import('./Pages/Admin/AdminRoutine/AdminRoutines'));
const AdminDashboard = lazy(() => import('./Pages/Admin/AdminDashBoard/AdminDashboard'));
const RecoveryPassword = lazy(() => import('./Pages/Recover/RecoveryPassword'));


function App() {
  const { isAuth, setIsAuth, loading, userData, fetchAuthData } = useUser();
  const userDataString = localStorage.getItem("userData");
  const LocaluserData = userDataString ? JSON.parse(userDataString) : null;
  const permisosAdmin = [2, 3, 4];
  const permisosVistaCliente = [1, 2, 3, 4];
  if (loading) {
    fetchAuthData()
    return <Spinner />;
  }
  // Ruta protegida por roles
  const RoleProtectedRoute = ({ children, requiredRoles }) => {
    if (!LocaluserData || !requiredRoles.includes(LocaluserData.role)) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  // Componente para redireccionar si el usuario ya está autenticado
  const RedirectIfAuthenticated = ({ children }) => {
    if (isAuth) {
      switch (LocaluserData.role) {
        case 4:
          return <Navigate to="/admin" />;
        case 3:
          return <Navigate to="/consultasnutricionales" />;
        case 2:
          return <Navigate to="/admin" />;
        default:
          return <Navigate to="/inicio" />;
      }
    }
    return children;
  };

  // Configuración global de Axios
  axios.defaults.baseURL = import.meta.env.VITE_API_URL
  axios.defaults.withCredentials = true;


  return (
    <>
      <ToastContainer />
      <Router>
        <Suspense fallback={<Spinner />}>
          <Routes>
            {/* Rutas principales */}
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/" element={<LandingPage />} />

            {/* Manejo de sesiones */}
            <Route path="/RecoveryPassword" element={<RedirectIfAuthenticated><RecoveryPassword /></RedirectIfAuthenticated>} />
            <Route path="/login" element={<RedirectIfAuthenticated><LoginPage setIsAuth={setIsAuth} /></RedirectIfAuthenticated>} />
            <Route path="/register" element={<RedirectIfAuthenticated><RegisterPage setIsAuth={setIsAuth} /></RedirectIfAuthenticated>} />
            <Route path="/recover" element={<RedirectIfAuthenticated><RecoverPage setIsAuth={setIsAuth} /></RedirectIfAuthenticated>} />

            {/* Rutas de administrador protegidas */}
            <Route path="/consultasnutricionales" element={<RoleProtectedRoute requiredRoles={permisosAdmin}><NutriMenu userId={userData.id} /></RoleProtectedRoute>} />
            <Route path="/consultasnutricionales/profile" element={<RoleProtectedRoute requiredRoles={permisosAdmin}><NutriProfile userInfo={userData} /></RoleProtectedRoute>} />
            <Route path="/Admin" element={<RoleProtectedRoute requiredRoles={permisosAdmin}><AdminNutri /></RoleProtectedRoute>} />
            <Route path="/Admin/Planes" element={<RoleProtectedRoute requiredRoles={permisosAdmin}><AdminPlans /></RoleProtectedRoute>} />
            <Route path="/Admin/Clases" element={<RoleProtectedRoute requiredRoles={permisosAdmin}><AdminClasses userId={userData.id} /></RoleProtectedRoute>} />
            <Route path="/Admin/Clases/Rutina/:id" element={<RoleProtectedRoute requiredRoles={permisosAdmin}><AdminRoutines /></RoleProtectedRoute>} />
            <Route path="/Admin/PaginaInicio" element={<RoleProtectedRoute requiredRoles={permisosAdmin}><AdminLandingPage /></RoleProtectedRoute>} />
            <Route path="/Admin/Usuarios" element={<RoleProtectedRoute requiredRoles={permisosAdmin}><AdminUsersManagement /></RoleProtectedRoute>} />
            <Route path="/Admin/Ejercicios" element={<RoleProtectedRoute requiredRoles={permisosAdmin}><AdminExercisesMain /></RoleProtectedRoute>} />
            <Route path="/Admin/AdminDashboard" element={<RoleProtectedRoute requiredRoles={permisosAdmin}><AdminDashboard /></RoleProtectedRoute>} />

            {/* Rutas protegidas para el perfil del usuario */}
            <Route path="/inicio" element={<RoleProtectedRoute requiredRoles={permisosVistaCliente}><Menu /></RoleProtectedRoute>} />
            <Route path="/menu" element={<RoleProtectedRoute requiredRoles={permisosVistaCliente}><Menu /></RoleProtectedRoute>} />
            <Route path="/schedule" element={<RoleProtectedRoute requiredRoles={permisosVistaCliente}><SchedulePage /></RoleProtectedRoute>} />
            <Route path="/schedule/gym" element={<RoleProtectedRoute requiredRoles={permisosVistaCliente}><ScheduleGym userId={userData.id} /></RoleProtectedRoute>} />
            <Route path="/schedule/nutri" element={<RoleProtectedRoute requiredRoles={permisosVistaCliente}><ScheduleNutri userId={userData.id} /></RoleProtectedRoute>} />
            <Route path="/classes" element={<RoleProtectedRoute requiredRoles={permisosVistaCliente}><ClassesPage /></RoleProtectedRoute>} />
            <Route path="/profile" element={<RoleProtectedRoute requiredRoles={permisosVistaCliente}><ProfilePage /></RoleProtectedRoute>} />
            <Route path="/TransactionResponse" element={<TransactionResponse />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
