import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { RegisterPage } from "./Pages/Register/RegisterPage";
import { LandingPage } from "./LandingPage";

function App() {
  return (
    <>
      <LandingPage />
      <RegisterPage />
    </>
  );
}

export default App;
