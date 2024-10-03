import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { RegisterPage } from "./Pages/Register/RegisterPage";
import { LandingPage } from "./Pages/LandingPage/LandingPage";
import { useEffect, useState } from "react";
import {LoginPage} from "./Pages/Login/LoginPage"
function App() {
  //Variable para validad su un usuario esta logeado
  const [isAuth , setIsAuth] = useState()

  useEffect(() =>{
    fetch('/checkauth',{
      method : 'GET',
      credentials : 'include'
    })
    .then(res => res.json())
    .then(data => setIsAuth(data.isAuth))
    .catch(() => setIsAuth(false));
  },[]);

  //Componente para rutas protegidas
  const ProtectedRoute = ({children}) => {
    return isAuth ? children : <Navigate to="/login"/>
  }



  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
