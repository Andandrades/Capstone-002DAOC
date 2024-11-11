//import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { UserProvider } from './Components/API/UserContext';

createRoot(document.getElementById('root')).render(
        <UserProvider>
            <App />
        </UserProvider>
);


//    </StrictMode> deje desactivado el modo stricto debido a que hace que se dupliquen las consultas al backend

