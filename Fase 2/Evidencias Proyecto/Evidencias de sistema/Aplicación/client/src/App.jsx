import { useEffect, lazy, Suspense, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useUser } from './Components/API/UserContext';  // Asegúrate de importar el hook correctamente
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from './Components/Spinner';

// Importación de páginas con lazy loading
const TransactionResponse = lazy(() => import('./Pages/TransactionResponse/TransactionResponsePage'));
const AdminClasses = lazy(() => import('./Pages/Admin/AdminClasses/AdminClasses'));
const AdminLandingPage = lazy(() => import('./Pages/Admin/AdminLandingPage/AdminLandingPage'));
const AdminNutri = lazy(() => import('./Pages/Admin/AdminNutriCheck/AdminNutri.Page'));
const AdminPlans = lazy(() => import('./Pages/Admin/AdminPlans/AdminPlans.Page'));
const AdminUsersManagement = lazy(() => import('./Pages/Admin/AdminUsersManagement/AdminUsersManagement'));
const ClassesPage = lazy(() => import('./Pages/Classes/ClassesPage'));
const LandingPage = lazy(() => import('./Pages/LandingPage/LandingPage'));
const LoginPage = lazy(() => import('./Pages/Login/LoginPage'));
const Menu = lazy(() => import('./Pages/Menu/Menu'));
const PlansPage = lazy(() => import('./Pages/Plans/PlansPage'));
const ProfilePage = lazy(() => import('./Pages/Profile/ProfilePage'));
const RecoverPage = lazy(() => import('./Pages/Recover/RecoverPage'));
const RegisterPage = lazy(() => import('./Pages/Register/RegisterPage'));
const ScheduleGym = lazy(() => import('./Pages/Schedule/ScheduleGym'));
const SchedulePage = lazy(() => import('./Pages/Schedule/SchedulePage'));
const ScheduleNutri = lazy(() => import('./Pages/Schedule/ScheduleNutri'));

function App() {
  const { isAuth, userData, setIsAuth } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return <Spinner />;
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
        <Suspense fallback={<Spinner />}>
          <Routes>
            {/*Principal*/}
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/" element={<LandingPage isAuth={isAuth} setIsAuth={setIsAuth} />} />
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
            <Route path="/register" element={
              <RedirectIfAuthenticated>
                <RegisterPage  setIsAuth={setIsAuth}/>
              </RedirectIfAuthenticated>
            } />
            <Route path="/recover" element={<RecoverPage />} />

            {/* Rutas de administrador */}
            <Route path="/Admin" element={<AdminNutri />} />
            <Route path="/Admin/Planes" element={<AdminPlans />} />
            <Route path="/Admin/Clases" userId={userData.userId} element={<AdminClasses />} />
            <Route path="/Admin/PaginaInicio" element={<AdminLandingPage />} />
            <Route path="/Admin/Usuarios" element={<AdminUsersManagement />} />

            {/* Perfil usuario */}
            <Route path="/schedule" element={<ProtectedRoute><SchedulePage /></ProtectedRoute>} />
            <Route path="/schedule/gym" element={<ProtectedRoute><ScheduleGym /></ProtectedRoute>} />
            <Route path="/schedule/nutri" element={<ProtectedRoute><ScheduleNutri /></ProtectedRoute>} />
            <Route path="/menu" element={<ProtectedRoute><SchedulePage /></ProtectedRoute>} />
            <Route path="/classes" element={<ProtectedRoute><ClassesPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/TransactionResponse" element={<TransactionResponse />} />


          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
